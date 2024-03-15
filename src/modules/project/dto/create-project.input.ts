import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MinLength,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field({ description: 'Project name' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ description: 'Project description' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  description: string;

  @Field({ description: 'Project website', nullable: true })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @IsOptional()
  @IsUrl({
    require_protocol: true,
  })
  website?: string;
}
