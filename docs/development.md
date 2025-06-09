# Globalia - Local Development Setup

This guide will help you run the Globalia application locally using Docker for PostgreSQL.

## Quick Start

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/yourusername/travel-tracker.git
cd travel-tracker
npm install
```

### 2. Start Docker

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

## Troubleshooting

- **Database Connection Issues**: Ensure your PostgreSQL server is running and the connection string in `.env` is correct.
- **Authentication Problems**: Check that your SESSION_SECRET is properly set in the `.env` file.
- **Missing Dependencies**: Make sure you've run `npm install` to install all required packages.

## API Documentation

Once running, visit:
- **Application**: `http://localhost:8081`
- **API Documentation**: `http://localhost:8081/api-docs`

The Swagger documentation provides interactive API testing capabilities.

## Switching Between Local and Remote Database

The application automatically detects whether to use local PostgreSQL or Neon based on the `DATABASE_URL`.

### For Local Development:
```env
DATABASE_URL=postgresql://traveltracker:traveltrackerpassword@localhost:5432/travel_tracker
```

### For Neon (Production):
```env
DATABASE_URL=postgresql://username:password@ep-example.neon.tech/database?sslmode=require
```

No code changes needed - the application handles both seamlessly!

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

