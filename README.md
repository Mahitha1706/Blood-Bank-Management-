# Blood Bank Management System

A full-stack web application for managing blood bank operations, built with React, Node.js, Express, and MongoDB.

## Features

- Admin authentication
- CRUD operations for donors, patients, and hospitals
- Modern, responsive UI
- RESTful API backend

## Tech Stack

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Styling:** CSS

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the backend directory with:
   ```
   MONGO_URI=mongodb://localhost:27017/bloodbank
   PORT=5000
   ```
4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React development server:
   ```
   npm start
   ```

### Database Setup
1. Ensure MongoDB is running locally on port 27017, or update the MONGO_URI in `.env` for a different connection.
2. The application will automatically create collections when data is added.

## Usage

1. Start both backend and frontend servers.
2. Open your browser to `http://localhost:3000`.
3. Login with admin credentials:
   - Email: admin@bloodbank.com
   - Password: admin123
4. Use the dashboard to manage donors, patients, and hospitals.

## API Endpoints

### Authentication
- POST `/api/auth/login` - Admin login

### Donors
- GET `/api/donors` - Get all donors
- POST `/api/donors` - Create donor
- PUT `/api/donors/:id` - Update donor
- DELETE `/api/donors/:id` - Delete donor

### Patients
- GET `/api/patients` - Get all patients
- POST `/api/patients` - Create patient
- PUT `/api/patients/:id` - Update patient
- DELETE `/api/patients/:id` - Delete patient

### Hospitals
- GET `/api/hospitals` - Get all hospitals
- POST `/api/hospitals` - Create hospital
- PUT `/api/hospitals/:id` - Update hospital
- DELETE `/api/hospitals/:id` - Delete hospital

## Testing with Postman

You can test the API endpoints using Postman:

1. Set the request method and URL.
2. For POST/PUT requests, set the body to raw JSON.
3. Example login request:
   - Method: POST
   - URL: http://localhost:5000/api/auth/login
   - Body: {"email": "admin@bloodbank.com", "password": "admin123"}

## Project Structure

```
bloodbank/
├── backend/
│   ├── models/
│   │   ├── Donor.js
│   │   ├── Patient.js
│   │   └── Hospital.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── donors.js
│   │   ├── patients.js
│   │   └── hospitals.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Donors.js
│   │   │   ├── Patients.js
│   │   │   └── Hospitals.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── README.md
└── TODO.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
