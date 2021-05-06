import { createRouter, createWebHashHistory } from 'vue-router'
import axios from 'axios'

import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'

function adminAuth(to, from, next) {
  const bearerToken = localStorage.getItem('token');

  if (bearerToken != undefined) {
    axios({
      headers: {
        Authorization: `Bearer ${bearerToken}`
      },
      url: "http://localhost:5001/validate",
      method: "post",
    }).then(() => {
      next();
    }).catch(() => {
      next('/login');
    });
  } else {
    next('/login');
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    beforeEnter: adminAuth
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
