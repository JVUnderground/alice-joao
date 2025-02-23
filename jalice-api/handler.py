import json
import boto3

def list_images(event, context):
    s3 = boto3.client('s3')
    bucket_name = 'jalice-wedding-images'
    
    try:
        # List the objects in the specified S3 bucket
        response = s3.list_objects_v2(Bucket=bucket_name)
        
        # Check if the bucket has objects
        if 'Contents' in response:
            # Extract file names (or keys) of the images
            images = [obj['Key'] for obj in response['Contents']]

            # Return the list of image filenames
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'message': 'Images retrieved successfully',
                    'images': images
                })
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({
                    'message': 'No images found in the bucket'
                })
            }
    
    except Exception as e:
        # If there's an error, return it
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': f'Error retrieving images: {str(e)}'
            })
        }
