import { createRouter, createWebHistory } from 'vue-router'
// Importamos tu store de autenticación de la práctica anterior
import { useAuthStore } from '../stores/auth.js'

const routes = [
  // --- RUTAS PÚBLICAS ---
  { path: '/', component: () => import('../views/HomeView.vue') },
  { path: '/catalogo', component: () => import('../views/CatalogoView.vue') },
  {
    path: '/catalogo/:id',
    component: () => import('../views/ProductoDetalle.vue'),
    props: true, // pasa el :id como prop al componente
  },

  {
    path: '/carrito',
    name: 'carrito',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },

  // --- RUTAS PROTEGIDAS (Panel de Administración) ---
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('../views/admin/Dashboard.vue') },
      { path: 'productos', component: () => import('../views/admin/Productos.vue') },
    ]
  },

  // --- RUTA CATCH-ALL (Error 404) ---
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// --- GUARD GLOBAL DE NAVEGACIÓN ---
router.beforeEach(async (to) => {
  const auth = useAuthStore()

  // Inicializar usuario si hay token guardado
  if (auth.token && !auth.user) {
    // Nota: Necesitaremos asegurar que fetchUser exista en auth.js
    await auth.fetchUser()
  }

  // Si la ruta requiere autenticación y NO está autenticado
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    // Se manda al login, pero se guarda a dónde quería ir
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

export default router