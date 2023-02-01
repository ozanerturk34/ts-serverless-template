import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> &
  FromSchema<S>;

export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export type Response = {
  statusCode: number;
  body: string;
};

/**
 * Returns the response in JSON format
 *
 * @returns A suitable HTTP response object
 */

export const formatJSONResponse = (
  response: Record<string, unknown>,
  statusCode: number = 200
): Response => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};
