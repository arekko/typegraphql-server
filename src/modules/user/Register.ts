import bcrypt from "bcryptjs";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello world!";
  }

  @Mutation(() => User)
  async register(@Arg("data")
  {
    firstname,
    lastname,
    email,
    password
  }: RegisterInput): Promise<User> {
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashPassword
    }).save();

    return user;
  }
}
