<template>
  <section class="LoggedInNav">
    <NavbarDropdown :items="menu.new" wrapClass="new">
      <i name="new" class="fas fa-plus"></i>
    </NavbarDropdown>

    <NavbarDropdown :items="menu.profile" wrapClass="profile">
      <Avatar name="profile" class="avatar" :size="40" username="장산"></Avatar>
    </NavbarDropdown>
  </section>
</template>

<script>
import Avatar from 'vue-avatar';
import NavbarDropdown from '@/components/NavbarDropdown';

import data from '@/data/dropdown';

export default {
  components: {
    Avatar,
    NavbarDropdown,
  },

  data() {
    return {
      menu: {},
    };
  },

  methods: {
    closeMenu() {
      this.isMenuActive = false;
    },
    setMeta() {
      this.menu = data;
    },
  },

  mounted() {
    //this.$eventHub.$on('navigate', this.setMeta);
    this.setMeta();
  },
};
</script>
