import { Arg, Mutation, Resolver, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";
import { ChangePassword } from "./changePassword/ChangePasswordInput";
import bcrypt from "bcryptjs";
import { MyContext } from "src/types/MyContext";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data")
    { password, token }: ChangePassword,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);

    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    ctx.req.session!.userId = user.id;

    return user;
  }
}
