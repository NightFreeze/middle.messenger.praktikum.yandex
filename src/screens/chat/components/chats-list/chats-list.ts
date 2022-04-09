import Block from '~src/utils/block';
import chatsListTemplate from './chats-list.tmpl.pug';

const chats = [
  {
    name: 'Андрей',
    time: '10:49',
    message: 'Изображение',
    count: '2',
    isMe: false,
  },
  {
    name: 'Киноклуб',
    time: '10:49',
    message: 'стикер',
    count: '',
    isMe: true,
  },
];

export default class ChatsList extends Block {
  public render(): DocumentFragment {
    return this.compile(chatsListTemplate, { chats });
  }
}
