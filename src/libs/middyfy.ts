import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import middyEventNormalizer from "@middy/http-event-normalizer";
import middyErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";

/**
 *
 * @param handler
 * @returns
 */

const middyfy = (handler: any, eventSchema?: Function | any) => {
  const main = middy(handler);
  main.use([
    middyJsonBodyParser(),
    middyEventNormalizer(),
    middyErrorHandler(),
  ]);
  if (!!eventSchema) {
    main.use(
      validator({
        eventSchema: transpileSchema(eventSchema),
      })
    );
  }
  return main;
};

export default middyfy;
