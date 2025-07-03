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
import Checkout from '../views/user/Checkout.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import NotFound from '../views/public/NotFound.vue'
import { useAuth } from '@/composables/useAuth'

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
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      meta: {
        requiresAuth: true,
        allowedRoles: ['customer','admin']
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: {
        requiresAuth: true,
        allowedRoles: ['customer','admin']
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true,
        allowedRoles: ['customer']
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
    },
    // 404 Not Found route - must be last
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    }
  ],
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Get fresh values inside the guard
  const { isAuthenticated, isAdmin } = useAuth()
  const authenticated = isAuthenticated.value
  const userIsAdmin = isAdmin.value

  // Handle guest-only routes (login, register, etc.)
  if (to.meta.requiresGuest && authenticated) {
    if (userIsAdmin) {
      next({ name: 'admin-dashboard' })
    } else {
      next({ name: 'profile' })
    }
    return
  }

  // Handle routes that require authentication
  if (to.meta.requiresAuth && !authenticated) {
    next({ name: 'login' })
    return
  }

  // Handle role-based access
  if (to.meta.requiresAuth && authenticated && to.meta.allowedRoles) {
    const userRole = userIsAdmin ? 'admin' : 'customer'

    if (!to.meta.allowedRoles.includes(userRole)) {
      // Redirect to appropriate dashboard based on role
      if (userIsAdmin) {
        next({ name: 'admin-dashboard' })
      } else {
        next({ name: 'profile' })
      }
      return
    }
  }

  // Allow navigation
  next()
})

export default router
