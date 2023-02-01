# Serverless - AWS Node.js Typescript

This is a template project inspired from `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/). Main difference is this template uses serverless.yml instead of serverless.ts for service file

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Test your service

This template contains a single lambda function triggered by an HTTP request made on the provisioned API Gateway REST API `/hello` route with `POST` method. The request body must be provided as `application/json`. The body structure is tested by API Gateway against `src/functions/hello/schema.ts` JSON-Schema definition: it must contain the `name` property.

- requesting any other path than `/hello` with any other method than `POST` will result in API Gateway returning a `403` HTTP error code
- sending a `POST` request to `/hello` with a payload **not** containing a string property named `name` will result in API Gateway returning a `400` HTTP error code
- sending a `POST` request to `/hello` with a payload containing a string property named `name` will result in API Gateway returning a `200` HTTP status code with a message saluting the provided name and the detailed event processed by the lambda

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. You should protect this endpoint with the authentication method of your choice.

### Test Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request POST 'https://myApiEndpoint/dev/hello' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Frederic"
}'
```

## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas
- `models` - containing shared models across the app
- `utils` - containing shared helper and utility methods

```
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   └── hello
│   │       ├── handler.ts      # `Hello` lambda source code
│   │       └── schema.ts       # `Hello` lambda input event JSON-Schema
│   │
│   └── libs                    # Lambda shared code
│   │   └── apiGateway.ts       # API Gateway specific helpers
│   │   └── lambda.ts           # Lambda middleware
│   └── models                  # Shared typescript models across the app
│   │   └── models.ts           # Main ts file holding general purpose models
│   └── utils                   # Utility and helper methods
│       └── helloHelpers.ts     # Includes all helpers for hello method
│
├── .yml                        # Add reusable yml components here
│   └── Functions               # Function declaration files for yml
│       └── hello.yml           # hello lambda method service file
│
├── package.json
├── serverless.yml              # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
└── tsconfig.paths.json         # Typescript paths
```

### 3rd party libraries

- [http-errors](https://github.com/jshttp/http-errors) - creates HTTP errors for the app easily
- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object

### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`
