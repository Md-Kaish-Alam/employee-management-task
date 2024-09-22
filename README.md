# EmpowerHUB - Employee Management System

Welcome to **EmpowerHUB**, a comprehensive Employee Management System designed to streamline employee records, enhance communication, and boost organizational efficiency.

### Live Demo: [https://empowerhub-weld.vercel.app/](https://empowerhub-weld.vercel.app/)

![Screenshot 2024-09-22 194412](https://github.com/user-attachments/assets/da526e9b-c514-480c-a911-5efba7f5a3af)

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- **CRUD Operations**: Create, Read, Update, Delete employee records.
- **Authentication**: Protect API endpoints with authentication middleware.
- **Excel Export**: Download employee details in Excel format with a single click.
- **Form Handling**: Reusable employee form components for adding and updating records.
- **Login Tracking**: Track daily login times for both desktop and mobile platforms.
- **Responsive UI**: Built with modern frontend frameworks for a seamless experience across devices.

## Technologies Used
- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Export**: ExcelJS for file export
- **Database**: MongoDB for employee records and login tracking
- **Others**: Docker, Kubernetes for containerization and deployment

## Installation
To get a local copy up and running, follow these simple steps:

### Prerequisites
- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **MongoDB**: [Download and install MongoDB](https://www.mongodb.com/)

### Clone the repository
```bash
git clone https://github.com/Md-Kaish-Alam/employee-management-task.git
cd employee-management-task
```

### Install dependencies Backend
```bash
cd backend
npm install
```

### Install dependencies Frontend
```bash
cd frontend
npm install
```

### Set up environment variables
Create a .env file in the root directory of backend folder and provide the following values:
```bash
PORT=5000
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>

# Cloudinary 
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
CLOUDINARY_URL=<your_cloudinary_url>
```

Create a .env file in the root directory of frontend folder and provide the following values:
```bash
VITE_BACKEND_BASE_URL=http://localhost:5000/api/v1 || <your_backend_base_url>
```

### Run the application
Terminal frontend directory path 
```bash
npm run dev
```

Terminal backend directory path 
```bash
npm run dev
```

## Usage
- **Add Employees**: Use the provided form to add employee details including name, email, mobile number, designation, gender, etc.
- **Update/Delete Employees**: Modify existing records or remove employees from the system.
- **Export Employee Data**: Click a button to download employee details as an Excel file.
- **Track Logins**: Log daily employee login times for desktop and mobile devices.

## API Endpoints

### Public Routes
- POST `/api/auth/login`: Authenticate a user and receive a token.
- POST `/api/auth/register`: Register a new user.

### Protected Routes (require authentication)
- `GET /api/employees`: Get all employee records.
- `POST /api/employees`: Add a new employee.
- `GET /api/employees/:id`: Get details of a specific employee.
- `PUT /api/employees/:id`: Update employee details.
- `DELETE /api/employees/:id`: Delete an employee.

## Screenshots
### Register View:
![Screenshot 2024-09-22 194221](https://github.com/user-attachments/assets/bde5e35d-074c-431e-ab35-497baded8c4c)

### Login Page View:
![Screenshot 2024-09-22 194241](https://github.com/user-attachments/assets/c7093953-d1f3-4f88-bc0b-cad75ff6bf86)

### Dashboard View:
![Screenshot 2024-09-22 194308](https://github.com/user-attachments/assets/0c9db061-2c44-41a7-95ab-83f4eb2fb8cf)

![Screenshot 2024-09-22 194323](https://github.com/user-attachments/assets/6fc3772c-c33b-4797-aa11-d1de5e33448a)

### Employee List View:
![Screenshot 2024-09-22 194412](https://github.com/user-attachments/assets/03259492-e839-45b9-94e0-19c08f409686)

### Add Employee Form:
![Screenshot 2024-09-22 194429](https://github.com/user-attachments/assets/4360f98f-4c6a-474d-80c0-67b04bf46d9b)

### Update Employee Form:
![Screenshot 2024-09-22 194450](https://github.com/user-attachments/assets/9d6dcda6-a3be-4a97-a87f-b86296dae5bc)

### Delete Employee Dialog:
![Screenshot 2024-09-22 194510](https://github.com/user-attachments/assets/5f378a0e-cf0a-4ddd-9013-5fa4a94c9826)

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any improvements or bug fixes.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/your-feature`)
3. Commit your Changes (`git commit -m 'Add some feature'`)
4. Push to the Branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

