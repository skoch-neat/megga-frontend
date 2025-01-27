# MEGGA Frontend

The MEGGA frontend is built with React and Vite, providing a user-friendly interface for authentication, data visualization, and threshold management. This application interacts with the MEGGA backend for user data and threshold updates, and it uses AWS Cognito for secure authentication.

---

## Key Features

- **User Authentication**: Login and token management via AWS Cognito.
- **User Management**: Save user profiles to the backend and fetch user data.
- **Threshold Management**: Communicates with the MEGGA backend for CRUD operations.
- **Responsive Interface**: Intuitive and minimal design.
- **Environment Configurations**: Customizable via `.env` files.

---

## **Project Structure**

megga-frontend/  
- public/  
  - vite.svg (Default Vite logo)  
- src/  
  - services/  
    - api.js (Axios instance and API functions)  
  - App.jsx (Main application logic)  
  - main.jsx (Entry point for React)  
  - index.html (Root HTML file)  
- .env (Environment variable configuration)  
- package.json (Dependencies and scripts)  
- vite.config.js (Vite configuration)  
- README.md (Documentation)

---

## **Setup Instructions**

### **1. Prerequisites**

Ensure you have the following installed:  
- Node.js (16.x or higher)  
- npm (8.x or higher)

---

### **2. Clone the Repository**

Run the following commands to clone the repository and navigate to the project directory:

    git clone <repository-url>
    cd megga-frontend

---

### **3. Configure Environment Variables**

Copy the provided `.env.example` file and configure your variables:

#### Variables expected in the `.env`:

- **Backend Configuration**:  
  - `VITE_API_BASE_URL=<backend_url>` (e.g., `http://localhost:8080` for local development or `https://api.yourdomain.com` for production)

- **Cognito Configuration**:  
  - `VITE_COGNITO_AUTHORITY=https://<your_cognito_authority>`  
  - `VITE_COGNITO_DOMAIN=https://<your_cognito_domain>`  
  - `VITE_COGNITO_CLIENT_ID=<your_cognito_client_id>`  
  - `VITE_COGNITO_REDIRECT_URI=<frontend_url>` (e.g., `http://localhost:5173`)  
  - `VITE_COGNITO_LOGOUT_URI=<frontend_url>` (e.g., `http://localhost:5173`)  
  - `VITE_COGNITO_IDP_URL=https://<your_cognito_idp_url>`  
  - `VITE_COGNITO_TOKEN_URL=https://<your_cognito_token_url>`

**Tip**: The `.env.example` file contains placeholders for all required variables. Copy it to `.env` and replace placeholders with your actual configuration values.

---

### **4. Install Dependencies**

Install the required dependencies for the project:

    npm install

---

### **5. Start the Development Server**

Start the local development server:

    npm run dev

The application will be available at `http://localhost:5173`.

---

## **Security**

### **Environment Variables**

Keep your `.env` file secure and do not commit it to version control. Use `.env.example` as a template for collaborators.

---

## **API Endpoints**

The frontend communicates with the MEGGA backend to access the following endpoints:

### **User Routes**

- `GET /api/users`: Retrieve a list of all users.  
- `POST /api/users`: Create a new user.

---

## **Deployment**

### **1. Build for Production**

Run the following command to build the application for production:

    npm run build

This will generate the production-ready files in the `dist/` directory.

### **2. Serve the Application**

Serve the `dist/` directory using a static file server or hosting platform.

---

## **Contributing**

At this time, contributions are not being accepted. This project is intended for educational purposes and is shared for review and feedback.

---

## **License**

This project is licensed under the MIT License.