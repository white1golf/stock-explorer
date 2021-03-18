<template>
  <div class="svg-img" :class="[`svg-img-${name}`]">
    <svg class="svg-img__svg">
      <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'svg-Image',

  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconPath() {
      let icon = require(`@/assets/icons/${this.name}.svg`);
      if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
        icon = icon.default;
      }
      return icon.url;
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-img {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: auto;
  margin: 0;
  top: -0.02rem;
  fill: currentColor;

  &__svg {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
  }
}
</style>
