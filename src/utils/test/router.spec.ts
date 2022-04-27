import { expect } from "chai";
import { JSDOM } from 'jsdom';
import { Router } from '../router';

const dom = new JSDOM('', {url: "https://example.org/",});
global.window = dom.window
global.document = window.document;

class PageBlock {
    constructor() {
    }
    getContent() {
        return document.createElement('div')
    }
    dispatchComponentDidMount() {}
    dispatchComponentWillUnmount() {}
    render() {}
}

describe("Router", () => {
    const router = new Router('body')
    router
        .use('/', PageBlock)
        .use('/test', PageBlock)
        .start();

    it("Должен перейти на /test", () => {
        router.go('/test')

        expect(window.location.pathname).to.equal('/test');
    });
});
