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
        <NavbarItem v-if="item.isRouterLink" :to="item.to" :key="item.id">
          {{ item.title }}
        </NavbarItem>

        <NavbarItem
          v-else
          :tag="div"
          :isLogout="item.isLogout"
          :key="item.id"
          @logout="logout"
        >
          {{ item.title }}
        </NavbarItem>
      </template>
    </div>
  </div>
</template>

<script>
import Constant from '../store/constant';
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
      div: 'div',
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
      default: function () {
        return [];
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
    //$root에 등록된 logout과 연결하자.
    async logout() {
      await this.$store.dispatch(Constant.LOGOUT);
      window.localStorage.setItem('logout', Date.now());
      this.$router.push('/login');
    },
    showMenu() {
      this.isActive = true;
    },
    closeMenu() {
      this.isActive = false;
    },
  },
};
</script>