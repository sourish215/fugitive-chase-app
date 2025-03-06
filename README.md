# Fugitive Chase Game

## Project Overview

A Next.js TypeScript application where 3 cops try to capture a criminal hiding in one of 5 neighboring cities by selecting unique cities and appropriate vehicles.

## Gameplay

- 3 cops independently choose a city to investigate
- Select vehicles based on city distance
- Simulate criminal's location
- Determine if any cop successfully captures the fugitive

## Technologies Used

- Next.js 14
- TypeScript
- Prisma (PostgreSQL)
- Server Components
- Server Actions
- Jest
- Playwright

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up database:
   ```
   npx prisma migrate dev
   ```
4. Run development server:
   ```
   npm run dev
   ```

## Key Constraints

- Unique city selection for each cop
- Vehicle must have range for round trip
- Responsive UI
- Secure server actions

## Deployment

Deployed on Vercel: [Deployment Link]

## Assumptions

- Random criminal location generation
- Simple round-trip distance calculation
- No authentication required

```

```
