# Globalia App

version: v0

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

Follow these [steps](local.md)


## Project Structure

- `/client` - Frontend React application
  - `/src` - Source code
    - `/components` - Reusable UI components
    - `/hooks` - Custom React hooks
    - `/lib` - Utility functions and helpers
    - `/pages` - Page components
- `/server` - Backend Express application
  - logic, API routes and server configuration
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