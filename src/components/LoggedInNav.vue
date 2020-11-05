<template>
  <section class="LoggedInNav">
    <Navitemdropdown :items="menu.new" wrapClass="new">
      <i name="new" class="fas fa-plus"></i>
    </Navitemdropdown>

    <Navitemdropdown :items="menu.profile" wrapClass="profile">
      <Avatar name="profile" class="avatar" :size="40" username="장산"></Avatar>
    </Navitemdropdown>
  </section>
</template>

<script>
import Avatar from 'vue-avatar';
import Navitemdropdown from '@/components/Navitemdropdown';

import data from '@/data/dropdown';

export default {
  components: {
    Avatar,
    Navitemdropdown,
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
