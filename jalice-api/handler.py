import json
import boto3

def get_images(event, context):
    s3 = boto3.client('s3')
    bucket_name = 'jalice-wedding-images'
    
    try:
        response = s3.list_objects_v2(Bucket=bucket_name)
        
        if 'Contents' in response:
            images = [obj['Key'] for obj in response['Contents']]
            body = {
                'message': 'Images retrieved successfully',
                'images': images
            }
            status_code = 200
        else:
            body = {'message': 'No images found in the bucket'}
            status_code = 404

    except Exception as e:
        body = {'message': f'Error retrieving images: {str(e)}'}
        status_code = 500

    return {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': 'GET,OPTIONS'
        },
        'body': json.dumps(body)
    }
