output "s3_bucket_name" {
  value       = aws_s3_bucket.wedding_images.id
  description = "S3 Bucket storing wedding images"
}

output "s3_public_url" {
  value       = "https://${aws_s3_bucket.wedding_images.bucket}.s3.amazonaws.com/"
  description = "Base URL for public S3 images"
}

output "api_gateway_endpoint" {
  value       = "https://${aws_api_gateway_rest_api.image_list_api.id}.execute-api.${var.region}.amazonaws.com/${var.stage}/images"
  description = "API Gateway endpoint to fetch image list"
}