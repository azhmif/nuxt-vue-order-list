<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  isOpen: Boolean,
  modalData: null,
});

const emit = defineEmits(["modal-close"]);

const target = ref(null);
onClickOutside(target, () => emit("modal-close"));
</script>
<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" ref="target">
        <div class="modal-header">
          <slot name="header"> default header </slot>
        </div>
        <div class="modal-body">
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                <div class="orderId">Order ID : <slot name="order_id">random </slot>
                </div>
              </div>
              <div class="card-title">
                <div class="createdAt">Created_at : <slot name="created_at">random </slot></div>
              </div>
            </div>
            <div class="card-body">
              <div class="body-akun">akun</div>
              <div class="paket-harga">
                <div class="body-paket">paket</div>
                <div class="body-price">harga</div>
              </div>
            </div>
          </div>
          <div class="card" @click="openModal">
            <div class="card-body">asdasdas</div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click.stop="emit('modal-close')" class="btn btn-primary">
            Oke
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  width: 70%;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.modal-footer {
  text-align: right;
}
</style>
