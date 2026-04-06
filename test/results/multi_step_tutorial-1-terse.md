## Deploy Node.js to AWS Lambda + API Gateway

**1. Structure app**
- Entry point exports handler: `export const handler = async (event) => { ... }`
- Return `{ statusCode, headers, body: JSON.stringify(data) }`
- If using Express, wrap with `@vendia/serverless-express` or `serverless-http`

**2. Package**
```bash
zip -r function.zip index.mjs node_modules/
```
Or use `esbuild` to bundle single file (smaller, faster cold starts):
```bash
esbuild index.ts --bundle --platform=node --outfile=dist/index.mjs --format=esm
```

**3. Create Lambda (CLI)**
```bash
aws lambda create-function \
  --function-name my-api \
  --runtime nodejs20.x \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --role arn:aws:iam::ACCT:role/lambda-exec-role
```

IAM role needs `AWSLambdaBasicExecutionRole` policy minimum.

**4. Create API Gateway**
```bash
# HTTP API (simpler, cheaper)
aws apigatewayv2 create-api --name my-api --protocol-type HTTP

# Add Lambda integration
aws apigatewayv2 create-integration \
  --api-id API_ID \
  --integration-type AWS_PROXY \
  --integration-uri arn:aws:lambda:REGION:ACCT:function:my-api

# Add catch-all route
aws apigatewayv2 create-route \
  --api-id API_ID \
  --route-key '$default' \
  --target integrations/INTEGRATION_ID

# Deploy
aws apigatewayv2 create-stage --api-id API_ID --stage-name '$default' --auto-deploy
```

**5. Grant API GW permission to invoke Lambda**
```bash
aws lambda add-permission \
  --function-name my-api \
  --statement-id apigateway \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com
```

**6. Get endpoint**
```bash
aws apigatewayv2 get-api --api-id API_ID
# → ApiEndpoint: https://xxx.execute-api.region.amazonaws.com
```

## Faster alternatives

- **SAM**: `sam init` → `sam deploy --guided` — handles all above automatically
- **SST**: `npx sst deploy` — best DX for Node.js Lambda
- **CDK**: Infrastructure as TypeScript, `cdk deploy`
- **Serverless Framework**: `serverless deploy`

## Key gotchas

- Lambda timeout default 3s, max 15min. Set via `--timeout`
- Memory = CPU scaling. 1769MB = 1 vCPU
- Cold starts: bundle small, use ESM, avoid heavy SDKs at top-level
- `event.body` is string — parse it
- CORS: return `Access-Control-Allow-Origin` header manually or enable on API GW
