import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { performance } from 'node:perf_hooks';
import * as depthLimit from 'graphql-depth-limit';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import Modules from '@/modules';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        // subscriptions: {
        //   'subscriptions-transport-ws': {
        //     onConnect: (connection, req) => ({ connection, req }),
        //   },
        // },
        installSubscriptionHandlers: true,
        autoSchemaFile: true,
        include: Modules,
        path: '/graphql',
        validationRules: [depthLimit(7)],
        buildSchemaOptions: {
          dateScalarMode: 'timestamp',
          numberScalarMode: 'integer',
          noDuplicatedFields: true,
        },
        context: () => ({
          apiStartTime: performance.now(),
        }),
        introspection: true,
        sortSchema: true,
        plugins: [],
      }),
    }),
    ...Modules,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
