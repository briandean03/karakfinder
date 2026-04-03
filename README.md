# Karak Finder

**"Boiler Room for DJs — But for Private Events"**

A Dubai-based DJ discovery and booking platform that matches event organizers with DJs based on vibe matching and proof — not followers.

## 🎯 Project Overview

Karak Finder is an MVP demo platform that helps event organizers in Dubai find and book the perfect DJ for their events. The platform features:

- **Vibe-Based Matching Algorithm**: Matches DJs to events based on genre, vibe, budget, and location
- **Proof-Based Discovery**: DJs are ranked by mix quality and crowd proof, not social media followers
- **Level System**: NEW, READY, VERIFIED, and ELITE DJs with different scoring criteria
- **WhatsApp Booking**: Simple booking flow via WhatsApp (no payments/auth in MVP)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000 (or http://localhost:3001 if port 3000 is in use)
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
karakfinder/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes
│   │   │   ├── djs/route.ts         # GET /api/djs
│   │   │   └── match/route.ts       # POST /api/match
│   │   ├── dj/[id]/page.tsx         # DJ Profile page
│   │   ├── djs/page.tsx             # DJ Discovery page
│   │   ├── matches/page.tsx         # Match Results page
│   │   ├── request-event/page.tsx   # Event Request Form
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Landing page
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── ui/                      # Shadcn UI components
│   │   ├── features/                # Feature components
│   │   │   ├── dj-card.tsx
│   │   │   ├── mix-player.tsx
│   │   │   ├── crowd-clip-player.tsx
│   │   │   ├── match-card.tsx
│   │   │   └── whatsapp-button.tsx
│   │   └── layout/
│   │       ├── header.tsx
│   │       └── footer.tsx
│   ├── lib/
│   │   ├── matching-algorithm.ts    # Core matching logic
│   │   ├── data-access.ts           # Data loading utilities
│   │   ├── constants.ts             # App constants
│   │   └── utils.ts                 # Helper functions
│   ├── types/
│   │   ├── dj.ts                    # DJ type definitions
│   │   ├── event.ts                 # Event types
│   │   └── match.ts                 # Match result types
│   └── data/
│       └── djs.json                 # Mock DJ data (8 DJs)
├── public/
│   ├── audio/                       # Placeholder audio files
│   └── video/                       # Placeholder video files
└── README.md
```

## 🎵 Features

### 1. Landing Page (`/`)
- Hero section introducing the platform
- Feature highlights
- CTA buttons to browse DJs or request DJ for event

### 2. DJ Discovery (`/djs`)
- Grid view of all available DJs
- Shows DJ level badges (NEW, READY, VERIFIED, ELITE)
- Displays genres, location, price, and scores
- Click any card to view full profile

### 3. DJ Profile (`/dj/[id]`)
- Full DJ bio and information
- Mix uploads (audio player)
- Crowd clips (video player)
- Score breakdown (Mix Score, Crowd Score, Reliability)
- WhatsApp booking button

### 4. Event Request Form (`/request-event`)
- Location selector (Dubai areas)
- Event type selector
- Genre/vibe multi-select
- Budget range sliders
- Duration selector
- Real-time form validation (React Hook Form + Zod)
- Submits to matching algorithm

### 5. Match Results (`/matches`)
- Top 5 DJ matches ranked by score
- Match percentage and explanation
- Event details summary
- Direct links to DJ profiles
- WhatsApp booking buttons

## 🧮 Matching Algorithm

### Scoring Rules

**For NEW DJs:**
- Mix Score: 50%
- Genre match: 40%
- Price fit: 10%
- Location bonus: +5 points

**For VERIFIED/ELITE/READY DJs:**
- Crowd Score: 50%
- Genre match: 30%
- Reliability: 20%
- Location bonus: +5 points

The algorithm returns the top 5 DJs with match explanations.

## 🎨 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Component library
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **TypeScript** - Type safety
- **JSON Files** - Mock data storage (no database in MVP)

## 📊 Mock Data

The platform includes 8 Dubai-based DJs:

1. **DJ Rashid** (Marina, House, VERIFIED)
2. **DJ Layla** (Downtown, Hip-Hop/R&B, ELITE)
3. **DJ Marco** (Jumeirah, Techno, NEW)
4. **DJ Amina** (Palm, Tech House, READY)
5. **DJ Hassan** (JBR, Arabic Fusion, VERIFIED)
6. **DJ Sofia** (Business Bay, Deep House, NEW)
7. **DJ Khalid** (Al Barsha, Commercial, ELITE)
8. **DJ Noor** (City Walk, Afrohouse, VERIFIED)

Each DJ has:
- Unique ID, name, location
- Genres and vibe tags
- Level (NEW/READY/VERIFIED/ELITE)
- Price per hour
- Bio
- Mix URLs (audio files)
- Crowd clip URLs (video files)
- Scores (Mix Score, Crowd Score, Reliability Score)
- WhatsApp number

## 🔌 API Endpoints

### GET `/api/djs`
Returns all DJs or filtered DJs.

**Query Parameters:**
- `id` - Get specific DJ by ID
- `location` - Filter by Dubai location
- `genre` - Filter by genre
- `level` - Filter by level (NEW, READY, VERIFIED, ELITE)

**Example:**
```bash
# Get all DJs
curl http://localhost:3000/api/djs

# Get specific DJ
curl http://localhost:3000/api/djs?id=dj-001

# Filter by location
curl http://localhost:3000/api/djs?location=Dubai%20Marina
```

### POST `/api/match`
Matches DJs to event criteria.

**Request Body:**
```json
{
  "location": "Dubai Marina",
  "eventType": "Villa Party",
  "vibes": ["House", "Tech House"],
  "budgetMin": 500,
  "budgetMax": 1000,
  "duration": 4
}
```

**Response:**
```json
[
  {
    "dj": { /* DJ object */ },
    "score": 85.5,
    "matchPercentage": 86,
    "explanation": "Mix quality: 85/100 • Genre match: 80% • Price fit: 100%"
  }
]
```

## 🎯 User Journey

1. **Landing** → User arrives at home page
2. **Browse DJs** → User clicks "Browse DJs" to see all DJs
3. **View Profile** → User clicks DJ card to see full profile with mixes and clips
4. **Book via WhatsApp** → User clicks WhatsApp button to book

**OR**

1. **Landing** → User arrives at home page
2. **Request DJ** → User clicks "Request DJ for Event"
3. **Fill Form** → User enters event details (location, type, vibes, budget, duration)
4. **View Matches** → System shows top 5 matched DJs with scores and explanations
5. **Book via WhatsApp** → User selects preferred DJ and books via WhatsApp

## 📱 WhatsApp Integration

The platform uses WhatsApp Web API links for booking:

```typescript
https://wa.me/{phone_number}?text={encoded_message}
```

Pre-filled message includes:
- DJ name
- Event location (if available)
- Event type (if available)
- Duration (if available)

## 🚧 MVP Limitations

This is an MVP demo with the following limitations:

- ❌ No authentication/user accounts
- ❌ No payments/transactions
- ❌ No database (uses JSON mock data)
- ❌ No real audio/video files (placeholder files)
- ❌ No booking confirmation system
- ❌ No admin panel for DJs
- ❌ No real-time availability
- ❌ No reviews/ratings system

## 🔮 Future Enhancements

- User authentication (organizers and DJs)
- Payment integration (booking deposits)
- Database integration (PostgreSQL/MongoDB)
- Real audio/video uploads (S3/Cloudinary)
- Booking management system
- DJ admin panel for profile updates
- Calendar integration for availability
- Reviews and ratings
- Email notifications
- Advanced filtering and search

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_WHATSAPP_BASE=971501234567
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Adding New DJs

Edit `src/data/djs.json` and add a new DJ object following the schema:

```json
{
  "id": "dj-009",
  "name": "DJ Name",
  "location": "Dubai Location",
  "genres": ["Genre1", "Genre2"],
  "vibeTags": ["Tag1", "Tag2"],
  "level": "NEW",
  "pricePerHour": 500,
  "bio": "DJ bio...",
  "mixUrls": ["/audio/mix1.mp3"],
  "crowdClipUrls": ["/video/clip1.mp4"],
  "mixScore": 80,
  "crowdScore": 0,
  "reliabilityScore": 0,
  "whatsappNumber": "971501234567"
}
```

## 📄 License

This is an MVP demo project. All rights reserved.

## 🤝 Support

For questions or issues, please contact the development team.

---

Built with ❤️ in Dubai | **Karak Finder** - Find Your Perfect DJ
