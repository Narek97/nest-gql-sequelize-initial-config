import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateErrorLogInput {
  status: number;
  message: string;
  path: string;
}
