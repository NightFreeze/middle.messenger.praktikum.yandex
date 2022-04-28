// @ts-nocheck
import { render } from '~src/utils/render';
import { isEqual } from '~src/utils/isEqual';

class Route {
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

export class Router {
    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname, block) {
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery,
        });

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (event) => {
            this._onRoute(event.currentTarget.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname) {
        let route = this.getRoute(pathname);
        if (!route) {
            route = this.getRoute('*');
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(route, pathname);
    }

    go(pathname, state = {}) {
        this.history.pushState(state, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname) {
        return this.routes.find((route) => route.match(pathname));
    }
}
