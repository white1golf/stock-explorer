<template>
  <div class="dropdown-menu" :class="{ 'is-active': isMenuActive }">
    <label v-for="item in items" :key="item.id">
      <router-link v-if="item.isRouterLink" :to="item.to" class="menu-item">
        {{ item.title }}
      </router-link>
      <a v-else class="logout menu-item" @click="apiCall">
        {{ item.title }}
      </a>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    isMenuActive: Boolean,
    isHoverable: {
      type: Boolean,
      default: true,
    },
    items: Array,
    apiCall: Function,
  },
};
</script>