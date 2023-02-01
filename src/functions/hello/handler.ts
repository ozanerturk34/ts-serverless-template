import * as createHttpError from "http-errors";

import type {
  Response,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import middyfy from "@libs/middyfy";
import { Greeting } from "@models/models";
import { doILikePerson } from "@utils/helloHelpers";

import schema from "./schema";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
): Promise<Response> => {
  const { name } = event.body;

  if (!doILikePerson(name)) {
    console.error("A person I don't like is trying to force me greet them");
    throw new createHttpError.Forbidden("I don't like you");
  }

  const greeting: Greeting = `Hello ${name}`;

  return formatJSONResponse(
    {
      greeting,
    },
    200
  );
};

export const main = middyfy(hello, schema);
