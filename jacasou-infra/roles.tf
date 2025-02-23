provider "aws" {
  profile = "default"  # Switch to the profile with the necessary permissions
}

resource "aws_iam_role" "lambda_exec" {
  name = "lambda_s3_exec_role"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}
