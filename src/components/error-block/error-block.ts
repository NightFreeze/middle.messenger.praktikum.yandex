import { Block } from '../../utils/block';
import errorBlockTemplate from './error-block.tmpl.pug';

interface IErrorBlockProps {
    title: string;
    subtitle: string;
    linkHref: string;
    linkText: string;
}

export class ErrorBlock extends Block<IErrorBlockProps> {
    constructor(props: IErrorBlockProps) {
        super('div', props);
    }

    protected getAttributes() {
        return {
            class: 'error-block',
        };
    }

    public render() {
        return this.compile(errorBlockTemplate, {
            title: this.props.title,
            subtitle: this.props.subtitle,
            linkHref: this.props.linkHref,
            linkText: this.props.linkText,
        });
    }
}
