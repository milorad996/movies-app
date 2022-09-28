import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterPage from '../pages/auth/RegisterPage.vue'
import LoginPage from '../pages/auth/LoginPage.vue'
import CreateMoviePage from '../pages/movies-list/CreateMoviePage.vue'
import MovieListPage from '../pages/movies-list/MovieListPage.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/create-movie',
    name: 'CreateMoviePage',
    component: CreateMoviePage,
    meta: {
      auth: true
    }
  },
  {
    path: '/all-movies',
    name: 'MovieListPage',
    component: MovieListPage,
    meta: {
      guest: true
    }
  }

]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   const isAuth = !!localStorage.getItem("token");

//   if (isAuth && to.meta.guest) {
//     return next({ name: "MovieListPage" });
//   }

//   if (!isAuth && to.meta.auth) {
//     return next({ name: "Login" });
//   }

//   return next();
// });

export default router
