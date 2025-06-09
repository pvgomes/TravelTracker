# Globalia App

A dynamic travel tracking web application that helps users document and explore global adventures through an interactive platform.

[Learn more about Globalia here](docs/about.md).

## Features

- User authentication system
- Track countries, states/provinces, and cities you've visited
- Visual statistics and metrics of your travels
- Add and manage your travel history
- Personalized dashboard with travel insights

## Tech Stack

- **Frontend**: React (built with Vite), TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with local strategy

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v14 or higher)

## Usage Guide

1. **Registration and Login**:
   - Navigate to `/auth` to create a new account or login.
   - Enter your credentials to access the application.

2. **Adding Travel Entries**:
   - Click "Add Country" on the dashboard.
   - Select the country, state/province, and city you visited.
   - Add the date of your visit.
   - Submit the form to add the entry to your travel history.

3. **Viewing Statistics**:
   - Your travel statistics are displayed on the dashboard.
   - See the number of countries visited.
   - View recent travel entries.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
