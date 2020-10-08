<template>
  <div class="scroll">
    <h1>slide Indicator</h1>
    <div id="scroll-indicator" class="scroll-indicator">
      <div id="indicator" class="indicator"><span>20%</span></div>
    </div>
  </div>
</template>

<script>
/**
 * https://codepen.io/paulobrien/pen/JWdoXm
 */
export default {
  data() {
    return {};
  },

  props: {
    data: Array,
  },
};
</script>
