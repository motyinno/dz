# JSONPlaceholder API Clone - API Documentation

This document provides detailed information about the endpoints available in the JSONPlaceholder API Clone.

## Base URL

When running locally, the API is available at:

```
http://localhost:3000
```

## Authentication

### Register a new user

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Users

### Get all users

**Endpoint:** `GET /users`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  // More users...
]
```

### Get user by ID

**Endpoint:** `GET /users/:id`

**Response:**
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

### Create a new user

**Endpoint:** `POST /users`

**Authentication:** Required (Bearer Token)

**Request Body:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "address": {
    "street": "Test Street",
    "suite": "Suite 123",
    "city": "Test City",
    "zipcode": "12345-6789",
    "geo": {
      "lat": "40.7128",
      "lng": "-74.0060"
    }
  },
  "phone": "123-456-7890",
  "website": "johndoe.com",
  "company": {
    "name": "Test Company",
    "catchPhrase": "Testing is fun",
    "bs": "test business"
  }
}
```

**Response:**
```json
{
  "id": 11,
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "address": {
    "street": "Test Street",
    "suite": "Suite 123",
    "city": "Test City",
    "zipcode": "12345-6789",
    "geo": {
      "lat": "40.7128",
      "lng": "-74.0060"
    }
  },
  "phone": "123-456-7890",
  "website": "johndoe.com",
  "company": {
    "name": "Test Company",
    "catchPhrase": "Testing is fun",
    "bs": "test business"
  }
}
```

### Update a user

**Endpoint:** `PUT /users/:id`

**Authentication:** Required (Bearer Token)

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "username": "johndoeupdated",
  "email": "johnupdated@example.com",
  "address": {
    "street": "Updated Street",
    "suite": "Suite 456",
    "city": "Updated City",
    "zipcode": "98765-4321",
    "geo": {
      "lat": "34.0522",
      "lng": "-118.2437"
    }
  },
  "phone": "987-654-3210",
  "website": "johndoeupdated.com",
  "company": {
    "name": "Updated Company",
    "catchPhrase": "Updated catchphrase",
    "bs": "updated business"
  }
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe Updated",
  "username": "johndoeupdated",
  "email": "johnupdated@example.com",
  "address": {
    "street": "Updated Street",
    "suite": "Suite 456",
    "city": "Updated City",
    "zipcode": "98765-4321",
    "geo": {
      "lat": "34.0522",
      "lng": "-118.2437"
    }
  },
  "phone": "987-654-3210",
  "website": "johndoeupdated.com",
  "company": {
    "name": "Updated Company",
    "catchPhrase": "Updated catchphrase",
    "bs": "updated business"
  }
}
```

### Partially update a user

**Endpoint:** `PATCH /users/:id`

**Authentication:** Required (Bearer Token)

**Request Body:**
```json
{
  "name": "John Doe Patched",
  "email": "johnpatched@example.com"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe Patched",
  "username": "johndoeupdated",
  "email": "johnpatched@example.com",
  "address": {
    "street": "Updated Street",
    "suite": "Suite 456",
    "city": "Updated City",
    "zipcode": "98765-4321",
    "geo": {
      "lat": "34.0522",
      "lng": "-118.2437"
    }
  },
  "phone": "987-654-3210",
  "website": "johndoeupdated.com",
  "company": {
    "name": "Updated Company",
    "catchPhrase": "Updated catchphrase",
    "bs": "updated business"
  }
}
```

### Delete a user

**Endpoint:** `DELETE /users/:id`

**Authentication:** Required (Bearer Token)

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

## Error Responses

### Authentication Errors

**401 Unauthorized:**
```json
{
  "message": "Authorization header is missing"
}
```

```json
{
  "message": "Token is missing"
}
```

```json
{
  "message": "Invalid or expired token"
}
```

### Validation Errors

**400 Bad Request:**
```json
{
  "errors": [
    {
      "msg": "Name is required",
      "param": "name",
      "location": "body"
    }
  ]
}
```

### Resource Not Found

**404 Not Found:**
```json
{
  "message": "User not found"
}
```

### Server Errors

**500 Internal Server Error:**
```json
{
  "message": "Internal server error"
}
```
