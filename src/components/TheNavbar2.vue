<template>
  <nav class="navbar p-2" v-click-outside="closeMenu">
    <div class="container">
      <div class="navbar-brand" id="logo">
        <a href="/" class="text-3xl uppercase text-indigo-700 ml-6">
          Imadoer
        </a>
        <span
          class="navbar-burger mr-6"
          :class="{ 'is-active': isBurgerOpen }"
          @click="toggleActive"
        >
          <span />
          <span />
          <span />
        </span>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': isBurgerOpen }">
        <div class="navbar-start">
          <TheSearch />
        </div>
        <div v-if="!isAuthenticated" class="navbar-end">
          <a href="#" @click.stop.prevent="clickTest" class="navbar-item search"
            >검색하기</a
          >
          <router-link to="/signup" exact class="navbar-item">
            회원가입
          </router-link>
          <router-link to="/login" class="navbar-item"> 로그인 </router-link>
        </div>
        <div v-else class="navbar-end">
          <LoggedInNav />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import TheSearch from '@/components/TheSearch';
import LoggedInNav from '@/components/LoggedInNav';
import clickOutside from '../directives/clickOutside';
// import makePlaceHolder from '@cloudfour/simple-svg-placeholder';

// const placeholder = makePlaceHolder({
//   width: 65,
//   height: 50,
//   bgColor: '#0F1C3F',
//   textColor: '#7FDBFF',
// });

export default {
  components: {
    TheSearch,
    LoggedInNav,
  },
  // 사용자 정의 지시어.
  directives: {
    clickOutside,
  },
  data() {
    return {
      isNavBar: true, //Used internally by NavbarItem.
      internalIsActive: this.active,
      isBurgerOpen: false, //버거 메뉴를 위한 스위치
      // imgSrc: placeholder,
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
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    clickTest() {
      alert('TODO: 검색 팝업 구현하기');
    },
    // burger 에서 사용.
    toggleActive() {
      this.isBurgerOpen = !this.isBurgerOpen;
    },
    // click-outside에서 사용.
    closeMenu() {
      if (this.internalIsActive) this.internalIsActive = false;
    },
  },
  mounted() {
    // 원래 internalIsActive는 햄버거와 네브바 두 컴포넌트의 상태를 담당했음.
    // 하지만 isBurgerOpen을 새로 추가했기에 만일 아래의 navigate 이벤트 일때 closeMenu가 실행이
    // 버거까지 담당하도록 하려면 메소드 새로 만들 것.
    //this.$eventHub.$on('navigate', this.closeMenu);
  },
};
</script>
