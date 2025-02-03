import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

API.interceptors.request.use(config => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No auth token found. Requests may fail with 401 Unauthorized.");
    }
    return config;
}, error => Promise.reject(error));

/** User Endpoints */
export const fetchUsers = () => API.get('/users');
export const fetchUserByEmail = (email) => API.get(`/users/email/${email}`);
export const createUser = (userData) => API.post('/users', userData);

/** Data Endpoints */
export const fetchData = () => API.get('/data');
export const fetchDataById = (id) => API.get(`/data/${id}`);
export const createData = (data) => API.post('/data', data);
export const updateData = (id, data) => API.put(`/data/${id}`, data);
export const deleteData = (id) => API.delete(`/data/${id}`);

/** Threshold Endpoints */
export const fetchThresholds = () => API.get('/thresholds');
export const fetchThresholdById = (userId) => API.get(`/thresholds/${userId}`);
export const createThreshold = (thresholdData) => API.post('/thresholds', thresholdData);
export const updateThreshold = (id, thresholdData) => API.put(`/thresholds/${id}`, thresholdData);
export const deleteThreshold = (id) => API.delete(`/thresholds/${id}`);

/** Notification Endpoints */
export const fetchNotifications = () => API.get('/notifications');
export const fetchNotificationById = (id) => API.get(`/notifications/${id}`);
export const createNotification = (notificationData) => API.post('/notifications', notificationData);
export const updateNotification = (id, notificationData) => API.put(`/notifications/${id}`, notificationData);
export const deleteNotification = (id) => API.delete(`/notifications/${id}`);

/** Recipient Endpoints */
export const fetchRecipients = () => API.get('/recipients');
export const fetchRecipientById = (id) => API.get(`/recipients/${id}`);
export const createRecipient = (recipientData) => API.post('/recipients', recipientData);
export const updateRecipient = (id, recipientData) => API.put(`/recipients/${id}`, recipientData);
export const deleteRecipient = (id) => API.delete(`/recipients/${id}`);

/** Threshold Recipient Endpoints */
export const fetchThresholdRecipients = () => API.get('/threshold_recipients');
export const fetchThresholdRecipientById = (thresholdId, recipientId) => API.get(`/threshold_recipients/${thresholdId}/${recipientId}`);
export const createThresholdRecipient = (thresholdRecipientData) => API.post('/threshold_recipients', thresholdRecipientData);
export const updateThresholdRecipient = (thresholdId, recipientId, thresholdRecipientData) => API.put(`/threshold_recipients/${thresholdId}/${recipientId}`, thresholdRecipientData);
export const deleteThresholdRecipient = (thresholdId, recipientId) => API.delete(`/threshold_recipients/${thresholdId}/${recipientId}`);

export default API;
