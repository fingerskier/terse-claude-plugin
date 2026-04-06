## Deploy Node.js to AWS Lambda + API Gateway

### 1. Structure app

```
project/
  index.mjs      # handler
  package.json
```

Handler exports Lambda-compatible function:

```js
export const handler = async (event) => {
  return { statusCode: 200, body: JSON.stringify({ msg: "ok" }) }
}
```

### 2. Package

```bash
npm install --omit=dev
zip -r function.zip index.mjs node_modules/
```

### 3. Create IAM role

```bash
aws iam create-role --role-name lambda-exec \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}'
aws iam attach-role-policy --role-name lambda-exec \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

### 4. Create Lambda function

```bash
aws lambda create-function --function-name my-api \
  --runtime nodejs20.x --handler index.handler \
  --zip-file fileb://function.zip \
  --role arn:aws:iam::ACCOUNT_ID:role/lambda-exec
```

### 5. Create API Gateway (HTTP API — simpler than REST)

```bash
aws apigatewayv2 create-api --name my-api --protocol-type HTTP \
  --target arn:aws:lambda:REGION:ACCOUNT_ID:function:my-api
```

This auto-creates default stage + Lambda integration.

### 6. Grant API GW permission to invoke Lambda

```bash
aws lambda add-permission --function-name my-api \
  --statement-id apigateway --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com
```

### 7. Get endpoint

```bash
aws apigatewayv2 get-api --api-id API_ID
# → ApiEndpoint field is your URL
```

### Alternatives worth knowing

- **SAM** (`sam init` + `sam deploy`) — handles all above in one template. Best for real projects.
- **SST** — higher-level, good DX, live Lambda dev.
- **Serverless Framework** — `serverless deploy`, config-driven.

### Common gotchas

- Lambda has 250MB unzipped limit. Use layers for big deps.
- Cold starts: keep bundle small, use `nodejs20.x`+.
- `event.body` is string — parse it. `event.pathParameters` for route params.
- Default timeout 3s. Set `--timeout 30` if needed.
- API GW HTTP API = cheaper + simpler. REST API only if need request validation, WAF, or usage plans.
