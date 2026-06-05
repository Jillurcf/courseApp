# Course App

A React Native (Expo) application that allows users to browse courses, search and filter content, view course details, and manage enrollments. The application follows an Offline-First architecture using SQLite as the local source of truth and Supabase as the remote backend.

---

## Tech Stack

### Frontend
- Expo SDK 56
- React Native
- TypeScript
- Expo Router (File-Based Navigation)

### State Management
- Zustand

### Local Storage
- Expo SQLite

### Backend
- Supabase

### Network Monitoring
- @react-native-community/netinfo

### Testing
- Jest
- React Native Testing Library

---

## Architecture

Feature-Based Architecture with Offline-First design.

### Folder Structure

```text
src/
│
├── app/
│   ├── course/
│   │   └── [id].tsx
│   ├── index.tsx
│   └── _layout.tsx
│
├── database/
│   ├── initDB.ts
│   └── sqlite.ts
│
├── hooks/
│   ├── useCourse.ts
│   ├── useNetwork.ts
│   └── useAutoSync.ts
│
├── services/
│   └── supabase.ts
│
├── features/
│   └── courses/
│       ├── api/
│       ├── logic/
│       ├── repository/
│       └── ui/
│
├── store/
│   ├── course.store.ts
│   └── course.type.ts
│
└── tests/
```

---

## Offline-First Strategy

The application uses SQLite as the source of truth.

### Data Flow

```text
Supabase
    ↓
Sync Engine
    ↓
SQLite Database
    ↓
Zustand Store
    ↓
UI
```

### Sync Process

1. Load data from SQLite immediately.
2. Display cached data even when offline.
3. Fetch latest data from Supabase.
4. Update SQLite with server data.
5. Preserve local enrollment status.
6. Update Zustand store.
7. UI refreshes automatically.

---

## Features

### Course List Screen
- Display courses from local database
- Search by course title
- Search by instructor name
- Filter by:
  - All
  - Free
  - Premium
  - Enrolled
- Pull-to-refresh
- Online/Offline indicator
- Last synced timestamp
- Loading state
- Error state

### Course Detail Screen
- View full course information
- View instructor details
- View course duration
- View course rating
- Enroll in course
- Remove enrollment

### Offline Features
- Offline course browsing
- Offline search
- Offline filtering
- Offline enrollment updates
- Automatic sync when internet returns

---

## Database Schema

### Supabase Table: courses

| Column | Type |
|----------|----------|
| course_id | text (primary key) |
| title | text |
| description_short | text |
| instructor_name | text |
| duration_weeks | integer |
| price_usd | numeric |
| is_premium | boolean |
| tags | text[] |
| rating | numeric |
| last_updated | timestamptz |

---

## SQLite Schema

```sql
CREATE TABLE IF NOT EXISTS courses (
  course_id TEXT PRIMARY KEY,
  title TEXT,
  description_short TEXT,
  instructor_name TEXT,
  duration_weeks INTEGER,
  price_usd REAL,
  is_premium INTEGER,
  tags TEXT,
  rating REAL,
  is_enrolled INTEGER DEFAULT 0,
  last_updated TEXT
);
```

---

## Environment Variables

Create a `.env` file:

```env
EXPO_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

---

## Installation

### Install Dependencies

```bash
npm install
```

### Start Expo

```bash
npx expo start
```

### Run Android

```bash
npm run android
```

### Run iOS

```bash
npm run ios
```

### Run Web

```bash
npm run web
```

---

## State Management

Zustand manages:

- Courses
- Search state
- Filter state
- Enrollment state
- Last synced timestamp

---

## Network Handling

Implemented using NetInfo.

Features:
- Online/offline detection
- Offline banner
- Automatic sync when internet reconnects
- Local cache fallback

---

## Performance Optimizations

- FlatList rendering
- useMemo for filtering
- SQLite as source of truth
- Minimal re-renders with Zustand

---

## Testing

Implemented test cases for:

### Course Store Test
- Enrollment toggle functionality

### Filter/Search Test
- Search functionality
- Filter functionality

### Sync Logic Test
- Synchronization flow

Run tests:

```bash
npm test
```

---

## Sync Flow

```text
Supabase
   ↓
Sync Courses
   ↓
SQLite
   ↓
Zustand Store
   ↓
UI
```

---

## Future Improvements

- User Authentication
- Dark Mode
- FlashList Integration
- Push Notifications
- Background Scheduled Sync
- CI/CD Pipeline

---

## Summary

This project demonstrates:

- Expo Router Navigation
- Offline-First Architecture
- SQLite Local Persistence
- Supabase Integration
- Zustand State Management
- Search & Filter Functionality
- Auto Synchronization
- TypeScript Development
- Unit Testing
- Production-Ready Mobile Architecture