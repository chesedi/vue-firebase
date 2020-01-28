import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'

Vue.use(Router)

// const levelCheck = (to, from, next) => {
//   if (store.state.claims === undefined) next('/userProfile')
//   next()
// }

const adminCheck = (to, from, next) => {
  if (!store.state.user) {
    if (to.path !== '/sign') return next('/sign')
  } else {
    if (!store.state.user.emailVerified) next('/userProfile')
    if (store.state.claims.level > 0) throw Error('관리자만 들어갈 수 있습니다.')
  }
  next()
}

const userCheck = (to, from, next) => {
  if (!store.state.user) {
    if (to.path !== '/sign') return next('/sign')
  } else {
    if (!store.state.user.emailVerified) next('/userProfile')
    if (store.state.claims.level > 1) throw Error('사용자만 들어갈 수 있습니다.')
  }
  next()
}

const guestCheck = (to, from, next) => {
  if (!store.state.user) {
    if (to.path !== '/sign') return next('/sign')
  } else {
    if (!store.state.user.emailVerified) next('/userProfile')
    if (store.state.claims.level > 2) throw Error('손님만 들어갈 수 있습니다.')
  }
  next()
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: guestCheck
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('./views/sign.vue'),
      beforeEnter: (to, from, next) => {
        if (store.state.user) return next('/')
        next()
      }
    },
    {
      path: '/admin/users',
      component: () => import('./views/admin/users'),
      beforeEnter: guestCheck // adminCheck
    },
    {
      path: '/test/lv0',
      component: () => import('./views/test/lv0.vue'),
      beforeEnter: adminCheck
    },
    {
      path: '/test/lv1',
      component: () => import('./views/test/lv1.vue'),
      beforeEnter: userCheck
    },
    {
      path: '/test/lv2',
      component: () => import('./views/test/lv2.vue'),
      beforeEnter: guestCheck
    },
    {
      path: '/userProfile',
      component: () => import('./views/userProfile.vue'),
      beforeEnter: (to, from, next) => {
        if (!store.state.user) return next('/sign')
        next()
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/about2',
      component: () => import('./views/About2.vue')
    },
    {
      path: '/lectures/card',
      component: () => import('./views/lectures/card.vue')
    },
    {
      path: '/lectures/card',
      component: () => import('./views/lectures/card.vue')
    },
    {
      path: '/lectures/layout',
      component: () => import('./views/lectures/layout.vue')
    },
    {
      path: '/lectures/notes',
      component: () => import('./views/lectures/notes.vue')
    },
    {
      path: '/lectures/axios',
      component: () => import('./views/lectures/axios.vue')
    },
    {
      path: '/lectures/mother',
      component: () => import('./views/lectures/mother.vue')
    },
    {
      path: '/lectures/vuex',
      component: () => import('./views/lectures/vuex.vue')
    },
    {
      path: '*',
      component: () => import('./views/e404.vue')
    }
  ]
})

const waitFirebase = () => {
  return new Promise((resolve, reject) => {
    let cnt = 0
    const tmr = setInterval(() => {
      if (store.state.firebaseLoaded) {
        clearInterval(tmr)
        resolve()
      } else if (cnt++ > 200) {
        clearInterval(tmr)
        reject(Error('파이어베이스 로드가 안되었습니다.'))
      }
    }, 10)
  })
}

router.beforeEach((to, from, next) => {
  // Vue.prototype.$Progress.start()
  // if (store.state.firebaseLoaded) next()
  waitFirebase()
    .then(() => next())
    .catch(e => Vue.prototype.$toasted.global.error(e.message))
})

router.afterEach((to, from) => {
  Vue.prototype.$Progress.finish()
})

router.onError(e => {
  Vue.prototype.$Progress.finish()
  Vue.prototype.$toasted.global.error(e.message)
})

export default router
