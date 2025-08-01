# YouTube Transcript Summarizer App

A full-stack application that fetches and displays YouTube video transcripts.

## Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The React app will run on `http://localhost:3000`

## Features

- Fetch YouTube video transcripts by URL
- Clean and responsive UI with Tailwind CSS
- Error handling for videos without captions
- Real-time loading states

## API Endpoints

- `GET /api/transcript/:videoId` - Fetch transcript for a YouTube video

## Troubleshooting

### Common Issues

1. **Port already in use**: Make sure ports 3000 and 5000 are available
2. **CORS errors**: The server includes CORS middleware to handle cross-origin requests
3. **Transcript not available**: Some videos may not have captions available
4. **Invalid YouTube URL**: Make sure the URL is a valid YouTube video URL

### Dependencies Fixed

- React downgraded from 19.1.1 to 18.2.0 for compatibility with react-scripts 5.0.1
- Testing library versions updated for compatibility
- Added Tailwind CSS for styling
- Added proper start scripts for both client and server

## Technologies Used

- **Frontend**: React 18, React Router, Axios, Tailwind CSS
- **Backend**: Express.js, youtube-transcript library, CORS
- **Development**: Create React App, Node.js 