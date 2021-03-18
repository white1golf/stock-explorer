<template>
  <div class="flex flex-col items-center h-full">
    <TheSlimHeader class="mt-20" />
    <router-view class="mt-10 mb-auto" />
    <TheFooter />
  </div>
</template>

<script>
import TheSlimHeader from '@/components/TheSlimHeader';
import TheFooter from '@/components/TheFooter';

export default {
  name: 'App',
  components: {
    TheSlimHeader,
    TheFooter,
  },
};
</script>
