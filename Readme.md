# User CRUD API Documentation

## Overview

This API provides CRUD (Create, Read, Update, Delete) operations for managing users. User data is stored in a local `db.json` file. The API is built using Express.js and uses the file system for data persistence.

---

## File Structure

- **db.json**: Stores user data as a JSON array.
- **users.js**: Contains all user-related API routes and logic.

---

## Endpoints

### 1. Get All Users

- **Endpoint:** `GET /users`
- **Description:** Retrieves a list of all users.
- **Response:**  
  - `200 OK`: Returns an array of user objects.

#### Example Response

```json
[
  {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "age": 25
  },
  ...
]
```

---

### 2. Get User by ID

- **Endpoint:** `GET /users/:id`
- **Description:** Retrieves a user by their unique ID.
- **Parameters:**
  - `id` (integer): The user's ID.
- **Response:**
  - `200 OK`: Returns the user object.
  - `404 Not Found`: User not found.

#### Example Response

```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "age": 25
}
```

---

### 3. Create a New User

- **Endpoint:** `POST /users`
- **Description:** Creates a new user.
- **Request Body:**
  - `name` (string, required)
  - `email` (string, required)
  - `age` (integer, optional)
- **Response:**
  - `201 Created`: Returns the created user object.
  - `400 Bad Request`: Missing required fields.
  - `409 Conflict`: Email already exists.

#### Example Request

```json
{
  "name": "Bob",
  "email": "bob@example.com",
  "age": 30
}
```

#### Example Response

```json
{
  "id": 2,
  "name": "Bob",
  "email": "bob@example.com",
  "age": 30
}
```

---

### 4. Update a User (Full Update)

- **Endpoint:** `PUT /users/:id`
- **Description:** Updates all fields of a user.
- **Parameters:**
  - `id` (integer): The user's ID.
- **Request Body:**
  - `name` (string, required)
  - `email` (string, required)
  - `age` (integer, optional)
- **Response:**
  - `200 OK`: Returns the updated user object.
  - `400 Bad Request`: Missing required fields.
  - `404 Not Found`: User not found.
  - `409 Conflict`: Email already exists.

---

### 5. Update a User (Partial Update)

- **Endpoint:** `PATCH /users/:id`
- **Description:** Updates one or more fields of a user.
- **Parameters:**
  - `id` (integer): The user's ID.
- **Request Body:** Any combination of:
  - `name` (string)
  - `email` (string)
  - `age` (integer)
- **Response:**
  - `200 OK`: Returns the updated user object.
  - `404 Not Found`: User not found.
  - `409 Conflict`: Email already exists.

---

### 6. Delete a User

- **Endpoint:** `DELETE /users/:id`
- **Description:** Deletes a user by ID.
- **Parameters:**
  - `id` (integer): The user's ID.
- **Response:**
  - `200 OK`: Returns the deleted user object.
  - `404 Not Found`: User not found.

---

## Data Model

Each user object has the following structure:

```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "age": 25
}
```

- `id`: Unique integer identifier (auto-incremented).
- `name`: User's name (string, required).
- `email`: User's email (string, required, unique).
- `age`: User's age (integer, optional).

---

## Error Responses

- `400 Bad Request`: Missing required fields in the request body.
- `404 Not Found`: User with the specified ID does not exist.
- `409 Conflict`: Email already exists in the database.

---

## Internal Functions

- **readDB()**: Reads and parses the `db.json` file.
- **writeDB(data)**: Stringifies and writes the data to `db.json` with 2-space indentation.

---

## Notes

- All data is stored in a local file (`db.json`). This is not suitable for production use.
- The API does not implement authentication or authorization.
- Email addresses must be unique.

---

## Example Usage

**Get all users:**
```bash
curl http://localhost:3000/users
```

**Create a user:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Bob","email":"bob@example.com"}' http://localhost:3000/users
```

---

## License

This project is for educational/demo purposes.