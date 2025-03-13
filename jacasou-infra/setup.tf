resource "aws_api_gateway_rest_api" "wedding_images_api" {
  name = "wedding-images-api"
  description = "Jacasou's wedding images API"
}

resource "aws_api_gateway_resource" "root" {
  rest_api_id = aws_api_gateway_rest_api.wedding_images_api.id
  parent_id = aws_api_gateway_rest_api.wedding_images_api.root_resource_id
  path_part = "images"
}

resource "aws_api_gateway_deployment" "deployment" {
  depends_on = [
    module.get_images.integration_id,
    module.enable_cors.integration_id
  ]

  rest_api_id = aws_api_gateway_rest_api.wedding_images_api.id
}

resource "aws_api_gateway_stage" "stage" {
    rest_api_id = aws_api_gateway_rest_api.wedding_images_api.id
    deployment_id = aws_api_gateway_deployment.deployment.id
    stage_name = "prod"
}

module "enable_cors" {
    source = "./utils/gateway"
    rest_api_id = aws_api_gateway_rest_api.wedding_images_api.id
    resource_id = aws_api_gateway_resource.root.id
    http_method = "OPTIONS"
    integration_type = "MOCK"
}

module "get_images" {
    source = "./utils/gateway"
    rest_api_id = aws_api_gateway_rest_api.wedding_images_api.id
    resource_id = aws_api_gateway_resource.root.id
    http_method = "GET"
    integration_type = "AWS_PROXY"
    integration_uri = aws_lambda_function.get_images.invoke_arn
}

resource "aws_iam_role" "lambda_exec_role" {
  name = "lambda_exec_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action    = "sts:AssumeRole",
      Effect    = "Allow",
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_policy" "lambda_policy" {
  name        = "lambda_policy"
  description = "IAM policy for Lambda execution with CloudWatch and S3 access"
  policy      = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect   = "Allow",
        Action   = [
          "s3:ListBucket",
          "s3:GetObject"
        ],
        Resource = [
          "arn:aws:s3:::${var.bucket_name}",
          "arn:aws:s3:::${var.bucket_name}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attach" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role = aws_iam_role.lambda_exec_role.name
}


resource "aws_lambda_function" "get_images" {
  filename      = "get_images.zip"
  function_name = "get_images"
  role          = aws_iam_role.lambda_exec_role.arn
  handler       = "handler.get_images"
  runtime       = "python3.11"
}


resource "aws_lambda_permission" "apigw_lambda" {
  statement_id = "AllowExecutionFromAPIGateway"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_images.function_name
  principal = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.wedding_images_api.execution_arn}/*/*"
}