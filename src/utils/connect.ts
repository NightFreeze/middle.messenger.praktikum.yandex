import store, { StoreEvents } from './store';
import { Block } from './block';
import { Indexed } from './types';

export const connect = (mapStateToProps: (state: Indexed) => Indexed) => {
    return function (Component: new (props: Indexed) => Block) {
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
