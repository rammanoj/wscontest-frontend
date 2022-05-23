import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Contests from "./components/Contests.vue"
import ContestDetails from "./components/ContestDetails.vue"
import Graph from "./components/Graph.vue"
import Home from "./components/Home.vue"
import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/contests/", component: Contests},
        {path: "/contest/:id", component: ContestDetails, name: "contest"},
        {path: "/graph/", component: Graph},
        {path: "/", component: Home}
    ]
})

const app = createApp(App)

app.use(router);
app.mount('#app')
