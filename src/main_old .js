import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'admin-lte/dist/css/adminlte.min.css';
import 'admin-lte/dist/js/adminlte.min.js';
import 'vue-toastification/dist/index.css';



const app = createApp(App)
// Configure toast options (optional)
const options = {
    position: "top-right",
    timeout: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    // Add more options as needed
  };
app.use(Toast, options);  
app.use(router)

app.mount('#app')
