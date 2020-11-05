<template>
  <div class="dropdown-menu" :class="{ 'is-active': active }">
    <template v-for="item in items">
      <router-link
        v-if="item.isRouterLink"
        :to="item.to"
        class="mensie-item"
        :key="item.key"
      >
        {{ item.title }}
      </router-link>
      <a v-else class="logout menu-item" @click="apiCall" :key="item.key">
        {{ item.title }}
      </a>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    active: {
      type: Boolean,
      default: false,
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