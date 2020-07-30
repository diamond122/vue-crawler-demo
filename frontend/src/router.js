import Vue from "vue";
import VueRouter from 'vue-router';
import Main from './components/Main';
import Detail from './components/Detail';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', name: 'main', component: Main },
    { path: '/detail', name: 'detail', component: Detail },
  ]
})

export default router;