<h1>Healy Mini Application</h1>

 

Web application to put and search for ingredient using their names as keys. 

This application is implemented with an express serverless backend and a react redux font-end.



Download the project and extract it. Make sure you got all the dependencies installed.



For server side, cd into server/my-express-application, and install:

express framework and the serverless-http:

*$ npm install --save express serverless-http*

aws-sdk and body-parser for parsing the body of HTTP requests:

*$ npm install --save aws-sdk body-parser*

You need an AWS – Credentials and set it up with your serverless: (<https://www.youtube.com/watch?v=KngM5bfpttA>)

This web application is run offline on local machine to avoid adding too many objects into AWS Lambda server.  To Run offline make sure you install local DynamoDB:

*$ npm install --save-dev serverless-dynamodb-local*

*$ sls dynamodb install*

To put all the ingredients from the ingredients dataset into database, you can send a PUT request to the server at the endpoint /add-ingredients. 

 

Now you can run the server with the command: 

*$ sls offline start*

 

For client side, you can just simply cd to the root directory of the project

*$ npm install*

*$ npm start*

Now the web application is up running !!! 