# **Globalia: Track Your Global Adventures**

**Globalia** is a dynamic travel tracking platform designed to help you document, share, and explore your global adventures. Whether you're a frequent traveler, a travel enthusiast, or someone looking to see the world, **Globalia** allows you to track your travels in a fun, interactive, and social way.

## **Key Features**

* **User Authentication**: Create and manage your account to personalize your travel journey.
* **Track Your Travels**: Record the countries, states, provinces, and cities you’ve visited. Log the date and details of each trip.
* **Visual Statistics**: Gain insights into your travels with engaging metrics, maps, and progress trackers.
* **Personalized Dashboard**: View a summary of your travels, including the number of places you've been and your recent trips.
* **Social Sharing**: Showcase your global adventures by sharing your travel statistics and stories with friends and family on social media.

## **How It Works**

1. **Sign Up & Login**: Create an account to start documenting your travels.
2. **Add Travel Entries**: Track each country, state, and city you’ve visited, with options to include dates and additional details.
3. **Explore & Share**: Check your dashboard for insights into your travels and easily share your journey with the world.

## **Monetization & Future Plans**

While **Globalia** is free to use, the platform will soon offer personalized travel recommendations, ticket booking options, and partnerships with travel services. As users make purchases, **Globalia** will earn a percentage from travel tickets, eSIMs, and other travel-related products.

## **Why Globalia?**

* **Track the World**: Visualize your travel journey and track the places you’ve visited across the globe.
* **Social Connection**: Share your travels with others and engage with the global community.
* **Simple & Fun**: Documenting your travels has never been easier or more fun.

**Globalia** is more than just a travel tracker; it’s a platform that connects you to your adventures and helps you share them with the world.



---
### Tech stack 

Backend Architecture
Node.js with Express.js

RESTful API server with TypeScript
Session-based authentication using Passport.js
PostgreSQL database with Drizzle ORM
Swagger/OpenAPI documentation at /api-docs
Clean business logic separation in server/logic/
Frontend Architecture
React with TypeScript

Single Page Application (SPA) built with Vite
React Query (@tanstack/react-query) for server state management
Wouter for client-side routing
shadcn/ui components with Tailwind CSS
Interactive world map using react-simple-maps
Shared Layer
TypeScript Schema Definitions

Unified data models in shared/schema.ts
Zod validation schemas
Type safety between frontend and backend
Drizzle ORM table definitions
Database Layer
PostgreSQL with Drizzle ORM

Type-safe database operations
Schema migrations via drizzle-kit
Support for both local and Neon serverless PostgreSQL
For Vercel Deployment
When selecting your framework on Vercel, choose:

Framework: "Other" or "Node.js"

Build Command: npm run build
Output Directory: dist
Install Command: npm install
Your application uses a custom Express.js setup with Vite, so it doesn't fit the standard Next.js or pure React templates. The build process creates both the client bundle and server bundle in the dist directory.

The architecture follows modern full-stack patterns with strong type safety, clean separation of concerns, and scalable deployment-ready structure.



### Production

We use AWS Elastic Beanstalk

Why Elastic Beanstalk:

Handles deployment, capacity provisioning, load balancing, and health monitoring
Supports Node.js applications out of the box
Easy to set up and manage
Can scale automatically
Works well with your Express + PostgreSQL stack


-- Create env

This command could create a postgres on RDS by 14UDS/monthly 
```
eb create globalia-env --database.engine postgres \
                      --database.instance db.t3.micro \
                      --database.username traveltracker \
                      --database.password YOUR_SECURE_PASSWORD
```


But I've decided to use NEON database in the beginning to avoid costs

for that I've to run:
`eb create globalia-env`

eb create travel-tracker-prod \
  --timeout 20 \
  --instance-types t3.micro


```
eb create travel-tracker-prod \
  --timeout 20 \
  --instance-types t3.micro \
  --envvars \
NODE_ENV=production,\
PORT=8081,\
USE_NEON=true,\
DATABASE_URL="postgresql://neondb_owner:npg_XliKMRJna1m9@ep-small-frost-a6gdwf2f.us-west-2.aws.neon.tech/neondb?sslmode=require",\
SESSION_SECRET="pv-ola-140525"
```


export NODE_ENV=production
export PORT=8081
export USE_NEON=true
export DATABASE_URL="postgresql://neondb_owner:npg_XliKMRJna1m9@ep-small-frost-a6gdwf2f.us-west-2.aws.neon.tech/neondb?sslmode=require"
export SESSION_SECRET="pv-ola-140525"
npm run build