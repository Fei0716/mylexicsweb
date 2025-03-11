<script setup>
import {defineEmits} from 'vue';
import {useRoute} from "vue-router";
const emits = defineEmits(["hide"]);
const route = useRoute();
function hideModal(){
  emits("hide");
}

</script>

<template>
  <div id="modal">
    <div id="modal-continue">
      <img id="bg-modal-continue" src="/images/bg_penghargaan.png" alt="Modal Penghargaan's background">
      <div id="modal-btn-group">
        <button id="btn-yes" @click="hideModal"><img src="/images/btn_keluar_01.png"></button>
      </div>
    </div>
  </div>

</template>

<style scoped>

#modal-continue{
  position: relative;
  height: auto;
  width: 800px;
  max-width: 100%;

  #bg-modal-continue{
    width: 100%;
    object-fit: contain;
    height: auto;
    border-radius: 2rem;

  }

  button{
    all: unset;
    cursor: pointer;
  }
  #modal-btn-group{
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    justify-content: center;
    gap: 2rem;

    img{
      width: 100px;
    }
  }
}

@media screen and (max-width: 500px){
  #modal-btn-group{
    img{
      width: 60px!important;
    }
  }
}
</style>