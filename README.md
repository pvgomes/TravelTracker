# Travel Tracker App

A dynamic travel tracking web application that helps users document and explore global adventures through an interactive platform.

## Features

- User authentication system
- Track countries, states/provinces, and cities you've visited
- Visual statistics and metrics of your travels
- Add and manage your travel history
- Personalized dashboard with travel insights

## Tech Stack

- **Frontend**: TypeScript, React, TailwindCSS, Shadcn UI
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with local strategy

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v14 or higher)

## Local Setup

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/travel-tracker.git
cd travel-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the database

Create a PostgreSQL database and configure the connection string:

- Create a `.env` file in the root directory
- Add the following environment variables:

```
DATABASE_URL=postgresql://traveltracker:traveltrackerpassword@localhost:5432/travel_tracker
SESSION_SECRET=your_session_secret_here
```

still WIP untill fix local environment well using local postgree
;DATABASE_URL=postgresql://traveltracker:traveltrackerpassword@localhost:5432/travel_tracker


Replace `username`, `password`, and `travel_tracker` with your PostgreSQL credentials and desired database name.

#### 3.2 Load on the env
```
export $(cat .env | xargs)
echo $DATABASE_URL
```

#### 3.3 Create database if doesn't exist yet
```
psql "postgresql://traveltracker:traveltrackerpassword@localhost:5432/postgres" -c "CREATE DATABASE travel_tracker;"
```

### 4. Set up the database schema

Run the Drizzle migrations to set up your database schema:

```bash
npm run db:push
```

### 5. Start the development server

```bash
npm run dev
```

This will start both the frontend and backend servers. The application will be available at [http://localhost:5000](http://localhost:5000).

## Project Structure

- `/client` - Frontend React application
  - `/src` - Source code
    - `/components` - Reusable UI components
    - `/hooks` - Custom React hooks
    - `/lib` - Utility functions and helpers
    - `/pages` - Page components
- `/server` - Backend Express application
  - API routes and server configuration
- `/shared` - Shared code between frontend and backend
  - Database schema definitions

## Usage Guide

1. **Registration and Login**:
   - Navigate to `/auth` to create a new account or login
   - Enter your credentials to access the application

2. **Adding Travel Entries**:
   - Click "Add Country" on the dashboard
   - Select the country, state/province, and city you visited
   - Add the date of your visit
   - Submit the form to add the entry to your travel history

3. **Viewing Statistics**:
   - Your travel statistics are displayed on the dashboard
   - See the number of countries visited
   - View recent travel entries

## Troubleshooting

- **Database Connection Issues**: Ensure your PostgreSQL server is running and the connection string in `.env` is correct
- **Authentication Problems**: Check that your SESSION_SECRET is properly set in the `.env` file
- **Missing Dependencies**: Make sure you've run `npm install` to install all required packages

## License

This project is licensed under the MIT License - see the LICENSE file for details.