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
    <!-- <AppSideBar :class="SideOpen"/> -->
    <nav class="sidebar" v-if="SideOpen">
      <div class="menu_content">
        <ul class="menu_items">
          <li class="item">
            <div href="#" class="nav_link submenu_item">
              <span class="navlink">Order List</span>
            </div>
          </li>
        </ul>
      </div>
    </nav>

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
                      >Exp{{ formatDate(data.provider.expiredAt) }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="body-price">{{ rupiah(data.provider.price) }}</div>
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
          @submit="submitHandler"
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
// import ModalComponent from "../components/ModalComponent.vue";
import AppModal from "~/components/AppModal.vue";
const sorting = defineModel("sorting");
const query = defineModel("query");

const isModalOpened = ref(false);
const SideOpen = ref(true);
const q = ref("");
const dataModal = ref(Array);

console.log(query);
const formatDate = (date) => {
  let conversDate = date.split("-").reverse().join("-");
  let newdate = new Date(conversDate);
  const month = newdate.toLocaleString("default", { month: "long" });
  const days = newdate.getDate();
  const years = newdate.getFullYear();
  return days + " " + month + " " + years;
};
const sideBar = () => {
  SideOpen.value = !SideOpen.value;
};
const getValueSearch = () => {
  // console.log(q.value.value);
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
    // console.log(query)
    // console.log(sorting)
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
      // console.log(query)
      // console.log(sorting)
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

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

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

const submitHandler = () => {
  //here you do whatever
};
</script>
