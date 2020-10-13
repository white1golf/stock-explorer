import Vue from 'vue';

export const afterEachGlobal = (to, from) => {
  const title =
    to.meta.path === '/' ? to.meta.title : `${to.meta.title} | Autumn`;
  // TODO: 서비스 url 선정 및 등록. 아래는 임시.
  const url = `https://autumn.com${to.meta.path}`;
  const description = to.meta.subtitle.replace(/<(.|\n)*?>/g, '');
  const updates = [
    { tag: 'meta[property="og:title"]', value: title },
    { tag: 'meta[property="og:description"]', value: description },
    { tag: 'link[rel="canonical"]', attr: 'href', value: url },
    { tag: 'meta[property="og:url"]', value: url },
  ];

  window.document.documentElement.scrollTop = 0;
  window.document.title = title;

  updates.forEach(item => {
    if (!item.value) return;
    document
      .querySelector(item.tag)
      .setAttribute(item.attr || 'content', item.value);
  });

  Vue.prototype.$eventHub.$emit('navigate', to.meta);
};
