<template>
  <nav class="navbar" v-click-outside="closeMenu">
    <div class="container">
      <div class="navbar-brand">
        <NavbarItem href="#">
          <img :src="imgSrc" />
        </NavbarItem>
        <span
          class="navbar-burger"
          :class="{ 'is-active': isOpened }"
          @click="toggleActive"
        >
          <span />
          <span />
          <span />
        </span>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': internalIsActive }">
        <div class="navbar-start">
          <TheSearch />
        </div>
        <div v-if="!isAuthenticated" class="navbar-end">
          <router-link to="/signup" exact class="navbar-item">
            회원가입
          </router-link>
          <router-link to="/login" class="navbar-item">
            로그인
          </router-link>
        </div>
        <div v-else class="navbar-end">
          <LoggedInNav></LoggedInNav>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import TheSearch from '@/components/TheSearch';
import NavbarItem from '@/components/NavbarItem';
import LoggedInNav from '@/components/LoggedInNav';
import clickOutside from '../directives/clickOutside';
import makePlaceHolder from '@cloudfour/simple-svg-placeholder';

const placeholder = makePlaceHolder({
  width: 65,
  height: 50,
  bgColor: '#0F1C3F',
  textColor: '#7FDBFF',
});

export default {
  components: {
    TheSearch,
    LoggedInNav,
    NavbarItem,
  },
  // 사용자 정의 지시어.
  directives: {
    clickOutside,
  },
  data() {
    return {
      isNavBar: true, //Used internally by NavbarItem.
      internalIsActive: this.active,
      imgSrc: placeholder,
    };
  },
  props: {
    // To Control the behaviour of the mobile menu programmatically. use the .sync modifier to make it two-way binding.
    active: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    active: {
      handler(active) {
        this.internalIsActive = active;
      },
      immediate: true, //immedisate true 값으로 default 값 false 로 지정된 값을 기반으로 호출 발생.
    },
  },
  computed: {
    isOpened() {
      return this.internalIsActive;
    },

    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    // burger 에서 사용.
    toggleActive() {
      this.internalIsActive = !this.internalIsActive;
    },
    // click-outside에서 사용.
    closeMenu() {
      if (this.internalIsActive) this.internalIsActive = false;
    },
  },
  mounted() {
    this.$eventHub.$on('navigate', this.closeMenu);
  },
};
</script>
