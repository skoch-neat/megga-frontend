# MEGGA (Frontend)

## **Project Overview**
MEGGA (**Monitoring Economic Goods & Government Advocacy**) is designed to automate political advocacy by monitoring changes in common household goods and economic indicators as reported by the **Bureau of Labor Statistics API**. Users can create **thresholds**, and when these are triggered, emails are **automatically sent** to their specified political representatives. Users can also **opt in** to receive a notification when a threshold is met, encouraging **further advocacy efforts**.

### **Proof of Concept & Security Considerations**
This project is a **proof of concept**, meaning that the full email automation system is not configured to send emails to actual government representatives.

The MEGGA frontend is built with **React and Vite**, providing a user-friendly interface for **authentication, data visualization, and threshold management**. This application interacts with the **MEGGA backend** for user data and threshold updates and uses **AWS Cognito** for secure authentication.

---

## **Key Features**
- **Automated Political Advocacy** - Notify elected representatives when economic thresholds are triggered.
- **User Authentication** - Secure login and token management via AWS Cognito.
- **Threshold Management** - Create, edit, and delete thresholds tied to economic indicators.
- **Data Tracking & Visualization** - Fetches and displays real-time economic indicator updates.
- **Recipient Notifications** - Users can opt to be notified when their thresholds trigger an email.
- **Dark Mode Support** - Seamlessly toggle between light and dark themes.
- **RESTful API Communication** - Interacts with backend services for data persistence.
- **Responsive Interface** - Designed for ease of use across devices.
- **CORS Support** - Configured to allow cross-origin communication with backend services.
- **Environment Configurations** - Uses `.env` files for easy project setup.
- **AWS Amplify Deployment** - Hosted and automatically deployed via **AWS Amplify**.

---

## **Project Structure**

```
megga-frontend/
├── src/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Emoji.jsx
│   │   ├── FormInput.jsx
│   │   ├── Message.jsx
│   │   ├── NavBar.css
│   │   ├── NavBar.jsx
│   │   ├── RecipientsModal.css
│   │   ├── RecipientsModal.jsx
│   │   ├── ThresholdForm.css
│   │   ├── ThresholdForm.jsx
│   ├── hooks/
│   │   ├── useAuthContext.js
│   │   ├── useDashboardData.js
│   │   ├── useTheme.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Dashboard.css
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── RedirectHandler.jsx
│   │   ├── SignOut.jsx
│   ├── routes/
│   │   ├── ProtectedRoute.jsx
│   ├── services/
│   │   ├── api.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .env.example
├── .gitignore
├── LICENSE
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
```

---

## **Setup Instructions**

### **1. Prerequisites**
Ensure you have the following installed:
- **Node.js** (16.x or higher)
- **npm** (8.x or higher)
- **Git** (for version control)

---

### **2. Clone the Repository**

- On GitHub, navigate to the main page of the repository. Above the list of files, click `<> Code`.
- Copy the URL for the repository.
- Open your terminal and change to the location where you want the cloned directory.
- Run the following commands to clone the repository and navigate to the project directory:

```sh
git clone <repository-url>
cd megga-frontend
```

- Press Enter to create your local clone.

---

### **3. Install Dependencies**

Install the required dependencies for the project:

```sh
npm install
```

---

### **4. Configure Environment Variables**

Copy the provided `.env.example` file and configure your variables:

#### Variables expected in the `.env`:

  - `VITE_API_BASE_URL=<backend_url>` (Base URL for the MEGGA backend API, e.g., `http://localhost:8080` or a production API URL)
  - `VITE_COGNITO_AUTHORITY=<cognito_authority_url>` (AWS Cognito Identity Provider URL, typically region-specific)
  - `VITE_COGNITO_CLIENT_ID=<cognito_client_id>` (AWS Cognito application client ID)
  - `VITE_COGNITO_DOMAIN=<cognito_auth_domain>` (AWS Cognito authentication domain)
  - `VITE_COGNITO_IDP_URL=<cognito_idp_base_url>` (Base URL for AWS Cognito Identity Provider)
  - `VITE_COGNITO_LOGOUT_URI=<frontend_logout_url>` (Redirect URI for logging out)
  - `VITE_COGNITO_REDIRECT_URI=<frontend_redirect_url>` (Redirect URI for authentication flows)
  - `VITE_COGNITO_TOKEN_URL=<cognito_token_url>` (Cognito OAuth2 token endpoint)


---

### **5. Run the Server**

To run in development mode, type:
```sh
npm run dev
```
For production usage, type:
```sh
npm run build
```
Typically the application will be available at `http://localhost:5173`, but the exact URL will be displayed after the command executes successfully.

---

## **API Endpoints**

The MEGGA frontend interacts with the backend via the following endpoints:

### User Routes
- `POST /users` - Create a new user.
- `GET /users/{email}` - Retrieve user by email.

### Threshold Routes
- `GET /users/{id}/thresholds` - Retrieve all thresholds for a user.
- `POST /thresholds` - Create a new threshold.
- `PUT /thresholds/{id}` - Update an existing threshold.
- `DELETE /thresholds/{id}` - Remove a threshold.

### Data Routes
- `GET /data` - Retrieve all available economic indicators.

### Recipient Routes
- `GET /recipients` - Retrieve a list of recipients.

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