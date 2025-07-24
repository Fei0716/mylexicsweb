import {createRouter,createWebHistory} from "vue-router";
import LamanUtama from "./views/LamanUtama.vue";
import LamanAbjad from "./views/LamanAbjad.vue";
import AbjadVokal from "./views/AbjadVokal.vue";
import AbjadVokalBergambar from "./views/AdjadVokalBergambar.vue";
import AbjadKonsonan from "./views/AbjadKonsonan.vue";
import AbjadKonsonanBergambar from "./views/AbjadKonsonanBergambar.vue";
import LamanSukukata from "./views/LamanSukukata.vue";
import SukukataKv from "./views/SukukataKv.vue";
import SukukataKvk from "./views/SukukataKvk.vue";
import LamanPerkataan from "./views/LamanPerkataan.vue";
import KenaliPerkataan from "./views/KenaliPerkataan.vue";
import KeluargaPerkataan from "./views/KeluargaPerkataan.vue";

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
        path: "/laman-sukukata",
        name: "LamanSukukata",
        component: LamanSukukata
    },
    {
        path: "/laman-sukukata/sukukata-kv",
        name: "SukukataKv",
        component: SukukataKv
    },
    {
        path: "/laman-sukukata/sukukata-kvk",
        name: "SukukataKvk",
        component: SukukataKvk
    },
    {
        path: "/laman-perkataan",
        name: "LamanPerkataan",
        component: LamanPerkataan
    },
    {
        path: "/laman-perkataan/kenali-perkataan",
        name: "KenaliPerkataan",
        component: KenaliPerkataan
    },
    {
        path: "/laman-perkataan/keluarga-perkataan",
        name: "KeluargaPerkataan",
        component: KeluargaPerkataan
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