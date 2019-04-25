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

200 Success

```js
{
    "token": string
}
```

### <a name="register">`/register`</a>

#### Description

Endpoint is responsible for registering a user. Upon successful registration, the server will save received data and respond with a token, which can be used to immediately log the user.

The receieved token will be used to access protected routes. Refer to the individual protected route for information on using the token.

#### Operation and Schemas

* POST

**Body Schema**:

```js
{
    "username": string,
    "password": string,
    "email": string,
    "providerId": number // to be deprecated
}
```

**Output Schema**:

201 Created

```js
{
    "token": string
}
```