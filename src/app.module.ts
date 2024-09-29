import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { performance } from 'node:perf_hooks';
import * as depthLimit from 'graphql-depth-limit';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import Modules from '@/modules';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '@/filters/http-exception.filter';
import { LoggingInterceptor } from '@/interceptors/logging.interceptor'; // Import your project modules

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
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
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
