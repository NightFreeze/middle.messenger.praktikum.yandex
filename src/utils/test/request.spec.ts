import { expect } from 'chai';
import * as sinon from 'sinon';
import { HTTPTransport } from '../request';

const HTTPInstance = new HTTPTransport('');

describe('HTTP', () => {
    const requests: sinon.SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        (global as any).XMLHttpRequest = sinon.useFakeXMLHttpRequest();
        const xhr: sinon.SinonFakeXMLHttpRequestStatic = sinon.useFakeXMLHttpRequest();

        xhr.onCreate = ((request: sinon.SinonFakeXMLHttpRequest): void => {
            requests.push(request);
        });
    });

    afterEach(() => {
        (global as any).XMLHttpRequest.restore();
        requests.length = 0;
    });

    it('Должен отправить с методом GET', () => {
        HTTPInstance.get('/');

        expect(requests[0].method).to.eq('GET');
    });

    it('Должен отправить с методом POST', () => {
        HTTPInstance.post('/');

        expect(requests[0].method).to.eq('POST');
    });

    it('Должен отправить с методом DELETE', () => {
        HTTPInstance.delete('/', {});

        expect(requests[0].method).to.eq('DELETE');
    });

    it('Должен отправить с методом PUT', () => {
        HTTPInstance.put('/', {});

        expect(requests[0].method).to.eq('PUT');
    });
});
