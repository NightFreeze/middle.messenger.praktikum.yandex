import { render } from '~src/utils/render';
import { isEqual } from '~src/utils/isEqual';

export default class Route {
  constructor(pathname, view, props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  leave() {
    if (this._block) {
      this._block.dispatchComponentWillUnmount();
    }
  }

  navigate(pathname) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  match(pathname) {
    return isEqual(pathname.split('?')[0], this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
    }

    render(this._props.rootQuery, this._block);
  }
}
