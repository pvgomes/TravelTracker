# Travel Tracker - Local Development Setup

This guide will help you run the Travel Tracker application locally using Docker for PostgreSQL.

## Prerequisites

- Node.js 18+ installed
- Docker and Docker Compose installed
- Git

## Quick Start

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/yourusername/travel-tracker.git
cd travel-tracker
npm install
```

### 2. Start docker

```bash
docker compose up
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Local PostgreSQL Configuration
DATABASE_URL=postgresql://traveltracker:traveltrackerpassword@localhost:5432/travel_tracker

# Database connection details (automatically set from DATABASE_URL)
PGHOST=localhost
PGPORT=5432
PGUSER=traveltracker
PGPASSWORD=traveltrackerpassword
PGDATABASE=travel_tracker

# Session configuration
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# Development mode
NODE_ENV=development
```

### 4. Initialize the Database

Push the database schema to your local PostgreSQL:

```bash
npm run db:push
```

This command will:
- Connect to your local PostgreSQL instance
- Create all necessary tables (users, visits, sessions)
- Set up the database schema

### 5. Start the Development Server

```bash
npm run dev
```

The application will now:
- Load your `.env` file automatically
- Show "📊 Using local PostgreSQL" in the console
- Start on `http://localhost:5000`

## Database Management

### Viewing Database Schema
```bash
npm run db:studio
```

### Applying Schema Changes
After modifying `shared/schema.ts`, run:
```bash
npm run db:push
```

### Reset Database (if needed)
```bash
# Stop the container
docker-compose down

# Remove the volume to delete all data
docker volume rm <project>_postgres_data

# Restart
docker compose up -d
npm run db:push
```

## API Documentation

Once running, visit:
- **Application**: `http://localhost:5000`
- **API Documentation**: `http://localhost:5000/api-docs`

The Swagger documentation provides interactive API testing capabilities.

## Switching Between Local and Remote Database

The application automatically detects whether to use local PostgreSQL or Neon based on the `DATABASE_URL`:

### For Local Development:
```env
DATABASE_URL=postgresql://traveltracker:traveltrackerpassword@localhost:5432/travel_tracker
```

### For Neon (Production):
```env
DATABASE_URL=postgresql://username:password@ep-example.neon.tech/database?sslmode=require
```

No code changes needed - the application handles both seamlessly!

## Troubleshooting

### Database Connection Issues

1. **Check if PostgreSQL is running:**
   ```bash
   docker ps | grep postgres
   ```

2. **Check PostgreSQL logs:**
   ```bash
   docker logs traveltracker_postgres
   ```

3. **Test connection manually:**
   ```bash
   psql postgresql://traveltracker:traveltrackerpassword@localhost:5432/travel_tracker
   ```

### Common Issues

**Port 5432 already in use:**
- Change the port in docker-compose.yml: `"5433:5432"`
- Update DATABASE_URL: `postgresql://traveltracker:traveltrackerpassword@localhost:5433/travel_tracker`

**Permission denied:**
- Ensure Docker has permission to create volumes
- Try: `sudo chown -R $USER:$USER .`

**Schema not found:**
- Run `npm run db:push` to create tables
- Check if the database exists: `docker exec -it traveltracker_postgres psql -U traveltracker -d travel_tracker -c "\dt"`

## Development Workflow

1. **Make changes** to your code
2. **Test locally** with `npm run dev`
3. **Update database schema** with `npm run db:push` if needed
4. **View API docs** at `/api-docs` to test endpoints
5. **Deploy** when ready (the same code works with Neon automatically)

## Project Structure

```
travel-tracker/
├── client/          # Frontend React application
├── server/          # Backend Express API
├── shared/          # Shared types and schemas
├── local.md         # This file
├── package.json     # Dependencies and scripts
└── .env            # Environment variables (create this)
```

## Useful Commands

```bash
# Start development server
npm run dev

# Push database schema
npm run db:push

# View database in browser
npm run db:studio

# Start only the database
docker-compose up -d postgres

# Stop everything
docker-compose down

# View logs
docker-compose logs -f postgres
```

## Running Tests

This project includes comprehensive unit tests for the business logic layer using Jest.

### Available Test Commands

```bash
# Run all tests once
npx jest

# Run tests in watch mode (re-runs on file changes)
npx jest --watch

# Run tests with coverage report
npx jest --coverage

# Run specific test file
npx jest server/__tests__/auth.test.ts

# Run tests matching a pattern
npx jest --testNamePattern="createUser"

# Run tests in verbose mode
npx jest --verbose
```

### Test Structure

Tests are located in `server/__tests__/` and cover all business logic:

- **Auth Logic Tests** (`auth.test.ts`)
  - Password hashing and comparison
  - Authentication security validation
  - ✅ 4 tests passing

- **User Logic Tests** (`user.test.ts`)
  - User creation and validation
  - Share ID generation and uniqueness
  - User retrieval operations
  - ✅ 6 tests passing

- **Visit Logic Tests** (`visit.test.ts`)
  - Visit creation and validation
  - Visit retrieval and filtering
  - Visit updates and deletion
  - Access control verification
  - ✅ 10 tests passing

**Total: 20 tests passing with 100% success rate**

### Test Configuration

- Tests use mocked storage layer to avoid database dependencies
- Jest configuration is optimized for TypeScript in `jest.config.cjs`
- Tests run in isolated environment with proper cleanup
- Each test suite focuses on pure business logic without side effects

### Writing New Tests

When adding new business logic:
1. Create corresponding test files in `server/__tests__/`
2. Mock external dependencies (storage, APIs) at the top of test files
3. Test both success and error scenarios
4. Ensure proper error handling and validation
5. Follow the existing test patterns for consistency

### Testing Best Practices

- Run tests before deploying changes: `npx jest`
- Use watch mode during development: `npx jest --watch`
- Verify test coverage: `npx jest --coverage`
- Each logic function should have corresponding unit tests
- Mock external dependencies to ensure tests are fast and reliable

## Code Quality & Architecture

The server code is organized with clean separation of concerns:

```
server/
├── logic/              # Pure business logic (unit tested)
│   ├── auth.ts        # Authentication & password handling
│   ├── user.ts        # User management operations
│   ├── visit.ts       # Visit CRUD operations
│   └── validation.ts  # Request validation middleware
├── __tests__/         # Unit tests for logic layer
└── routes.ts          # HTTP route handlers (thin layer)
```

This architecture makes the code:
- **Testable** - Business logic is pure and easily unit tested
- **Maintainable** - Clear separation between HTTP handling and business rules
- **Reusable** - Logic can be used across different routes or contexts

## Next Steps

- Create your user account at `http://localhost:5000/auth`
- Start tracking your travels!
- Explore the API at `http://localhost:5000/api-docs`
- Run tests with `npx jest` to ensure everything works

Happy coding! 🚀✈️