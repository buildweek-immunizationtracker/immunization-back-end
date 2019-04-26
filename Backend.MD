# Routes

* Authentication Routes
    * [`/login`](#login)
    * [`/register`](#register)


## Authentication

### <a name="login">`/login`</a>

#### Description

This endpoint is responsible for logging a user. Upon successful authentication (_with valid username and password_), the endpoint will respond with a token. It will also return a boolean (_true or false_) which indicates if the user is a provider or not.

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
    "token": string,
}
```

* 400 Bad Request

Request is missing either or both username and password.

* 401 Unauthorized

Credentials invalid.

### <a name="register">`/register`</a>

#### Description

Endpoint is responsible for registering a user. Upon successful registration, the server will save received data and respond with a token, which can be used to immediately log the user. It will also return a boolean (_true or false_) which indicates if the user is a provider or not.

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
    "token": string,
    "isProvider": boolean
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

Returns information about the current logged in user. There is no need to specify `userId`: the user ID is read from the token passed in the Authorization header with the request.

#### Operation and Schemas

---

This route is _protected_. A valid token retrieved either from `/login` or `/registration` is needed. Please check this [Stack Overflow Answer](https://stackoverflow.com/a/42879201) on information on how to pass this token along with the request.

---

**Operation**: GET

**Output Schema**:

* 200 OK

```js
{
    user: {
        "id": number,
        "password": string,
        "email": string,
        "providerId": number | null,
        "createdAt": Date,
    }
}
```

### <a name="users-patients">`/users/:id/patients`</a>

#### Description

Returns a list of all patients associated with the user account (e.g. a list of the user and her dependents she registered with the app). The user account is specified with the user id passed as the `:id`.

#### Operation and Schemas

---

This route is _protected_. A valid token retrieved either from `/login` or `/registration` is needed. Please check this [Stack Overflow Answer](https://stackoverflow.com/a/42879201) on information on how to pass this token along with the request.

---

**Operation**: GET

**Output Schema**:

* 200 OK

```js
{
    "patients": [
        {
            "id": number,
            "firstName": string,
            "lastName": string,
            "age": number,
            "userId": number,
            "createdAt": Date
        }
    ]
}
```

