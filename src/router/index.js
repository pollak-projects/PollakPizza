import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/index.vue'
import Login from '@/pages/Login.vue'
import Menu from '@/pages/Menu.vue'
import Order from '@/pages/Order.vue'
import Profile from '@/pages/Profile.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import ResetPasswordPage from '@/pages/ResetPassword.vue'
import AdminPage from '@/components/AdminPage.vue'
import OrdersPage from '@/components/OrdersPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu,
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: ResetPasswordPage,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    meta: { requiresAdmin: true }, // Admin jogosultság szükséges
  },
  {
    path: '/orders',
    name: 'Orders',
    component: OrdersPage,
    meta: { requiresAdmin: true }, // Admin jogosultság szükséges
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath); // Újratöltés
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err);
    }
  } else {
    console.error(err);
  }
});

// Navigation guard to check for authentication and admin rights
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token; // Autentikáció ellenőrzése
  let isAdmin = false;

  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    isAdmin = decodedToken.admin === 1; // Admin jogosultság ellenőrzése
  }

  if (to.meta.requiresAdmin && !isAdmin) {
    next({ name: 'HomePage' }); // Átirányítás a főoldalra, ha nincs admin jogosultság
  } else if (to.name !== 'Login' && to.name !== 'ForgotPassword' && to.name !== 'ResetPassword' && !isAuthenticated) {
    next({ name: 'Login' }); // Átirányítás a bejelentkezéshez
  } else {
    next(); // Minden más esetben folytatás
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router;