# MEGGA (Frontend)

## **Project Overview**
MEGGA (Monitoring Economic Goods & Government Advocacy) is designed to automate political advocacy by monitoring changes in common household goods and economic indicators as reported by the Bureau of Labor Statistics API. Users can create thresholds, and when these are triggered, emails are automatically sent to their specified political representatives. Users can also opt in to receive an email notification when a threshold is met, encouraging further advocacy efforts.

### **Proof of Concept & Security Considerations**
This project is a **proof of concept**, meaning that the full email automation system is not configured to send emails to actual government representatives. Due to security and spam concerns, all threshold-triggered emails are handled through Testmail.app rather than directly to representatives. This allows safe testing of the notification system without risk of abuse.

The MEGGA frontend is built with React and Vite, providing a user-friendly interface for authentication, data visualization, and threshold management. This application interacts with the MEGGA backend for user data and threshold updates, and it uses AWS Cognito for secure authentication.

---

## Key Features

- **Automated Political Advocacy**: Notify elected representatives when economic thresholds are triggered.
- **User Authentication**: Secure login and token management via AWS Cognito.
- **Threshold Management**: Create, edit, and delete thresholds tied to economic indicators.
- **Recipient Notifications**: Users can opt to be notified when their thresholds trigger an email.
- **Dark Mode Support**: Seamlessly toggle between light and dark themes.
- **Responsive Interface**: Designed for ease of use across devices.
- **Comprehensive API Integration**: Connects to backend for real-time data management.
- **Responsive Interface**: Intuitive and minimal design.

---

## **API Endpoints**
The MEGGA frontend interacts with the backend via the following endpoints:

### **User Endpoints**
- `GET /users` - Retrieve all users.
- `POST /users` - Create a new user.
- `GET /users/{email}` - Retrieve a user by email.

### **Data Endpoints**
- `GET /data` - Retrieve all available economic indicators.
- `GET /data/{id}` - Retrieve specific economic data.

### **Threshold Endpoints**
- `GET /users/{id}/thresholds` - Retrieve thresholds set by a specific user.
- `POST /thresholds` - Create a new threshold.
- `PUT /thresholds/{id}` - Update an existing threshold.
- `DELETE /thresholds/{id}` - Delete a threshold.

### **Notification & Recipients Endpoints**
- `GET /recipients` - Retrieve a list of recipients.
- `GET /thresholds/{id}/recipients` - Retrieve recipients for a specific threshold.

---

## **Project Structure**

```
megga-frontend/
├── src/
│   ├── components/                # Reusable UI components
│   │   ├── Button.jsx             # Custom button component
│   │   ├── Emoji.jsx              # Emoji helper for accessibility
│   │   ├── FormInput.jsx          # Input field component
│   │   ├── Message.jsx            # Displays error/success messages
│   │   ├── NavBar.css             # Styling for navigation bar
│   │   ├── NavBar.jsx             # Navigation bar component
│   │   ├── RecipientsModal.css    # Styling for recipients modal
│   │   ├── RecipientsModal.jsx    # Modal for viewing recipients
│   │   ├── ThresholdForm.css      # Styling for threshold form
│   │   ├── ThresholdForm.jsx      # Form for creating/editing thresholds
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAuthContext.js      # Manages authentication state
│   │   ├── useDashboardData.js    # Fetches and manages dashboard data
│   │   ├── useTheme.js            # Handles dark mode toggle
│   ├── pages/                     # Page components
│   │   ├── About.jsx              # About page
│   │   ├── Dashboard.css          # Styling for dashboard
│   │   ├── Dashboard.jsx          # Main dashboard page
│   │   ├── Login.jsx              # Login page
│   │   ├── NotFound.jsx           # 404 page
│   │   ├── RedirectHandler.jsx    # Handles authentication redirects
│   │   ├── SignOut.jsx            # Handles user sign-out
│   ├── routes/                    # Routing logic
│   │   ├── ProtectedRoute.jsx     # Protects routes for authenticated users
│   ├── services/                  # API and utility services
│   │   ├── api.js                 # Axios instance and API functions
│   ├── App.css                     # Global styling
│   ├── App.jsx                     # Main application logic
│   ├── index.css                   # Base styles for application
│   ├── main.jsx                     # Entry point for React
├── .env.example                    # Example environment configuration
├── .gitignore                       # Git ignore rules
├── LICENSE                          # Project license
├── README.md                        # Project documentation
├── eslint.config.js                  # ESLint configuration
├── index.html                        # Root HTML file
├── package-lock.json                  # Package lock file
├── package.json                      # Project dependencies and scripts
├── vite.config.js                     # Vite configuration file
```

---

## **Deployment**

This project is deployed using **AWS Amplify**.

### Steps to Deploy:
1. **Push Changes to GitHub**
```sh
git add .
git commit -m "Deploying latest changes"
git push origin main
```
2. **Go to AWS Amplify Console**
3. **Connect Your GitHub Repository**
4. **Configure Build Settings (Default React Preset is fine)**
5. **Deploy & Monitor Build Process**
6. **Once deployed, your app will be live at:** `https://your-app.amplifyapp.com`

---

## **Setup Instructions**

### **1. Prerequisites**

Ensure you have the following installed:
- **Node.js** (16.x or higher)
- **npm** (8.x or higher)
- **Git** (for version control)

---

### **2. Clone the Repository**

Run the following commands to clone the repository and navigate to the project directory:

```sh
git clone <repository-url>
cd megga-frontend
```

---

### **3. Configure Environment Variables**

Copy the provided `.env.example` file and configure your variables:

#### Variables expected in the `.env`:

- **Backend Configuration**:  
  - `VITE_API_BASE_URL=<backend_url>` (Base URL for the MEGGA backend API, e.g., `http://localhost:8080` or a production API URL)

- **Cognito Configuration**:  
  - `VITE_COGNITO_AUTHORITY=<cognito_authority_url>` (AWS Cognito Identity Provider URL, typically region-specific)
  - `VITE_COGNITO_DOMAIN=<cognito_auth_domain>` (AWS Cognito authentication domain)
  - `VITE_COGNITO_CLIENT_ID=<cognito_client_id>` (AWS Cognito application client ID)
  - `VITE_COGNITO_REDIRECT_URI=<frontend_redirect_url>` (Redirect URI for authentication flows)
  - `VITE_COGNITO_LOGOUT_URI=<frontend_logout_url>` (Redirect URI for logging out)
  - `VITE_COGNITO_IDP_URL=<cognito_idp_base_url>` (Base URL for AWS Cognito Identity Provider)
  - `VITE_COGNITO_TOKEN_URL=<cognito_token_url>` (Cognito OAuth2 token endpoint)

---

### **4. Install Dependencies**

Install the required dependencies:

```sh
npm install
```

---

### **5. Run the Development Server**

Start the local development server:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## **Deployment**

This project is deployed using **AWS Amplify**.

### Steps to Deploy:
1. **Push Changes to GitHub**
```sh
git add .
git commit -m "Deploying latest changes"
git push origin main
```
2. **Go to AWS Amplify Console**
3. **Connect Your GitHub Repository**
4. **Configure Build Settings (Default React Preset is fine)**
5. **Deploy & Monitor Build Process**
6. **Once deployed, your app will be live at:** `https://your-app.amplifyapp.com`

---

## **Contributing**

At this time, contributions are not being accepted. This is a capstone project shared for review and feedback.

---

## **License**

This project is licensed under the MIT License.