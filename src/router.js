import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "./views/LandingPage.vue";
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
import KeluargaPerkataanGroup from "./views/KeluargaPerkataanGroup.vue";
import LamanAktiviti from "./views/LamanAktiviti.vue";
import LamanAktivitiAbjad from "./views/LamanAktivitiAbjad.vue";
import AktivitiAbjadPilihAbjad from "./views/AktivitiAbjadPilihAbjad.vue";
import AktivitiAbjadKenaliBunyi from "./views/AktivitiAbjadKenaliBunyi.vue";
import LamanAktivitiSukukata from "./views/LamanAktivitiSukukata.vue";
import LamanAktivitiPerkataan from "./views/LamanAktivitiPerkataan.vue";

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/app/",
    name: "LamanUtama",
    component: LamanUtama,
  },
  {
    path: "/app/laman-abjad",
    name: "LamanAbjad",
    component: LamanAbjad,
  },
  {
    path: "/app/laman-abjad/vokal",
    name: "AbjadVokal",
    component: AbjadVokal,
  },
  {
    path: "/app/laman-abjad/vokal-bergambar",
    name: "AbjadVokalBergambar",
    component: AbjadVokalBergambar,
  },
  {
    path: "/app/laman-abjad/konsonan",
    name: "AbjadKonsonan",
    component: AbjadKonsonan,
  },
  {
    path: "/app/laman-abjad/konsonan-bergambar",
    name: "AbjadKonsonanBergambar",
    component: AbjadKonsonanBergambar,
  },
  {
    path: "/app/laman-sukukata",
    name: "LamanSukukata",
    component: LamanSukukata,
  },
  {
    path: "/app/laman-sukukata/sukukata-kv",
    name: "SukukataKv",
    component: SukukataKv,
  },
  {
    path: "/app/laman-sukukata/sukukata-kvk",
    name: "SukukataKvk",
    component: SukukataKvk,
  },
  {
    path: "/app/laman-perkataan",
    name: "LamanPerkataan",
    component: LamanPerkataan,
  },
  {
    path: "/app/laman-perkataan/kenali-perkataan",
    name: "KenaliPerkataan",
    component: KenaliPerkataan,
  },
  {
    path: "/app/laman-perkataan/keluarga-perkataan",
    name: "KeluargaPerkataan",
    component: KeluargaPerkataan,
  },
  {
    path: "/app/laman-perkataan/keluarga-perkataan/:group",
    name: "KeluargaPerkataanGroup",
    component: KeluargaPerkataanGroup,
  },
  {
    path: "/app/laman-aktiviti",
    name: "LamanAktiviti",
    component: LamanAktiviti,
  },
  {
    path: "/app/laman-aktiviti/abjad",
    name: "LamanAktivitiAbjad",
    component: LamanAktivitiAbjad,
  },
  {
    path: "/app/laman-aktiviti/abjad/pilih-abjad",
    name: "AktivitiAbjadPilihAbjad",
    component: AktivitiAbjadPilihAbjad,
  },
  {
    path: "/app/laman-aktiviti/abjad/kenali-bunyi",
    name: "AktivitiAbjadKenaliBunyi",
    component: AktivitiAbjadKenaliBunyi,
  },
  {
    path: "/app/laman-aktiviti/sukukata",
    name: "LamanAktivitiSukukata",
    component: LamanAktivitiSukukata,
  },
  {
    path: "/app/laman-aktiviti/perkataan",
    name: "LamanAktivitiPerkataan",
    component: LamanAktivitiPerkataan,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
