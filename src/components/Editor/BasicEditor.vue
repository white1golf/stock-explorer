<template>
  <div>
    <div
      class="flex flex-row justify-center my-4 rounded-md border-solid border border-gray-200 bg-red-100"
    >
      공사중
    </div>
    <div
      class="editor flex flex-col max-w-md mx-auto rounded-md border-solid border border-gray-100 border-opacity-20 p-4 space-y-2 shadow-md"
    >
      <EditorContent class="editor__content" :editor="editor" />
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Editor/Icon';
import { Editor, EditorContent } from 'tiptap';
import {
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Strike,
  Underline,
  History,
  Placeholder,
} from 'tiptap-extensions';

import Doc from '@/tt/Doc';
import Title from '@/tt/Title';

export default {
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: new Editor({
        autoFocus: true,
        extensions: [
          new Doc(),
          new Title(),
          new Placeholder({
            showOnlyCurrent: false,
            emptyNodeText: (node) => {
              if (node.type.name === 'title') {
                return '제목은 여기다 와요';
              }
              return '내용을 입력해주세요';
            },
          }),
          new BulletList(),
          new ListItem(),
          new OrderedList(),
          new Bold(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
      }),
    };
  },
  beforeDestroy() {
    //에디터 destroy 시키는 거 잊지말길.
    this.editor.destroy();
  },
};
</script>
<style lang="postcss">
.menubar__button.is-active {
  @apply bg-indigo-500 text-white;
}
.menubar__button {
  @apply p-1 bg-white border-solid border-transparent rounded-md;
}

.editor *.is-empty:nth-child(1)::before,
.editor *.is-empty:nth-child(2)::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}
</style>