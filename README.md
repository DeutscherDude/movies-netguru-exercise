# Cloning this repository

    In order to clone this repository, please use the following command:
    git clone https://github.com/DeutscherDude/movies-netguru-exercise.git

# Create a '.env' file including:
    - MONGO_USERNAME (Your MongoDb username)
    - MONGO_PASSWORD (Your MongoDb password)
    - MONGO_URI (Connection string)
    - JWT_SECRET (Your secret encryption key for JWT service)
    - SERVER_PORT (Prefered port for the JWT authorization service, default: 3000)
    - APP_PORT (Prefered port for the API service, default: 5050)


# Running the project

    To start up the project in seperate docker containers, run the following command:
    docker-compose up

    To stop the project, run the following command:
    docker-compose down
    OR press ctrl + c

# API methods & examples

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


