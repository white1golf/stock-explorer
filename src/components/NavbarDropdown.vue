<template>
  <div
    class="navbar-item has-dropdown"
    :class="{ 'is-active': isActive }"
    v-click-outside="closeMenu"
  >
    <a
      class="navbar-link"
      :class="[wrapClass, { 'is-active': isActive && collapsible }]"
      role="menuitem"
      aria-haspopup="true"
      href="#"
      @click.prevent="isActive = !isActive"
    >
      <slot />
    </a>
    <div
      v-show="!collapsible || (collapsible && isActive)"
      class="navbar-dropdown"
    >
      <template v-for="item in items">
        <NavbarItem
          v-if="item.isRouterLink"
          :to="item.to"
          class="navbar-item"
          :key="item.id"
        >
          {{ item.title }}
        </NavbarItem>

        <NavbarItem
          v-else
          class="logout navbar-item"
          @click.stop="apiCall"
          :key="item.id"
        >
          {{ item.title }}
        </NavbarItem>
      </template>
    </div>
  </div>
</template>

<script>
import clickOutside from '../directives/clickOutside';
import NavbarItem from '@/components/NavbarItem';

export default {
  components: {
    NavbarItem,
  },

  directives: {
    clickOutside,
  },

  data() {
    return {
      isActive: this.active,
      isNavbarDropdown: true, //Used internally by NavbarItem.
    };
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    //Collapsible dropdown on mobile.
    collapsible: {
      type: Boolean,
      default: true,
    },
    wrapClass: {
      type: String,
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
  watch: {
    active: {
      handler(active) {
        this.isActive = active;
      },
      immediate: true,
    },
  },
  methods: {
    showMenu() {
      this.isActive = true;
    },
    closeMenu() {
      this.isActive = false;
    },
  },
};
</script>