import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/public/Home.vue'
import Category from '../views/public/Category.vue'
import About from '../views/public/About.vue'
import Contact from '../views/public/Contact.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import Cart from '../views/user/Cart.vue'
import Profile from '../views/user/Profile.vue'
import Dashboard from '../views/admin/Dashboard.vue'

// Authentication helper functions
const isAuthenticated = () => {
  const user = localStorage.getItem('user')
  return !!user
}

const getUserRole = () => {
  const user = localStorage.getItem('user')
  if (user) {
    try {
      const userData = JSON.parse(user)
      return userData.role
    } catch (error) {
      console.error('Error parsing user data:', error)
      return null
    }
  }
  return null
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true // Redirect if already logged in
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true // Redirect if already logged in
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: {
        requiresGuest: true // Redirect if already logged in
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: {
        requiresAuth: true,
        allowedRoles: ['customer', 'admin']
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true,
        allowedRoles: ['customer', 'admin']
      }
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        allowedRoles: ['admin']
      }
    }
  ],
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authenticated = isAuthenticated()
  const userRole = getUserRole()

  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (!authenticated) {
      // Redirect to home if not authenticated
      next({ name: 'home' })
      return
    }

    // Check role-based access
    if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(userRole)) {
      // Redirect based on user role
      if (userRole === 'admin') {
        next({ name: 'admin-dashboard' })
      } else {
        next({ name: 'profile' })
      }
      return
    }
  }

  // Check if route requires guest (not logged in)
  if (to.meta.requiresGuest && authenticated) {
    // Redirect logged-in users away from auth pages
    if (userRole === 'admin') {
      next({ name: 'admin-dashboard' })
    } else {
      next({ name: 'profile' })
    }
    return
  }

  next()
})

export default router
