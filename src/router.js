import {createRouter,createWebHistory} from "vue-router";
import LamanUtama from "./views/LamanUtama.vue";
import LamanAbjad from "./views/LamanAbjad.vue";
import AbjadVokal from "./views/AbjadVokal.vue";
import AbjadVokalBergambar from "./views/AdjadVokalBergambar.vue";
import AbjadKonsonan from "./views/AbjadKonsonan.vue";
import AbjadKonsonanBergambar from "./views/AbjadKonsonanBergambar.vue";


const routes = [
    {
        path: "/",
        name: "LamanUtama",
        component: LamanUtama
    },
    {
        path: "/laman-abjad",
        name: "LamanAbjad",
        component: LamanAbjad
    },
    {
        path: "/laman-abjad/vokal",
        name: "AbjadVokal",
        component: AbjadVokal
    },
    {
        path: "/laman-abjad/vokal-bergambar",
        name: "AbjadVokalBergambar",
        component: AbjadVokalBergambar
    },
    {
        path: "/laman-abjad/konsonan",
        name: "AbjadKonsonan",
        component:AbjadKonsonan
    },
    {
        path: "/laman-abjad/konsonan-bergambar",
        name: "AbjadKonsonanBergambar",
        component: AbjadKonsonanBergambar
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/"
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router;