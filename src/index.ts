import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import "reflect-metadata";
import { buildSchema, Query, Resolver } from "type-graphql";


@Resolver()
class Helloresolver {
  @Query(() => String)
  async hello() {
    return "Hello world!";
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [Helloresolver]
  });

  const apolloServer = new ApolloServer({ schema });
  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log("server started on http://localhost:4000")
  );
};

main();
