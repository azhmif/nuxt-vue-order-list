
  
  <template>
   <div>
    <nav :class="['sidebar', isSidebarActive ? '' : 'sidebar-hidden']">
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
   </div>
  </template>

<script setup>
const props = defineProps({isSidebarActive:''})

</script>
