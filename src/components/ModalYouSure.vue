<script setup>
import {ref,watch,defineEmits} from 'vue';
import {useRoute} from "vue-router";
import router from '../router.js';
const emits = defineEmits(["hide"]);
const route = useRoute();
function hideModal(){
  emits("hide");
}
function closeWindow(){
  window.open("", "_self").close();
}
</script>

<template>
  <div id="modal">
    <div id="modal-continue">
      <img id="bg-modal-continue" src="/images/modal_you_sure.png" alt="Modal Are You Sure's background">
      <div id="modal-btn-group">
        <button id="btn-yes" @click="closeWindow"><img src="/images/btn_yes_01.png"></button>
        <button id="btn-no" @click="hideModal()"><img src="/images/btn_no_01.png"></button>
      </div>
    </div>
  </div>

</template>

<style scoped>

#modal-continue{
  position: relative;
  width: 400px;
  height: auto;
  max-width: 100%;

  #bg-modal-continue{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button{
    all: unset;
    cursor: pointer;
  }
  #modal-btn-group{
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    gap: 2rem;

    img{
      width: 100px;
    }
  }

}
</style>