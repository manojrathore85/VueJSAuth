import store from '../store';
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue')
    },
    { path: '/login', 
      name: 'Login', 
      component: () => import('../views/Login.vue'), 
      
    },
    { path: '/dashboard', 
      name: 'Dashboard', 
      component: () => import('../views/Dashboard.vue'), 
      meta: { requiresAuth: true } 
    },


  ]
})

router.beforeEach((to, from, next)=>{
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.getters.isAuthenticated;
  //console.log(isAuthenticated);
  if(requiresAuth && !isAuthenticated){// manage if route required authenticated but user not authenticated redirect to home.
    next({name:'home'})
  }else if(isAuthenticated && (to.name == 'Register' || to.name == 'Login')){ // to manage that if user is authenticated can not visit register and login  
    next({name:'Dashboard'})
  }else {
    next();
  }
});

export default router
