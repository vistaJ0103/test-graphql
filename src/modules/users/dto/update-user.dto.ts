import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export default class UpdateUserDTO {
  @MaxLength(256)
  @Field(() => String, { nullable: true })
  userId?: string;

  @MaxLength(64)
  @Field(() => String, { nullable: true })
  name?: string;

  @IsEmail()
  @MaxLength(256)
  @Field(() => String, { nullable: true })
  email?: string;

  @IsNotEmpty()
  @MaxLength(256)
  @Field(() => String)
  password: string;
}
