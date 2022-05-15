import { Block } from '~src/utils/block';
import { Router } from '~src/utils/router';
import { API_HOST } from '~src/utils/constants';
import avatarTemplate from './avatar.tmpl.pug';
import unionImage from '../../../static/images/union.svg';
import { connect } from '~src/utils/connect';

interface IAvatarProps {
    avatar: string;
    changeHref?: string;
}

const withAvatar = connect((state) => ({
    avatar: state.user?.avatar
        ? `${API_HOST}/resources${state.user.avatar}`
        : '',
}));


class Avatar extends Block<IAvatarProps> {
    router: Router;

    constructor(props) {
        super('div', props);

        this.router = new Router('');
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'profile-avatar',
        };
    }

    protected getEvents(): Record<string, (e: Event) => void> {
        return {
            click: (event) => {
                event.preventDefault();

                if (this.props?.changeHref)
                    this.router.go(this.props.changeHref);
            },
        };
    }

    public render(): DocumentFragment {
        const { avatar, changeHref } = this.props;

        return this.compile(avatarTemplate, { avatar, unionImage, changeHref });
    }
}

export default withAvatar(Avatar);
