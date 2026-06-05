# Course App

## Tech Stack
- Expo React Native
- TypeScript
- Supabase
- SQLite (expo-sqlite)
- Zustand

---

## Architecture
Feature-based Clean Architecture with Offline-First design.

---

## Offline Strategy
1. Load data from SQLite first (instant UI)
2. Sync with Supabase in background
3. Merge server data with local enrollment
4. Persist updated data in SQLite
5. UI updates automatically via Zustand

---

## Database Schema (Supabase)

Table: courses

- course_id (text, primary key)
- title (text)
- description_short (text)
- instructor_name (text)
- duration_weeks (int)
- price_usd (number)
- is_premium (boolean)
- tags (text[])
- rating (number)
- last_updated (timestamp)

---

## Setup

1. npm install
2. create .env file
3. add Supabase URL + anon key
4. run expo start or
5. npm run android

---

## Local DB
Uses expo-sqlite for offline storage.

---

## Sync Flow
Supabase → Sync Engine → SQLite → Zustand → UI

---

## Testing
- repository tests
- sync logic tests
- filter/search tests

---

## Features
- Offline-first browsing
- Course search
- Enrollment system
- Background sync
- Persistent local state

---

## Notes
- SQLite is the source of truth
- Supabase is remote source only