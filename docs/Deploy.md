# Deploy

You can use the `deploy.sh` script to deploy the docs-browser to an AWS S3 bucket using the command
~~~
bash$ ./deploy.sh <bucket>
~~~

# Caveats

1. The deploy script using the `aws` command line interface, which must be properly installed and configured to give you authorization to access the target bucket.

2. The deploy script simple copies the required files and makes them public. It does not configure the bucket as a website.  You must do that manually using the AWS Concole

3. The deploy script only copies the file `_defaults.js` if it is not present.  If you wish to change the default owner and project, you must modify this file first before deploying it.  Once it is deployed, you can only modify it by manually uploading a new copy.

# See also
* [[Defaults]]
