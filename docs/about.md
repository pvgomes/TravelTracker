# **Globalia: Track Your Global Adventures**

**Globalia** is a dynamic travel tracking platform designed to help you document, share, and explore your global adventures. Whether you're a frequent traveler, a travel enthusiast, or someone looking to see the world, **Globalia** allows you to track your travels in a fun, interactive, and social way.

## **Key Features**

- **User Authentication**: Create and manage your account to personalize your travel journey.
- **Track Your Travels**: Record the countries, states, provinces, and cities you’ve visited. Log the date and details of each trip.
- **Visual Statistics**: Gain insights into your travels with engaging metrics, maps, and progress trackers.
- **Personalized Dashboard**: View a summary of your travels, including the number of places you've been and your recent trips.
- **Social Sharing**: Showcase your global adventures by sharing your travel statistics and stories with friends and family on social media.

## **How It Works**

1. **Sign Up & Login**: Create an account to start documenting your travels.
2. **Add Travel Entries**: Track each country, state, and city you’ve visited, with options to include dates and additional details.
3. **Explore & Share**: Check your dashboard for insights into your travels and easily share your journey with the world.

## **Monetization & Future Plans**

While **Globalia** is free to use, the platform will soon offer personalized travel recommendations, ticket booking options, and partnerships with travel services. As users make purchases, **Globalia** will earn a percentage from travel tickets, eSIMs, and other travel-related products.

## **Why Globalia?**

- **Track the World**: Visualize your travel journey and track the places you’ve visited across the globe.
- **Social Connection**: Share your travels with others and engage with the global community.
- **Simple & Fun**: Documenting your travels has never been easier or more fun.

**Globalia** is more than just a tracking tool; it’s a platform that connects you to your adventures and helps you share them with the world.

---

## **Tech Stack**

### **Backend Architecture**
- **Node.js with Express.js**: RESTful API server with TypeScript.
- **Authentication**: Passport.js with local strategy.
- **Database**: PostgreSQL with Drizzle ORM.
- **API Documentation**: Swagger/OpenAPI available at `/api-docs`.
- **Clean Architecture**: Well-separated business logic in `server/logic/`.

### **Frontend Architecture**
- **React** (built with Vite) and **TypeScript**.
- **State Management**: React Query (@tanstack/react-query).
- **Routing**: Wouter for client-side routing.
- **UI Components**: shadcn/ui components with TailwindCSS.
- **Interactive Map**: React-simple-maps for the world map.

### **Shared Layer**
- **TypeScript Schema Definitions**: Unified data models in `shared/schema.ts`.
- **Zod Validation**: Type safety between frontend and backend.
- **Database Layer**: Type-safe database operations with Drizzle ORM, supporting both local and Neon serverless PostgreSQL.

### **For Vercel Deployment**
- **Framework**: "Other" or "Node.js" (Custom Express.js setup with Vite).
- **Build Command**: `npm run build`.
- **Output Directory**: `dist`.
- **Install Command**: `npm install`.

The architecture follows modern full-stack patterns with strong type safety, clean separation of concerns, and scalable deployment-ready structure.

---
