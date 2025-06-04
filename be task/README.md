# JSONPlaceholder API Clone

A backend API that replicates the behavior and structure of JSONPlaceholder with extended support for full REST operations, JWT-based authentication, structured user data storage, and containerized deployment.

## Features

- **Full REST API**: Complete CRUD operations for user resources
- **Authentication**: JWT-based authentication system
- **Database**: PostgreSQL for persistent data storage
- **TypeScript**: Type-safe implementation with TypeORM
- **Docker**: Containerized deployment with Docker and Docker Compose
- **Testing**: Comprehensive unit and integration tests

## Project Structure

```
.
├── src/
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Express middleware
│   ├── models/            # TypeORM entities
│   ├── routes/            # API routes
│   ├── migrations/        # Database migrations
│   ├── tests/             # Test files
│   ├── data-source.ts     # Database connection
│   ├── index.ts           # Application entry point
│   └── seed.ts            # Database seeding
├── scripts/               # Utility scripts
├── .env                   # Environment variables
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile             # Docker configuration
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
└── jest.config.js         # Testing configuration
```

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your system

### Running the Application

```bash
# Clone the repository (if applicable)
git clone <repository-url>
cd <repository-directory>

# Start the application and database containers
docker-compose up

# The API will be available at http://localhost:3000
```

### Development Setup (without Docker)

```bash
# Install dependencies
npm install

# Set up the database (make sure PostgreSQL is running)
npm run migration:run

# Seed the database with initial data
npm run seed

# Start the development server
npm run dev
```

## API Documentation

Detailed API documentation is available in the [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) file.

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get a specific user
- `POST /users` - Create a new user (requires authentication)
- `PUT /users/:id` - Update a user (requires authentication)
- `PATCH /users/:id` - Partially update a user (requires authentication)
- `DELETE /users/:id` - Delete a user (requires authentication)

## Testing

```bash
# Run tests
docker-compose run app npm test

# Run tests locally
npm test
```

## Postman Collection

A Postman collection is included in the repository for easy API testing. Import the `JSONPlaceholder_API_Clone.postman_collection.json` file into Postman to get started.

## License

This project is licensed under the MIT License.

