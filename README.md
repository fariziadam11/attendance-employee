# Project Attendance System

A modern, React-based attendance management system with real-time tracking capabilities and intuitive user interface. This system helps organizations efficiently manage attendance records, generate reports, and analyze attendance patterns.

## Features

- User authentication with role-based access control
- Real-time attendance tracking with QR code support
- Interactive dashboard with attendance analytics and charts
- Customizable attendance reports with export options (PDF, CSV)
- Employee/Student management system
- Email notifications for attendance updates
- Mobile-responsive design

## Tech Stack

- Frontend: React.js, Material-UI
- State Management: Redux Toolkit
- Database: MySQL
- Authentication: JWT
- API: RESTful architecture
- Charts: Recharts
- Testing: Jest & React Testing Library

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project-attendance
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

## Environment Setup

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_VERSION=1.0.0
```

## Available Scripts

```bash
npm start      # Start development server
npm test      # Run test suite
npm run build # Create production build
npm run lint  # Run ESLint
```

## Project Structure

```
project-attendance/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Route components
│   ├── contexts/       # React contexts
│   ├── services/       # API services
│   ├── store/         # Redux store
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Helper functions
│   └── types/         # TypeScript definitions
├── public/
├── tests/
└── package.json
```

## API Documentation

API endpoints are available at:
- POST `/api/auth/login` - User authentication
- GET `/api/attendance` - Fetch attendance records
- POST `/api/attendance` - Record new attendance

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Deployment

1. Build the production bundle:
```bash
npm run build
```

2. Deploy to your hosting service:
```bash
npm run deploy
```

## Support

For support, email: support@example.com

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React.js team
- Material-UI
- All contributors
