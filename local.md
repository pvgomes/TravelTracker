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

The project structure includes a clean logic layer that's designed for testing. Due to the ESM module configuration, Jest requires additional setup for this particular project structure.

### Manual Testing Approach

For now, you can test the business logic manually using the development server:

```bash
# Start the development server
npm run dev

# Test API endpoints directly using curl or the Swagger UI
curl -X POST http://localhost:5000/api-docs
```

### Logic Layer Structure

The business logic is cleanly separated in `server/logic/` for easy testing:

- **Auth Logic** (`auth.ts`) - Password hashing and authentication
- **User Logic** (`user.ts`) - User management and share ID generation  
- **Visit Logic** (`visit.ts`) - Visit CRUD operations and validation
- **Validation Logic** (`validation.ts`) - Request validation middleware

### Testing Recommendations

1. **API Testing**: Use the Swagger UI at `/api-docs` to test endpoints
2. **Manual Testing**: Test business logic through the application interface
3. **Integration Testing**: Verify the complete user workflows
4. **Database Testing**: Use the actual PostgreSQL database for realistic testing

### Future Test Setup

To add automated testing in the future:
1. Configure Jest with proper ESM support for this project structure
2. Create test files that match the clean logic separation
3. Add proper mocking for database operations
4. Set up continuous integration testing

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