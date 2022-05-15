import { ErrorBlock } from '~src/components/error-block/error-block';
import { Block } from '~src/utils/block';
import notFoundTemplate from './server-error.tmpl.pug';
import '../index.scss';
import './server-error.scss';
import '../../components/error-block/error-block.scss';

export class ServerError extends Block {
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
