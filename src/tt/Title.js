import { Node } from 'tiptap';

export default class Title extends Node {
  get name() {
    return 'title';
  }

  get schema() {
    return {
      content: 'inline*',
      parseDOM: [
        {
          tag: 'h3',
        },
      ],
      toDOM: () => ['h3', 0],
    };
  }
}
