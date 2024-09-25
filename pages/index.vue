<template>
  <div>
    <nav class="navbar">
      <div class="logo_item">
        <Icon
          name="uil:bars"
          style="color: black"
          id="sidebarOpen"
          size="2em"
        />
        <img src="/img/brand_seakun.svg" alt="brand seakun" />
      </div>
    </nav>
    <nav class="sidebar">
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
              v-model="query"
            />
            <!-- <AppButton> Submit </AppButton> -->
            <button type="button" class="btn btn-primary">Submit</button>
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
          @click="openModal(index)"
        >
          <div class="card-header">
            <div class="card-title">
              <div class="orderId">Order ID : {{ data.orderID }}</div>
            </div>
            <div class="card-title">
              <div class="createdAt">
                Created_at : {{ formatDate(data.createdAt) }}
              </div>
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
        <div class="pagination">
          <button @click="backPage">prev</button>
          <button
            v-for="item in Math.ceil(paginatedData.length / pageSize)"
            :key="item"
            @click="() => goToPage(item)"
          >
            {{ item }}
          </button>
          <button @click="nextPage">next</button>
        </div>

        <AppModal
          :isOpen="isModalOpened"
          @modal-close="closeModal"
          @submit="submitHandler"
          name="first-modal"
        >
          <template #header>Custom header</template>
          <template #content>Custom content</template>
          <!-- <template #footer>Custom content</template> -->
        </AppModal>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
// import ModalComponent from "../components/ModalComponent.vue";
import AppModal from "~/components/AppModal.vue";
import AppButton from "~/components/AppButton.vue";
const sorting = defineModel("sorting");
const query = defineModel("query");

const isModalOpened = ref(false);

console.log(query);

const onchange = () => {
  console.log(query);
};

const openModal = (i) => {
  console.log(i);
  isModalOpened.value = true;
};
const closeModal = () => {
  isModalOpened.value = false;
};

const submitHandler = () => {
  //here you do whatever
};

const formatDate = (date) => {
  let conversDate = date.split("-").reverse().join("-");
  let newdate = new Date(conversDate);
  const month = newdate.toLocaleString("default", { month: "long" });
  const days = newdate.getDate();
  const years = newdate.getFullYear();
  return days + " " + month + " " + years;
};

// pagination
let page = ref(1);
let sort = ref("asc");
// let query =''
const pageSize = 5;
const dataFetch = await $fetch(
  "https://seakun-frontend-assessment.vercel.app/data.json"
);
let paginatedData = computed(() => {
  let values = dataFetch
    .filter((item) => {
      return item.customer.name.toLowerCase().indexOf("john") >= 0;
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
    })
    .slice((page.value - 1) * pageSize, page.value * pageSize);
  return values;
});

// const filterSearch = (dt) => {
//   if (q.value != "") {
//     console.log("query ryn");
//     let query = q.value.toLowerCase();
//     dt.filter((item) => item.customer.name.toLowerCase().indexOf(query.value) >= 0);
//   }
//   if (sort.value == "asc") {
//     console.log("asc");

//     dt.sort(
//       (a, b) =>
//         new Date(a.createdAt.split("-").reverse().join("-")) -
//         new Date(b.createdAt.split("-").reverse().join("-"))
//     ).slice((page.value - 1) * pageSize, page.value * pageSize);
//   } else {
//     dt.sort(
//       (a, b) =>
//         new Date(b.createdAt.split("-").reverse().join("-")) -
//         new Date(a.createdAt.split("-").reverse().join("-"))
//     );
//   }
//   dt.slice((page.value - 1) * pageSize, page.value * pageSize);

//   return dt;
// };
// const pagination = (array, page_size, page_number) => {
//   return array.slice((page_number - 1) * page_size, page_number * page_size);
// };

// const datas = pagination(dataFetch,pageSize,pageNumber)

const nextPage = () => {
  if (page.value !== Math.ceil(dataFetch.length / perPage)) {
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
</script>
