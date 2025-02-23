resource "aws_lambda_function" "image_list_lambda" {
  function_name = var.lambda_function_name
  runtime       = "python3.9"
  handler       = "handler.list_images"
  role          = aws_iam_role.lambda_exec.arn
  filename      = "lambda.zip"
}

resource "aws_api_gateway_rest_api" "image_list_api" {
  name        = "image-list-api"
  description = "API to expose the Lambda function for image listing"
}

resource "aws_api_gateway_resource" "image_list_resource" {
  rest_api_id = aws_api_gateway_rest_api.image_list_api.id
  parent_id   = aws_api_gateway_rest_api.image_list_api.root_resource_id
  path_part   = "images"  # This will create an endpoint at /images
}

resource "aws_api_gateway_method" "image_list_method" {
  rest_api_id   = aws_api_gateway_rest_api.image_list_api.id
  resource_id   = aws_api_gateway_resource.image_list_resource.id
  http_method   = "GET"  # Define the method, e.g., GET
  authorization = "NONE"  # You can add auth here if needed
}

resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id = aws_api_gateway_rest_api.image_list_api.id
  resource_id = aws_api_gateway_resource.image_list_resource.id
  http_method = aws_api_gateway_method.image_list_method.http_method
  integration_http_method = "POST"
  type                  = "AWS_PROXY"
  uri                   = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${aws_lambda_function.image_list_lambda.arn}/invocations"
}

resource "aws_api_gateway_deployment" "image_list_deployment" {
  depends_on = [aws_api_gateway_integration.lambda_integration]

  rest_api_id = aws_api_gateway_rest_api.image_list_api.id
}

resource "aws_api_gateway_stage" "image_list_stage" {
  stage_name    = var.stage
  rest_api_id   = aws_api_gateway_rest_api.image_list_api.id
  deployment_id = aws_api_gateway_deployment.image_list_deployment.id
}

resource "aws_lambda_permission" "api_gateway_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  principal     = "apigateway.amazonaws.com"
  function_name = aws_lambda_function.image_list_lambda.function_name
}

resource "aws_iam_policy" "lambda_s3_policy" {
  name        = "lambda-s3-policy"
  description = "Policy for Lambda to access S3 bucket"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "s3:ListBucket"
        Resource = "arn:aws:s3:::jalice-wedding-images"
      },
      {
        Effect   = "Allow"
        Action   = "s3:GetObject"
        Resource = "arn:aws:s3:::jalice-wedding-images/*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_s3_policy_attachment" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_s3_policy.arn
}
