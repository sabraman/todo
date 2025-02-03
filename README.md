# Todo

A simple todo web application written in **React + TypeScript**. Try it out now at <http://todo.sabraman.ru/>

![screenshot](https://github.com/sabraman/todo/blob/main/screenshot.png?raw=true)

## Features

- Create, read, update, and delete todo tasks
- Filter tasks by status (All, Active, Completed)
- Persistent storage using local storage
- Modern and responsive user interface
- TypeScript for enhanced type safety

## Tech Stack

- React 17
- TypeScript
- Vite
- CSS Modules
- FontAwesome icons

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository
```bash
git clone https://github.com/sabraman/todo.git
cd todo
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Building for Production

To create a production build:

```bash
pnpm build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── api/          # API and storage related functionality
├── components/   # React components
├── models/       # TypeScript interfaces and types
├── store/        # State management
└── App.tsx       # Root component
```

## License

This project is open source and available under the MIT License.
