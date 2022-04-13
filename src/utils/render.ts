import { Block } from './block';

export const render = function (query: string, block: Block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());

    block.dispatchComponentDidMount();

    return root;
}
