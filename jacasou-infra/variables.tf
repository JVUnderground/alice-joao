variable "bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
  default     = "jalice-wedding-images"
}

variable "lambda_function_name" {
  description = "Name of the Lambda function"
  type        = string
  default     = "list_jalice_wedding_images"
}

variable "api_gateway_stage" {
  description = "Stage name for API Gateway"
  type        = string
  default     = "prod"
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "stage" {
    description = "Stage name for API Gateway"
    type        = string
    default     = "prod"
}
