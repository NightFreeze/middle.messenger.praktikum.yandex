import { Block } from '~src/utils/block';
import { Router } from '~src/utils/router';
import leftNavigationButtonTemplate from './left-navigation-button.tmpl.pug';
import leftArrowImage from '../../../static/images/left-arrow.svg';

interface ILeftNavigationButtonProps {
    path?: string;
}

class LeftNavigationButton extends Block<ILeftNavigationButtonProps> {
    router: Router;

    constructor(props: ILeftNavigationButtonProps) {
        super('button', props);

        this.router = new Router('');
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'left-navigation-button',
        };
    }

    protected getEvents(): Record<string, (e: Event) => void> {
        return {
            click: (event) => {
                event.preventDefault();
                if (this.props?.path) {
                    this.router.go(this.props.path);
                } else {
                    this.router.back();
                }
            },
        };
    }

    public render(): DocumentFragment {
        return this.compile(leftNavigationButtonTemplate, { leftArrowImage });
    }
}

export default LeftNavigationButton;
