# SACCMCT '25 - Sir Arthur C. Clarke Memorial Challenge Trophy 2025

This is the official website for the Sir Arthur C. Clarke Memorial Challenge Trophy 2025, organized by the Anandian Astronomical Association.

## Features

- Event countdown timer
- Team registration and leaderboards
- Photo album integration
- Rules and regulations
- Event agenda
- Responsive design with modern UI

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd saccmct-25
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

### Deployment

This project is configured for deployment on various platforms:

#### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch

#### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`

#### Static Export
```bash
npm run export
```

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # Reusable components
│   ├── ui/             # UI components
│   └── component/      # Feature components
└── lib/                # Utility functions

public/                 # Static assets
```

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI
- Lucide React

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.