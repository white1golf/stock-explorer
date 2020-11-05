<template>
  <div class="navbar-item has-dropdown">
    <div
      class="clickable-wrap"
      :class="wrapClass"
      @click.stop="isDropdownActive = !isDropdownActive"
    >
      <slot />
    </div>
    <div class="dropdown-menu" :class="{ 'is-active': isDropdownActive }">
      <template v-for="item in items">
        <router-link
          v-if="item.isRouterLink"
          :to="item.to"
          class="menu-item"
          :key="item.id"
        >
          {{ item.title }}
        </router-link>
        <a v-else class="logout menu-item" @click.stop="apiCall" :key="item.id">
          {{ item.title }}
        </a>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownActive: false,
    };
  },
  props: {
    wrapClass: {
      type: String,
    },
    isHoverable: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      //오브젝트나 배열은 꼭 기본값을 반환하는 팩토리 함수의 형태로 사용되어야 함.
      default: function() {
        return [];
      },
    },

    apiCall: {
      type: Object,
      default: function() {
        return console.log('apiCall should be injected!');
      },
    },
  },
};
</script>