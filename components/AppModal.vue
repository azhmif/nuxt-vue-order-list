<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  isOpen: Boolean,
  dataModal: Array,
});

const emit = defineEmits(["modal-close"]);
console.log("modal value");
console.log(props.isOpen);
console.log(props.dataModal);
// console.log(dataModal);
const target = ref(null);
onClickOutside(target, () => emit("modal-close"));

const formatDate = (date) => {
  let conversDate = date.split("-").reverse().join("-");
  let newdate = new Date(conversDate);
  const month = newdate.toLocaleString("default", { month: "long" });
  const days = newdate.getDate();
  const years = newdate.getFullYear();
  return days + " " + month + " " + years;
};

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};
</script>
<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" ref="target">
        <div class="modal-header">
          <slot name="header">Order Detail </slot>
        </div>
        <div class="modal-body">
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                <div class="orderId">Order ID : {{ dataModal?.id }}</div>
              </div>
              <div class="card-title">
                <div class="createdAt">
                  Created At :
                  {{ dataModal ? formatDate(dataModal.createdAt) : "" }}
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="body-akun">
                <span class="label text-label">Info Akun</span>
                <span class="text-value">{{ dataModal?.customer.name }}</span>
                <span class="text-value">{{ dataModal?.customer.email }}</span>
                <span class="text-value">{{
                  dataModal?.customer.phoneNumber
                }}</span>
              </div>
              <div class="paket-harga">
                <div class="body-paket">
                  <div class="row">
                    <div class="col-label">
                      <span class="label text-label">Provider</span>
                    </div>
                    <div class="col-value">
                      <span class="text-value">{{
                        dataModal?.provider.name
                      }}</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-label">
                      <span class="label text-label">Paket</span>
                    </div>
                    <div class="col-value">
                      <span class="text-value">{{
                        dataModal?.provider.package
                      }}</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-label">
                      <span class="label text-label">Exp</span>
                    </div>
                    <div class="col-value">
                      <span class="text-value"
                        >Exp
                        {{
                          dataModal
                            ? formatDate(dataModal.provider.expiredAt)
                            : ""
                        }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="body-price">
                  {{ rupiah(dataModal.provider.price) }}
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="detail-akun">
                <div class="row">
                  <div class="col-label">
                    <span class="label text-value">Voucher Code</span>
                  </div>
                  <div class="col-colon">
                    <span class="label text-value">: </span>
                  </div>
                  <div class="col-value">
                    <span class="text-value">
                      {{ dataModal?.payment.voucher }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-label">
                    <span class="label text-value">Payment Status</span> &emsp;:
                  </div>
                  <div class="col-colon">
                    <span class="label text-value">: </span>
                  </div>
                  <div class="col-value">
                    <span class="text-value">
                      {{ dataModal?.payment.status }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-label">
                    <span class="label text-value">Payment Date</span>
                  </div>
                  <div class="col-colon">
                    <span class="label text-value">: </span>
                  </div>
                  <div class="col-value">
                    <span class="text-value">
                      {{
                        dataModal ? formatDate(dataModal.payment.date) : ""
                      }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-label">
                    <span class="label text-value">Payment Bank</span>
                  </div>
                  <div class="col-colon">
                    <span class="label text-value">: </span>
                  </div>
                  <div class="col-value">
                    <span class="text-value">
                      {{ dataModal?.payment.bank }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
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
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  width: 70%;
  margin: 40px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.modal-footer {
  text-align: right;
}
</style>
