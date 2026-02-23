# Plants & Diseases Management System

A comprehensive Next.js application for managing and documenting plant diseases. This system provides a public content portal for browsing plants and diseases, along with an admin dashboard for content management with rich text editing capabilities.

## Features

### Public Content Portal
- **Plant Directory**: Browse and search through a catalog of plants
- **Disease Information**: Detailed disease documentation with rich content blocks
- **Responsive Design**: Optimized for desktop and mobile viewing
- **QR Code Sharing**: Share disease documentation via QR codes

### Admin Dashboard
- **Plant Management**: Add, edit, and delete plants with images
- **Disease Management**: Create and manage disease entries linked to specific plants
- **Rich Text Editor**: Built with Editor.js supporting:
  - Headers (6 levels)
  - Paragraphs
  - Images with captions
  - Lists (ordered, unordered, checklists)
  - Tables
  - Delimiters
- **Statistics Overview**: Real-time counts of plants and diseases
- **Authentication**: Secure Firebase authentication for admin access

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **UI Library**: [Material-UI (MUI) v7](https://mui.com/)
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **State Management**: [TanStack Query v5](https://tanstack.com/query/latest)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup)
- **Rich Text Editor**: [Editor.js](https://editorjs.io/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm, yarn, pnpm, or bun package manager
- Firebase project with Firestore and Authentication enabled

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ahmniab/planets-diseases.git
cd planets-diseases
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
# Firebase Client Configuration (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Firebase Admin Configuration (Server-side)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="your_private_key"
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
planets-diseases/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── plants/               # Plant CRUD operations
│   │   ├── diseases/             # Disease CRUD operations
│   │   └── disease-docs/         # Disease documentation endpoints
│   ├── content/                  # Public content pages
│   │   ├── plants/               # Plant listing and details
│   │   └── diseases/             # Disease details
│   ├── dashboard/                # Admin dashboard
│   │   ├── plants/               # Plant management
│   │   └── diseases/             # Disease management
│   ├── login/                    # Login page
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── dashboard/                # Dashboard-specific components
│   ├── diseaseDoc/               # Disease documentation renderers
│   ├── shared/                   # Reusable components
│   ├── DiseasesGrid/             # Disease grid view
│   ├── PlantsGrid/               # Plant grid view
│   ├── Header/                   # Navigation header
│   └── Home/                     # Landing page components
├── lib/                          # Core libraries
│   ├── firebase/                 # Client-side Firebase config
│   ├── firebaseAdmin/            # Server-side Firebase Admin
│   └── network/                  # API client and services
├── hooks/                        # Custom React hooks
├── contexts/                     # React contexts (Auth, Query)
├── types/                        # TypeScript type definitions
├── theme/                        # MUI theme configuration
└── utils/                        # Utility functions
```

## API Routes

### Plants API
- `GET /api/plants` - List all plants
- `POST /api/plants/add` - Create a new plant (auth required)
- `GET /api/plants/[id]` - Get plant details
- `PUT /api/plants/[id]` - Update plant (auth required)
- `DELETE /api/plants/[id]` - Delete plant (auth required)
- `GET /api/plants/[id]/diseases` - Get diseases for a plant

### Diseases API
- `POST /api/diseases` - Create a new disease (auth required)
- `GET /api/diseases/[id]` - Get disease details
- `PUT /api/diseases/[id]` - Update disease (auth required)
- `DELETE /api/diseases/[id]` - Delete disease (auth required)
- `GET /api/diseases/[id]/doc` - Get disease documentation


## Key Features Explained

### Disease Documentation System

The disease documentation system uses Editor.js to provide a flexible content structure. Each disease document consists of blocks that can be:

- **Headers**: 6 heading levels for structuring content
- **Paragraphs**: Rich text content
- **Images**: With optional captions and styling
- **Lists**: Ordered, unordered, and interactive checklists
- **Tables**: Structured data presentation
- **Delimiters**: Visual separators

### Authentication Flow

1. Admin users navigate to `/login`
2. Credentials are verified via Firebase Authentication
3. Session is managed with HTTP-only cookies
4. Protected API routes verify authentication server-side
5. Dashboard access is guarded by `AuthGuard` component

### Data Flow

1. **Server-Side Rendering**: Public pages fetch data server-side for SEO
2. **Client-Side State**: Dashboard uses TanStack Query for caching and mutations
3. **Optimistic Updates**: UI updates immediately with rollback on error
4. **Type Safety**: Full TypeScript coverage across client and server

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Style

- TypeScript strict mode enabled
- Component-based architecture
- Custom hooks for reusable logic
- Centralized API client with interceptors
- Type-safe API responses



## Environment Setup

### Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password provider)
3. Create a Firestore database with collections:
   - `plants` - Store plant data
   - `diseases` - Store disease summaries
   - `disease_docs` - Store disease documentation
4. Generate service account credentials for admin operations
5. Add security rules to protect write operations

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is private and proprietary.

## Support

For issues and questions, please open an issue in the repository or contact the development team.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Material-UI](https://mui.com/)
- Rich text editing powered by [Editor.js](https://editorjs.io/)
- Backend services by [Firebase](https://firebase.google.com/)
