import Block from './block';

export default function (query: string, block: Block) {
  const root = document.querySelector(query);

  if (root) {
    // @ts-ignore
    root.appendChild(block.getContent());
  }

  block.dispatchComponentDidMount();

  return root;
}
