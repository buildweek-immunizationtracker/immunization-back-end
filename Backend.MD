# Routes

* Authentication Routes
    * [`/login`](#login)
    * [`/register`](#register)


## Authentication

### <a name="login">`/login`</a>

#### Description

This endpoint is responsible for logging a user. Upon successful authentication (_with valid username and password_), the endpoint will respond with a token.

The receieved token will be used to access protected routes. Refer to the individual protected route for information on using the token.

#### Operation and Schemas

* POST

**Body Schema**:

```js
{
    "username": string,
    "password": string
}
```

**Output Schema**:

* 200 Success

```js
{
    "token": string
}
```

* 400 Bad Request

Request is missing either or both username and password.

* 401 Unauthorized

Credentials invalid.

### <a name="register">`/register`</a>

#### Description

Endpoint is responsible for registering a user. Upon successful registration, the server will save received data and respond with a token, which can be used to immediately log the user.

The received token will be used to access protected routes. Refer to the individual protected route for information on using the token.

#### Operation and Schemas

* POST

**Body Schema**:

```js
{
    "username": string,
    "password": string,
    "email": string,
    "providerId": number // optional, deprecated

}
```

**Output Schema**:

* 201 Created

```js
{
    "token": string
}
```

* 400 Bad Request

Check error message:

    * Missing username, password, or email
    * Email and/or username already exists

* 401 Unauthorized

Invalid credentials

## Users

### <a name="users-root">`/users`</a>

#### Description

Returns a list of all users on the database. This is more of a debug route for development rather than data to be consumed by the frontend.

#### Operation and Schemas

**Operation**: GET

**Output Schema**:

* 200 OK

```js
{
    users: [
        {
            "id": number,
            "password": string,
            "email": string,
            "providerId": number | null,
            "createdAt": Date,
        }
    ]
}
```

### <a name="users-patients">`/users/:id/patients`</a>

#### Description

