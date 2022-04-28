import { ErrorBlock } from '~src/components/error-block/error-block';
import { Block } from '~src/utils/block';
import notFoundTemplate from './not-found.tmpl.pug';
import '../index.scss';
import './not-found.scss';
import '../../components/error-block/error-block.scss';

export class NotFound extends Block {
    constructor() {
        super('main');
    }

    protected getChildren(): Record<string, Block> {
        return {
            errorContent: new ErrorBlock({
                title: '404',
                subtitle: 'Не туда попали',
                linkHref: '/messenger',
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
