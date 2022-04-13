export enum MethodTypes {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

interface IOptions {
    headers?: Record<string, string>,
    method: MethodTypes,
    data?: Document | XMLHttpRequestBodyInit;
    timeout?: number;
}

function queryStringify(queryObj: Record<string, unknown>) {
    const keys = Object.keys(queryObj);
    return keys.reduce((result, key, index) => `${result}${key}=${queryObj[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export class HTTPTransport {
    public get = (url: string, options: IOptions = { method: MethodTypes.GET }) => {
        this.request(url, { ...options, method: MethodTypes.GET });
    };

    public put = (url: string, options: IOptions = { method: MethodTypes.GET }) => {
        this.request(url, { ...options, method: MethodTypes.PUT });
    };

    public post = (url: string, options: IOptions = { method: MethodTypes.GET }) => {
        this.request(url, { ...options, method: MethodTypes.POST });
    };

    public delete = (url: string, options: IOptions = { method: MethodTypes.GET }) => {
        this.request(url, { ...options, method: MethodTypes.DELETE });
    };

    public request = (url: string, options: IOptions, queryObj: Record<string, unknown> = {}) => {
        const {
            data, method, timeout, headers,
        } = options;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            let fullUrl = url;

            if ([MethodTypes.GET, MethodTypes.POST].includes(method) && queryObj) {
                fullUrl = `${url}${queryStringify(queryObj)}`;
            }

            xhr.open(method, fullUrl);

            if (timeout) {
                xhr.timeout = timeout;
            }

            if (headers) {
                Object.keys(headers).forEach((key) => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.onload = resolve;

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.ontimeout = reject;

            if (method === MethodTypes.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
