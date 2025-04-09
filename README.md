# Earthquake Visualization Tool

An interactive visualization tool for exploring earthquake data. Built with React, TypeScript, and Chart.js.

## Features

- Interactive scatter plot visualization of earthquake data
- Dynamic axis selection for different data variables (magnitude, depth, latitude, longitude)
- Data table with virtualization for efficient rendering of large datasets
- Real-time selection and hover interactions between chart and table
- Responsive design that works across different screen sizes

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd earthquake-viz
```

2. Install dependencies:
```bash
npm install
```

## Running the Project

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:5173`

## Building for Production

1. Create a production build:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## Project Structure

```
earthquake-viz/
├── src/
│   ├── components/     # React components
│   │   ├── chart/     # Chart-related components
│   │   └── ...
│   ├── hooks/         # Custom React hooks
│   ├── store/         # State management (Zustand)
│   ├── context/       # React context
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── ...
```

## Technologies Used

- React 18
- TypeScript
- Vite
- Chart.js & react-chartjs-2
- Zustand (State Management)
- TailwindCSS (Styling)
- React Window (Virtualization)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Style

This project uses ESLint and TypeScript for code quality. Run the linter before committing:
```bash
npm run lint
```

## External Libraries

### Core Libraries
1. **React (v19.0.0)**
   - Core framework for building the user interface
   - Provides component-based architecture
   - Hooks for state and lifecycle management

2. **TypeScript**
   - Static typing for JavaScript
   - Enhanced IDE support and code reliability
   - Type definitions for all components and data structures

### Data Visualization
1. **Chart.js (v4.4.8) & react-chartjs-2 (v5.3.0)**
   - Interactive scatter plot visualization
   - Built-in support for tooltips and animations
   - Responsive chart rendering
   - React wrapper for seamless integration


### State Management
1. **Zustand (v5.0.3)**
   - Lightweight state management
   - Simple API with hooks
   - TypeScript support
   - Used for global earthquake data and selection state

### Data Fetching
1. **Axios (v1.8.4)**
   - HTTP client for API requests
   - Promise-based API
   - Request/response interceptors
   - Used for fetching earthquake data

### Styling
1. **TailwindCSS (v4.1.3)**
   - Utility-first CSS framework
   - Responsive design utilities
   - Custom component styling
   - Zero-runtime styles

### Development Tools
1. **Vite (v6.2.0)**
   - Fast development server
   - Efficient build tooling
   - Hot Module Replacement (HMR)
   - TypeScript support

2. **ESLint (v9.21.0)**
   - Code linting
   - Style enforcement
   - TypeScript-aware linting rules