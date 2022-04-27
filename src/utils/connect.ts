import store, { StoreEvents } from './store';
import { Block } from './block';
import { TRequestApi } from './types';

interface IStore {
    signupReq: TRequestApi;
    createChatReq: TRequestApi;
    profileReq: TRequestApi;
    user: {
        id: number;
        first_name: string;
        second_name: string;
        display_name: string;
        login: string;
        email: string;
        phone: string;
        avatar: string;
    };
}

export const connect = (mapStateToProps: (state: IStore) => IStore) => {
    return function (Component: typeof Block) {
        return class extends Component {
            constructor(props) {
                super({ ...props, ...mapStateToProps(store.getState()) });

                store.on(StoreEvents.Updated, () => {
                    this.setProps({ ...mapStateToProps(store.getState()) });
                });
            }
        };
    };
};
