<template>
  <section class="LoggedInNav">
    <div class="details-wrap">
      <span class=""><i class="fas fa-plus navbar-item"></i></span>
      <Dropdown :items="menu.new" />
    </div>
    <div class="details-wrap">
      <div class="avatar-wrap" @click="isMenuActive = !isMenuActive">
        <Avatar class="avatar" :size="40" username="장산"></Avatar>
      </div>
      <Dropdown :items="menu.profile" :active="isMenuActive" />
    </div>
  </section>
</template>

<script>
import Avatar from 'vue-avatar';
import Dropdown from '@/components/Dropdown';
import data from '@/data/dropdown';

export default {
  components: {
    Avatar,
    Dropdown,
  },

  data() {
    return {
      isMenuActive: false,
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
    this.$eventHub.$on('navigate', this.setMeta);
    this.setMeta(this.$router.currentRoute.meta);
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/utils/all'; // 임시.

$grey-lighter: hsl(0, 0%, 86%) !default;
$navbar-breakpoint: $tablet !default;

$dropdown-menu-width: 130px;
$dropdown-menu-bg: white;

.LoggedInNav {
  display: flex;
  flex-direction: column;
  @include from($navbar-breakpoint) {
    margin-left: auto;
    flex-direction: row;
    & > * + * {
      margin-left: 1rem;
    }
  }
}
.add {
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid grey;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
  }
}
.details-wrap {
  position: relative;
}
.avatar-wrap {
  cursor: pointer;
}
.dropdown-menu {
  display: none;
  position: absolute;
  flex-direction: column;
  width: $dropdown-menu-width;
  height: 150px;
  border: 1px solid hsl(0, 0%, 86%);
  border-radius: 1rem;
  background: $dropdown-menu-bg;
  padding: 2rem;
  top: 40px;
  right: 0px;
  &.is-active {
    display: flex;
  }
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: -14px;
    right: 11px;
    border: 7px solid transparent;
    border-bottom: 7px solid $dropdown-menu-bg;
  }
}
</style>