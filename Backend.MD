# Routes

- Authentication Routes

  - [`/login`](#login)
  - [`/register`](#register)

- User Routes

  - [`/user`](#user-root)
    - [GET](#user-get)
    - [PUT](#user-put)
    - [DELETE](#user-delete)
  - [`/user/:id/patients`](#user-patients)

- Patient Routes
  -

## Authentication

### <a name="login">`/login`</a>

#### Description

This endpoint is responsible for logging a user. Upon successful authentication (_with valid username and password_), the endpoint will respond with a token. It will also return a boolean (_true or false_) which indicates if the user is a provider or not.

The receieved token will be used to access protected routes. Refer to the individual protected route for information on using the token.

#### Operation and Schemas

- POST

**Body Schema**:

```js
{
    "username": string,
    "password": string
}
```

**Output Schema**:

- 200 Success

```js
{
    "token": string,
}
```

- 400 Bad Request

Request is missing either or both username and password.

- 401 Unauthorized

Credentials invalid.

### <a name="register">`/register`</a>

#### Description

Endpoint is responsible for registering a user. Upon successful registration, the server will save received data and respond with a token, which can be used to immediately log the user. It will also return a boolean (_true or false_) which indicates if the user is a provider or not.

The received token will be used to access protected routes. Refer to the individual protected route for information on using the token.

#### Operation and Schemas

- POST

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

- 201 Created

```js
{
    "token": string,
    "isProvider": boolean
}
```

- 400 Bad Request

Check error message:

    * Missing username, password, or email
    * Email and/or username already exists

- 401 Unauthorized

Invalid credentials

## Users

### <a name="user-root">`/user`</a>

#### Description

Endpoint representing the `user` resource. See `Operations and Schemas` for more information of each operation.

#### Operations and Schemas

---

This route is _protected_. A valid token retrieved either from `/login` or `/registration` is needed. Please check this [Stack Overflow Answer](https://stackoverflow.com/a/42879201) on information on how to pass this token along with the request with Axios.

---

<a name="user-get">**GET**</a>

Returns information about the current logged in user. There is no need to specify `userId`: the user ID is read from the token passed in the Authorization header with the request.

_Output Schema_:

- 200 OK

```js
{
    user: {
        "id": number,
        "password": string,
        "email": string,**6702803862**
        "providerId"?: number, // ? means it may or may not be there.
        "createdAt": DateString // string with a formatted date
    }
}
```

There is no `providerId` if the user is a patient/an account managing patients.

<a name="user-put">**PUT**</a>

_Input Schema_:

```js
{
    "username"?: string, // ? means property is optional (doesn't have to be there).
    "password"?: string,
    "email"?: string
}
```

At least one property must exist in JSON body. Otherwise, the route will respond with `400 Bad Request`.

_Output Schema_:

- 200 OK

```js
{
    success: {
        // wWill contain details of the updated user sans password
        "id": number,
        "username": string,
        "email": string,
        "createdAt": DateString // string with a formatted date
    }
}
```

<a name="user-delete">**DELETE**</a>

_Output Schema_:

- 200 OK

```js
{
    "usersDeleted": number,
}
```

Returns the number of users deleted. This number should always be `1`. If it's more than `1`, contact the backend people.

If less than `1`, you should get a `404: Not Found` instead, signifying that the user cannot be found. Since the user to be deleted is identified by the token, a `404` may mean that the token is old and can be discarded.

### <a name="user-patients">`/user/:id/patients`</a>

#### Description

Returns a list of all patients associated with the user account (e.g. a list of the user and her dependents she registered with the app). The user account is specified with the user id passed as the `:id`.

#### Operation and Schemas

---

This route is _protected_. A valid token retrieved either from `/login` or `/registration` is needed. Please check this [Stack Overflow Answer](https://stackoverflow.com/a/42879201) on information on how to pass this token along with the request with Axios.

---

**GET**

_Output Schema_:

- 200 OK

```js
{
    "patients": [
        {
            "id": number,
            "firstName": string,
            "lastName": string,
            "age": number,
            "userId": number,
            "createdAt": DateString // string with a formatted date
        }
    ]
}
```

## Patients

### <a name="patient-root">`/patients`</a>

#### Description

Endpoint dealing with the `patient` resource. There is only operation: POST, which will create a new patient and add it into the user account currently logged in.

---

This route is _protected_. A valid token retrieved either from `/login` or `/registration` is needed. Please check this [Stack Overflow Answer](https://stackoverflow.com/a/42879201) on information on how to pass this token along with the request with Axios.

---

#### Operation and Schemas

**POST**

_Input Schema_:

```js
{
    "firstName": string,
    "lastName": string,
    "birthDate": Date // double check this, Ronald
}
```

_Output Schema_:

* 201 Created

```js
{
    "success": {
        // Returns the created patient
        "id": number,
        "firstName": string,
        "lastName": string,
        "birthDate": string,
        "userId": number,
        "createdAt": DateString // string with a formatted date
    }
}
```

### <a name="patient-history">`/patients/:id/history`</a>

#### Description

Endpoint for patient's history. Has only one operation: GET, which will return all previous immunizations of a given patient. The patient's records is signified with the a patient's ID passed as `:id`.

---

This route is _protected_. A valid token retrieved either from `/login` or `/registration` is needed. Please check this [Stack Overflow Answer](https://stackoverflow.com/a/42879201) on information on how to pass this token along with the request with Axios.

---

#### Operations and Schemas

**GET**

_Output Schema_:

```js
{
    "history": {
        "immunization_id": number,
        "immunization_name" string,
        "provider_id": number,
        "appointment_date": DateString // string with a formatted date
    }
}
```

### <a name="patient-permissions">`/patients/:id/permissions`</a>

#### Description

Endpoint for providers a patient has authorized. Has only one operation: GET, which will return all providers the patient has authorized. The patient's records is signified with the a patient's ID passed as `:id`.

---

This route is _protected_. A valid token retrieved either from `/login` or `/registration` is needed. Please check this [Stack Overflow Answer](https://stackoverflow.com/a/42879201) on information on how to pass this token along with the request with Axios.

---

#### Operations and Schemas

**GET**

_Output Schema_:

```js
{
    "id": number, // the patient's ID
    "providers": string[] // an array of string titles of providers
}
```

