// First, import the necessary modules and libraries:
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import Toast,  { POSITION }  from 'vue-toastification';
import store from './store/index'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'admin-lte/dist/css/adminlte.min.css';
import 'admin-lte/dist/js/adminlte.min.js';
import 'vue-toastification/dist/index.css';
// Set up axios globally:
window.axios = axios;
// Configure the default headers for axios:
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// Define the base URL for all axios requests:
axios.defaults.baseURL = 'http://localhost:8000/api';
// If there's a token in the localStorage, set it as the default Authorization header:
if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}
window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
};
// Handle token expiration or invalid tokens:
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Remove the token from local storage:
            localStorage.removeItem('token');
            // Reset the axios Authorization header:
            axios.defaults.headers.common['Authorization'] = 'Bearer';
            // Redirect the user to the login page:
            router.push({ name: 'Login' });
        }
        return Promise.reject(error);
    }
);
const options = {
    // You can customize the position of the toast (top-right, top-left, etc.)
    position: POSITION.TOP_RIGHT,    
    // Time in milliseconds before the toast disappears (default is 5000)
    timeout: 3000,    
    // Enable or disable close button
    closeButton: true,    
    // Hide the progress bar
    hideProgressBar: false,    
    // Allow dismissing toast by clicking on it
    closeOnClick: true,    
    // Automatically dismiss toast on hover
    pauseOnHover: true,    
    // Other available options...
  };
  
// Create and mount the Vue app:
const app = createApp(App);
app.use(store);
app.use(router);
app.use(Toast, options);
app.mount('#app');