# Getting started

## Cloning this repository

In order to clone this repository, please use the following command:
    
    git clone https://github.com/DeutscherDude/movies-netguru-exercise.git

## Generating a new OMDb Api key:

Creating a new OMDb Api key can be done under the following url: 

## Create a '.env' file including:
- MONGO_USERNAME=(Your MongoDb username)
- MONGO_PASSWORD=(Your MongoDb password)
- MONGO_URI=(Connection string)
- JWT_SECRET=(Your secret encryption key for JWT service)
- SERVER_PORT=(Prefered port for the JWT authorization service, default: 3000)
- APP_PORT=(Prefered port for the API service, default: 5050)
- OMDb_API_KEY=(See above for instructions on creating an OMDb API KEY)

As a baseline, please use the following:

    MONGO_USERNAME=Your_MongoDb_username
    MONGO_PASSWORD=Your_MongoDb_password
    MONGO_URI=Connection_string
    JWT_SECRET=Your_secret_encryption_key_for_JWT_service
    SERVER_PORT=Prefered_port_for_the_JWT_authorization_ service
    APP_PORT=Prefered_port_for_the_API_service
    OMDb_API_KEY=See_above_for_instructions_on_creating_an_OMDb_API_KEY
    

## Running the project

To start up the project in seperate docker containers, run the following command:

    docker-compose up

To stop the project, run the following command:

    docker-compose down

OR press ctrl + c

## API methods & examples

In Postman or your HTTP Client of choice, use the following URL:

http://localhost:5050/api/movie/

METHOD: GET

Important: Remember to pass the authorization Bearer Token

This endpoint will return you all movies created by a user passed in the Bearer Token.

http://localhost:5050/api/movie/

METHOD: POST

Important: Remember to pass the authorization Bearer Token

BODY:

    KEY:
        title: #Title of the movie you want to look for#


