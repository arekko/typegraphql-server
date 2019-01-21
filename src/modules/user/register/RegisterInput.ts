import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";
import { PasswordInput } from "../../..//modules/shared/PasswordInput";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 255)
  firstname: string;

  @Field()
  @Length(1, 255)
  lastname: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email already exist" })
  email: string;
}
