<template>
  <component
    :is="tag"
    class="navbar-item"
    :class="{
      'is-active': active,
    }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

<script>
/**
 * 참조 Buefy
 * (https://github.com/buefy/buefy/blob/dev/src/components/navbar/NavbarItem.vue)
 * 필요한 부분만 변경.
 *
 */
const clickableWhiteList = ['div', 'span', 'input'];

export default {
  inheritAttrs: false, // 상위 스코프 속성에서 흘러 내려온 props 외 값들을 html 속성으로 루트 엘리먼트(여기선 component)에 적용하지 말라는 설정.
  props: {
    // navbar-item으로 렌더링 되어야할 컴포넌트의 타입을 지정.
    // a, router-link, div 등.. 해당 태그의 html 속성 도 함께(예 href)
    // v-bind:$attr 를 통해 props으로 등록되지 않은 속성값을 명시적으로 사용할 수 있음.
    // 때문에 href=#를 붙인게 내부의 a 태그의 href 속성으로 연결된 것.
    tag: {
      type: String,
      default: 'a',
    },
    // 아이템이 활성 상태인지를 표시.
    active: Boolean,
  },
  methods: {
    /**
     * Keypress event that is bound to the document
     */
    // 키 값이 Escape나 Esc 면 closeMenuResursive
    keyPress({ key }) {
      if (key === 'Escape' || key === 'Esc') {
        this.closeMenuRecursive(this, ['NavBar']);
      }
    },
    /**
     * Close parent if clicked outside.
     */
    handleClickEvent(event) {
      const isOnWhiteList = clickableWhiteList.some(
        item => item === event.target.localName
      );
      // whitelist에 있는 엘리먼트(div, span, input)가 아니어야지만 closemenu를 수행할 것임.
      //
      if (!isOnWhiteList) {
        const parent = this.closeMenuRecursive(this, [
          'NavbarDropdown',
          'NavBar',
        ]);
        if (parent && parent.$data.isNavbarDropdown)
          this.closeMenuRecursive(parent, ['NavBar']);
      }
    },
    /**
     * Close parent recursively
     * NavbarItem은 Navbar 과 NavbarDropdown 의 직계 자손 가능.
     * NavbarDropdown은 Navbar의 직계자손 가능. 때문에 Navbar의 closeMenu 까지 recursive하게 올라감.
     */

    closeMenuRecursive(current, targetComponents) {
      // 1. 부모가 없으면 closeMenuRecursive 수행할 필요성 없음. return null
      if (!current.$parent) return null;
      /**
       *  2. 부모가 navbar, navbardropdown 아니면 foundItem === null.
       *    그 부모를 기준으로 다시 closeMenuRecursive를 다시 수행하여 올라감.
       *  3. 부모가 navbar 이나 navbardropdown이면
       *    1) navbar 이면  부모의 closeMenu()를 수행 후 foundItem에 부모인 Navbar이 리턴됨.
       *    2) navbardown 이면 부모의 closeMenu()를 수행 후 foundIte에 부모인 Navbardropdown을 리턴.
       */

      const foundItem = targetComponents.reduce((acc, item) => {
        // 부모 컴포넌트 data 속성 판별. Navbar 또는 NavbarDropdown (_isNavbar, _isNavbarDropdown) 이여야만 closeMenu를 수행함.
        //
        if (current.$parent.$data[`is${item}`]) {
          current.$parent.closeMenu();
          return current.$parent;
        }
        return acc;
      }, null); // 부모가 navbar, navbardropdown 가 아니면 foundItem의 결과값은 null. acc 첫 시작 null, acc가 쌓이질 않음.
      return (
        foundItem || this.closeMenuRecursive(current.$parent, targetComponents)
      );
    },
  },
  //
  mounted() {
    if (typeof window !== 'undefined') {
      this.$el.addEventListener('click', this.handleClickEvent);
      document.addEventListener('keyup', this.keyPress);
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      this.$el.removeEventListener('click', this.handleClickEvent);
      document.removeEventListener('keyup', this.keyPress);
    }
  },
};
</script>
