import { Block } from '~src/utils/block';
import { connect } from '~src/utils/connect';
import messagesListTemplate from './messages-list.tmpl.pug';
import './messages-list.scss';

interface IMessagesListProps {
    messages: [];
}

const withMessages = connect((state) => ({
    messages: state?.chatsMessages && state?.chatId
        ? state.chatsMessages[state.chatId]
        : [],
}));

class MessagesList extends Block<IMessagesListProps> {
    constructor(props: IMessagesListProps) {
        super('div', props);
    }

    public render(): DocumentFragment {
        return this.compile(messagesListTemplate, { messages: this.props.messages });
    }
}

export default withMessages(MessagesList);
