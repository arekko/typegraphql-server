import faker from "faker";
import { Connection } from "typeorm";
import { gCall } from "../../..//test-utils/gCall";
import { User } from "../../../entity/User";
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
    firstname
    lastname
    email
  }
}

`;

describe("register", () => {
  it("create user", async () => {
    const user = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });

    expect(response).toMatchObject({
      data: {
        register: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        }
      }
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
  });
});
