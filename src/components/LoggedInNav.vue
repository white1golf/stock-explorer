<template>
  <section>
    <div class="logged-in-nav">
      <NavbarDropdown :items="menu.new" wrapClass="new">
        <i name="new" class="fas fa-plus"></i>
      </NavbarDropdown>

      <NavbarDropdown :items="menu.profile" wrapClass="profile">
        <Avatar
          name="profile"
          class="avatar"
          :size="40"
          username="장산"
        ></Avatar>
      </NavbarDropdown>
    </div>
    <div class="burger-menu">
      <template v-for="item in bgMenu">
        <NavbarItem v-if="item.isRouterLink" :to="item.to" :key="item.id">
          {{ item.title }}
        </NavbarItem>
        <NavbarItem
          v-else
          :tag="'div'"
          :isLogout="item.isLogout"
          :key="item.id"
          @logout="logout"
        >
          {{ item.title }}
        </NavbarItem>
      </template>
    </div>
  </section>
</template>

<script>
import Constant from '../store/constant';

import Avatar from 'vue-avatar';
import NavbarDropdown from '@/components/NavbarDropdown';
import NavbarItem from '@/components/NavbarItem';

import data from '@/data/dropdown';
import bgData from '@/data/burger-dropdown';

export default {
  components: {
    Avatar,
    NavbarDropdown,
    NavbarItem,
  },

  data() {
    return {
      menu: {},
      bgData: {},
    };
  },

  computed: {
    bgMenu() {
      return Object.values(this.bgData).reduce(
        (accumlator, currentValue) => accumlator.concat(currentValue),
        []
      );
    },
  },

  methods: {
    //임시 구현. 리팩토링 할 때 재사용성 생각해서 변경할 것.
    async logout() {
      await this.$store.dispatch(Constant.LOGOUT);
      window.localStorage.setItem('logout', Date.now());
      this.$router.push('/login');
    },

    closeMenu() {
      this.isMenuActive = false;
    },
    setMeta() {
      this.menu = data;
      this.bgData = bgData;
    },
  },

  mounted() {
    //this.$eventHub.$on('navigate', this.setMeta);
    this.setMeta();
  },
};
</script>
