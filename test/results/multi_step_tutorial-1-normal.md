Here's a step-by-step guide:

## 1. Structure Your App for Lambda

```js
// handler.js
exports.handler = async (event) => {
  const { httpMethod, path, body, queryStringParameters } = event;
  
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Hello from Lambda" }),
  };
};
```

If you have an existing Express app, wrap it with `@vendia/serverless-express`:

```js
const serverlessExpress = require("@vendia/serverless-express");
const app = require("./app"); // your Express app
exports.handler = serverlessExpress({ app });
```

## 2. Package Your Code

```bash
mkdir deploy && cp -r *.js package.json deploy/
cd deploy && npm install --production
zip -r ../function.zip .
```

## 3. Create an IAM Role

```bash
aws iam create-role \
  --role-name lambda-exec \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}'

aws iam attach-role-policy \
  --role-name lambda-exec \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

## 4. Create the Lambda Function

```bash
aws lambda create-function \
  --function-name my-api \
  --runtime nodejs20.x \
  --role arn:aws:iam::<ACCOUNT_ID>:role/lambda-exec \
  --handler handler.handler \
  --zip-file fileb://function.zip
```

## 5. Create API Gateway (HTTP API)

```bash
# Create the API
aws apigatewayv2 create-api \
  --name my-api \
  --protocol-type HTTP \
  --target arn:aws:lambda:<REGION>:<ACCOUNT_ID>:function:my-api

# Grant API Gateway permission to invoke Lambda
aws lambda add-permission \
  --function-name my-api \
  --statement-id apigateway \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com
```

The `create-api` with `--target` auto-creates a `$default` stage, integration, and catch-all route.

## 6. Deploy and Test

The HTTP API auto-deploys. Your endpoint is:

```
https://<API_ID>.execute-api.<REGION>.amazonaws.com/
```

## 7. Update Code Later

```bash
zip -r function.zip .
aws lambda update-function-code \
  --function-name my-api \
  --zip-file fileb://function.zip
```

---

## Easier Alternative: Use a Framework

**SAM** (AWS native):
```bash
sam init --runtime nodejs20.x
sam build && sam deploy --guided
```

**SST** (modern, fast iteration):
```bash
npx create-sst@latest my-app
npx sst dev   # live Lambda dev
npx sst deploy --stage prod
```

**Serverless Framework**:
```bash
npx serverless create --template aws-nodejs
npx serverless deploy
```

These frameworks handle IAM, packaging, API Gateway, and CloudFormation for you — highly recommended over manual CLI steps for anything beyond a toy project.
