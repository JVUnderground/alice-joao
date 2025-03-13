variable "rest_api_id" {
  description = "The ID of the REST API"
  type        = string
}

variable "resource_id" {
  description = "The ID of the resource"
  type        = string
}

variable "http_method" {
  description = "The HTTP method (GET, POST, etc.)"
  type        = string
}

variable "authorization" {
  description = "The authorization type"
  type        = string
  default     = "NONE"
}

variable "integration_type" {
  description = "The integration type (MOCK, AWS_PROXY, etc.)"
  type        = string
}

variable "integration_uri" {
  description = "The integration URI"
  type        = string
  default     = null
}

variable "method_response_status_code" {
  description = "The status code for the method response"
  type        = string
  default     = "200"
}

resource "aws_api_gateway_method" "this" {
  rest_api_id   = var.rest_api_id
  resource_id   = var.resource_id
  http_method   = var.http_method
  authorization = var.authorization
}

resource "aws_api_gateway_integration" "this" {
  rest_api_id             = var.rest_api_id
  resource_id             = var.resource_id
  http_method             = aws_api_gateway_method.this.http_method
  integration_http_method = var.integration_type == "AWS_PROXY" ? "POST" : var.http_method
  type                    = var.integration_type
  uri                     = var.integration_uri
}

resource "aws_api_gateway_method_response" "this" {
  rest_api_id = var.rest_api_id
  resource_id = var.resource_id
  http_method = aws_api_gateway_method.this.http_method
  status_code = var.method_response_status_code
}

resource "aws_api_gateway_integration_response" "this" {
  rest_api_id = var.rest_api_id
  resource_id = var.resource_id
  http_method = aws_api_gateway_method.this.http_method
  status_code = aws_api_gateway_method_response.this.status_code

  depends_on = [
    aws_api_gateway_method.this,
    aws_api_gateway_integration.this
  ]
}

output "method_id" {
  value = aws_api_gateway_method.this.id
}

output "integration_id" {
  value = aws_api_gateway_integration.this.id
}