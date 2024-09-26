<template>
  <div>
    <nav class="navbar">
      <div class="logo_item">
        <Icon
          name="uil:bars"
          style="color: black"
          id="sidebarOpen"
          size="2em"
          @click="sideBar()"
        />
        <img src="/img/brand_seakun.svg" alt="brand seakun" />
      </div>
    </nav>
    <AppSideBar v-if="SideOpen" />

    <div class="content-wrapper">
      <div class="content">
        <h1 class="">Order List</h1>
        <div class="form">
          <div class="search">
            <input
              type="text"
              placeholder="Search by name"
              class="input-form"
              ref="q"
            />
            <!-- <AppButton> Submit </AppButton> -->
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="getValueSearch()"
            >
              Submit
            </button>
          </div>
          <div class="sorting">
            <select name="" id="" class="input-form" v-model="sorting">
              <option value="">Sort</option>
              <option value="ascending">Ascending</option>
              <option value="descending">descending</option>
            </select>
          </div>
        </div>

        <div
          class="card"
          v-for="(data, index) in paginatedData"
          @click="openModal(data)"
          :key="index"
        >
          <div class="card-header">
            <div class="card-title">
              <div class="orderId">Order ID : {{ data.orderID }}</div>
            </div>
            <div class="card-title">
              <div class="createdAt">
                Created At : {{ formatDate(data.createdAt) }}
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="body-akun">
              <span class="label text-label">Info Akun</span>
              <span class="text-value">{{ data.customer.name }}</span>
              <span class="text-value">{{ data.customer.email }}</span>
              <span class="text-value">{{ data.customer.phoneNumber }}</span>
            </div>
            <div class="paket-harga">
              <div class="body-paket">
                <div class="row">
                  <div class="col-label">
                    <span class="label text-label">Provider</span>
                  </div>
                  <div class="col-value">
                    <span class="text-value">{{ data.provider.name }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-label">
                    <span class="label text-label">Paket</span>
                  </div>
                  <div class="col-value">
                    <span class="text-value">{{ data.provider.package }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-label">
                    <span class="label text-label">Exp</span>
                  </div>
                  <div class="col-value">
                    <span class="text-value"
                      >Exp {{ formatDate(data.provider.expiredAt) }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="body-price">
                {{ formatCurrency(data.provider.price) }}
              </div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <button class="btn btn-disable" v-if="page == 1" disabled>
            prev
          </button>
          <button @click="backPage" class="btn btn-primary" v-if="page != 1">
            prev
          </button>
          <button
            v-for="item in Math.ceil(countData.length / pageSize)"
            :key="item"
            @click="() => goToPage(item)"
            :class="page == item ? ['btn btn-disable'] : [' btn btn-primary ']"
          >
            {{ item }}
          </button>
          <button
            class="btn btn-disable"
            v-if="page == Math.ceil(countData.length / pageSize)"
            disabled
          >
            next
          </button>
          <button
            @click="nextPage"
            class="btn btn-primary"
            v-if="page != Math.ceil(countData.length / pageSize)"
          >
            next
          </button>
        </div>
        <AppModal
          :isOpen="isModalOpened"
          @modal-close="closeModal"
          name="first-modal"
          :dataModal="dataModal"
        >
          <template #header>Order Detail </template>
        </AppModal>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import formatCurrency from "../utils/formatCurrency";
import formatDate from "../utils/formatDate";
// import ModalComponent from "../components/ModalComponent.vue";
const sorting = defineModel("sorting");
const query = defineModel("query");

const isModalOpened = ref(false);
const SideOpen = ref(true);
const q = ref("");
const dataModal = ref();

const sideBar = () => {
  SideOpen.value = !SideOpen.value;
};
const getValueSearch = () => {
  query.value = q.value.value;
};
// pagination
let page = ref(1);
// let sort = ref("asc");
// let query = ref("");
// let query =''
const pageSize = 5;
const dataFetch = await $fetch(
  "https://seakun-frontend-assessment.vercel.app/data.json"
);
let countData = computed(() => {
  return dataFetch.filter((item) => {
    return (
      item.customer.name
        .toLowerCase()
        .indexOf(query.value ? query.value : "") >= 0
    );
  });
});

let paginatedData = computed(() => {
  let values = dataFetch
    .filter((item) => {
      return (
        item.customer.name
          .toLowerCase()
          .indexOf(query.value ? query.value : "") >= 0
      );
    })
    .sort((a, b) => {
      if (sorting.value == "ascending") {
        return (
          new Date(a.createdAt.split("-").reverse().join("-")) -
          new Date(b.createdAt.split("-").reverse().join("-"))
        );
      } else {
        return (
          new Date(b.createdAt.split("-").reverse().join("-")) -
          new Date(a.createdAt.split("-").reverse().join("-"))
        );
      }
    });
  return values.slice((page.value - 1) * pageSize, page.value * pageSize);
});

const nextPage = () => {
  if (page.value !== Math.ceil(countData.length / pageSize)) {
    page.value += 1;
  }
};
const backPage = () => {
  if (page.value !== 1) {
    page.value -= 1;
  }
};

const goToPage = (numPage) => {
  page.value = numPage;
};

const openModal = (data) => {
  dataModal.value = data;
  isModalOpened.value = true;
};
const closeModal = () => {
  isModalOpened.value = false;
};
</script>
