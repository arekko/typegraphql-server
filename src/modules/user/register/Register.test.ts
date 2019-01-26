import { Connection } from "typeorm";
import { gCall } from "../../..//test-utils/gCall";
import { testConn } from "./../../../test-utils/testConn";

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(data: $data) {
    id
    firstname
    lastname
    email
  }
}

`;

describe("register", () => {
  it("create user", async () => {
    await gCall({
      source: registerMutation,
      variableValues: {
        data: {
          firstname: "mike",
          lastname: "mike2",
          email: "mike@mike.com",
          password: "mike"
        }
      }
    });
  });
});
