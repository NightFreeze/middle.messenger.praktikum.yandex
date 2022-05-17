import Block from './block';

// eslint-disable-next-line import/prefer-default-export
export const render = function (query: string, block: Block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
};
