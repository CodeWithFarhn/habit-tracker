# Habit Tracker

A full-stack habit tracking application built with React and modern web technologies.

## Project Structure

```
habit-tracker/
├── frontend/          # React + Vite frontend
├── .env.example       # Environment variables template
└── README.md          # This file
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd habit-tracker
```

2. Install dependencies
```bash
cd frontend
npm install
```

3. Create environment file
```bash
cp .env.example .env.local
```

4. Start development server
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Bootstrap 5, CSS
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Linting**: ESLint

## Development

The frontend is located in the `frontend/` directory and uses Vite for fast development and building.

## License

MIT
