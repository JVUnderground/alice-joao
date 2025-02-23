resource "aws_s3_bucket" "wedding_images" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_policy" "public_access" {
  bucket = aws_s3_bucket.wedding_images.id
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${var.bucket_name}/*"
    }
  ]
}
POLICY
}

resource "aws_s3_bucket_website_configuration" "wedding_images" {
  bucket = aws_s3_bucket.wedding_images.id

  index_document {
    suffix = "index.html"
  }
}
