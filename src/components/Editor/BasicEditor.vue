<template>
  <div>
    <div
      class="flex flex-row justify-center my-4 rounded-md border-solid border border-gray-200 bg-red-100"
    >
      공사중
    </div>
    <div class="submit">
      <span class="draft border border-solid" @click.prevent="draft"
        >임시 저장</span
      ><span class="border border-solid ml-1 send" @click.prevent="publish"
        >퍼블리시</span
      >
    </div>
    <div
      class="editor flex flex-col max-w-md mx-auto rounded-md border-solid border border-gray-100 border-opacity-20 p-4 space-y-2 shadow-md"
    >
      <EditorMenuBubble
        :editor="editor"
        :keep-in-bounds="keepInBounds"
        v-slot="{ commands, isActive, menu }"
      >
        <div
          class="menububble"
          :class="{ 'is-active': menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
        >
          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <Icon name="bold" />
          </button>

          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <Icon name="italic" />
          </button>

          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            <span>Title</span>
          </button>
          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <Icon name="quote" />
          </button>
        </div>
      </EditorMenuBubble>
      <EditorContent class="editor__content" :editor="editor" />
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Editor/Icon';
import { Editor, EditorContent, EditorMenuBubble } from 'tiptap';
import {
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Strike,
  Underline,
  History,
  Placeholder,
  Blockquote,
} from 'tiptap-extensions';

import Doc from '@/tt/Doc';
import Title from '@/tt/Title';

import { save } from '@/services/articleAPI';

export default {
  components: {
    EditorContent,
    EditorMenuBubble,
    Icon,
  },
  data() {
    return {
      content: String,
      keepInBounds: true,
      editor: new Editor({
        autoFocus: true,
        extensions: [
          new Doc(),
          new Title(),
          new Heading({
            levels: [1, 2],
          }),
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
          new Blockquote(),
        ],
        //Update 될 때 마다
        onUpdate: ({ getJSON, getHTML }) => {
          this.json = getJSON();
          this.html = getHTML();
        },
      }),
      json: '',
      html: '',
    };
  },

  methods: {
    async draft() {
      //console.log(JSON.stringify(this.json));
      const response = await save('draft', JSON.stringify(this.json));
      if (response.status === 200) {
        return {
          code: response.status,
          message: 'save draft',
        };
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    },

    async publish() {
      //console.log(this.html);
      const response = await save('publish', JSON.stringify(this.html));
      if (response.status === 200) {
        return {
          code: response.status,
          message: 'save publish',
        };
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    },
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