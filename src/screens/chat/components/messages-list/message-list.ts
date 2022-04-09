import Block from '~src/utils/block';
import messagesListTemplate from './messages-list.tmpl.pug';

const messages = [
  {
    type: 'date',
    content: '19 июня',
  },
  {
    type: 'text',
    time: '11:56',
    content: '<p> Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.</p> <p> Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.</p>',
  },
  {
    type: 'me',
    time: '12:00',
    content: 'Круто!',
  },
];

export default class MessageList extends Block {
  public render(): DocumentFragment {
    return this.compile(messagesListTemplate, { messages });
  }
}
