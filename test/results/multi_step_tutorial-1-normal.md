## Deploy Node.js to AWS Lambda + API Gateway

### 1. Structure your app

```js
// index.mjs
export const handler = async (event) => {
  const { httpMethod, path, body, queryStringParameters } = event;
  
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Hello from Lambda" }),
  };
};
```

Key: Lambda expects a `handler` function that receives an `event` object and returns `{ statusCode, headers, body }`.

### 2. Install dependencies & zip

```bash
npm install --production
zip -r function.zip index.mjs node_modules/
```

### 3. Create an IAM execution role

```bash
aws iam create-role \
  --role-name lambda-exec \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}'

aws iam attach-role-policy \
  --role-name lambda-exec \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

### 4. Create the Lambda function

```bash
aws lambda create-function \
  --function-name my-api \
  --runtime nodejs20.x \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --role arn:aws:iam::<ACCOUNT_ID>:role/lambda-exec
```

### 5. Create API Gateway (HTTP API)

```bash
aws apigatewayv2 create-api \
  --name my-api \
  --protocol-type HTTP \
  --target arn:aws:lambda:<REGION>:<ACCOUNT_ID>:function:my-api
```

This creates the API, a default route, and a Lambda integration in one step.

### 6. Grant API Gateway permission to invoke Lambda

```bash
aws lambda add-permission \
  --function-name my-api \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com
```

### 7. Get your endpoint

```bash
aws apigatewayv2 get-api --api-id <API_ID>
# → ApiEndpoint: https://xxxxx.execute-api.<region>.amazonaws.com
```

Hit it: `curl https://xxxxx.execute-api.<region>.amazonaws.com/`

---

### Updating the function later

```bash
zip -r function.zip index.mjs node_modules/
aws lambda update-function-code \
  --function-name my-api \
  --zip-file fileb://function.zip
```

### Alternatives worth considering

- **SAM** (`sam init` / `sam deploy`) — wraps all the above into a `template.yaml` and handles packaging, roles, and API Gateway automatically. Much less manual work.
- **SST** — higher-level framework, good DX, live Lambda dev mode.
- **Serverless Framework** — `serverless.yml` config, `sls deploy`. Mature ecosystem.

For anything beyond a toy project, SAM or SST will save you significant time over raw CLI commands.
