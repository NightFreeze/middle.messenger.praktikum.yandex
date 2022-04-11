import ErrorBlock from '~src/components/atoms/error-block/error-block';
import Block from '~src/utils/block';
import notFoundTemplate from './error500.tmpl.pug';
import '../../styles/index.scss';
import './error500.style.scss';
import '~src/components/atoms/error-block/error-block.style.scss';

export default class Error500 extends Block {
  constructor() {
    super('main');
  }

  protected getChildren(): Record<string, Block> {
    return {
      errorContent: new ErrorBlock({
        title: '500',
        subtitle: 'Мы уже фиксим',
        linkHref: '/chats',
        linkText: 'Назад к чатам',
      }),
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'main',
    };
  }

  public render(): DocumentFragment {
    return this.compile(notFoundTemplate);
  }
}
