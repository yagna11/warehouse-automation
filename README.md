# Warehouse Automation
An application designed to automate various tasks in the warehouse process.

# Features
- Picking List: Allows users to generate a picking list based on previous day's orders.

- Packing List: Generates a packing list for the previous day's orders.

# Technology Stack
Backend: Node.js

Frontend: React.js

# Getting Started
## Prerequisites
Node.js & npm

## Setting Up the Backend
1. Navigate to the root directory of the project.
2. Install required dependencies using:
    `npm install`
3. Start the backend server:
    `node server/server.js`

## Setting Up the Frontend (Client)
1. Navigate to the client directory.
2. Install required dependencies using:
    `npm install`
3. Start the React development server:
    `npm start`

This should automatically open the React app in your default browser. If not, you can manually navigate to http://localhost:3001 or the next available port.

## Connecting Frontend with Backend
1. Ensure the backend server is running (default port is 3000). When the React development server is running, it will proxy requests to the backend 

## Development Notes
- For local development, the React app communicates with the backend using a proxy to avoid CORS issues.
- In a production environment, we might have to deploy the frontend and backend separately.

## Future Improvements 
- improve the UI
- Add test cases

