import ErrorBlock from '~src/components/atoms/error-block/error-block';
import Block from '~src/utils/block';
import notFoundTemplate from './error400.tmpl.pug';
import '../index.scss';
import './error400.style.scss';
import '~src/components/atoms/error-block/error-block.style.scss';

export default class Error400 extends Block {
  constructor() {
    super('main');
  }

  protected getChildren(): Record<string, Block> {
    return {
      errorContent: new ErrorBlock({
        title: '404',
        subtitle: 'Не туда попали',
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
