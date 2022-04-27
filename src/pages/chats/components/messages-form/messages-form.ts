import { Block } from '~src/utils/block';
import fileImage from '../../../../../static/images/file.svg';
import sendImage from '../../../../../static/images/send.svg';
import messagesFormTemplate from './messages-form.tmpl.pug';
import './messages-form.scss';

class MessagesForm extends Block {
    constructor(props) {
        super('form', props);
    }

    protected getEvents(): Record<string, (e: Event) => void> {
        return this.props?.events || {};
    }

    public render(): DocumentFragment {
        return this.compile(messagesFormTemplate, { fileImage, sendImage });
    }
}

export default MessagesForm;
