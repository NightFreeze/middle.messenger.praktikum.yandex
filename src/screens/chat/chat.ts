import Block from '~src/utils/block';
import ChatsList from './components/chats-list/chats-list';
import MessageList from './components/messages-list/message-list';
import chatsTemplate from './chats.tmpl.pug';

import '../index.scss';
import './chats.style.scss';
import './components/chats-list/chats-list.style.scss';
import './components/messages-list/messages-list.style.scss';

import fileImage from '../../../static/images/file.svg';
import sendImage from '../../../static/images/send.svg';
import hamburgerImage from '../../../static/images/hamburger.svg';
import arrowImage from '../../../static/images/arrow.svg';

export default class Chat extends Block {
  constructor() {
    super('div');

    this.setState({ activeChatId: null });
  }

  protected getChildren(): Record<string, Block> {
    const chatsList = new ChatsList();
    const messagesList = new MessageList();

    return {
      chatsList,
      messagesList,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'chats-wrapper',
    };
  }

  public render(): DocumentFragment {
    return this.compile(chatsTemplate, {
      hamburgerImage, sendImage, fileImage, arrowImage,
    });
  }
}
