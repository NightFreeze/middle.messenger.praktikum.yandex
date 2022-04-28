export enum MethodTypes {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

interface IOptions<TData> {
    headers?: Record<string, string>;
    method: MethodTypes;
    data?: TData | Document | XMLHttpRequestBodyInit;
    timeout?: number;
}

type TOptionsWithoutMethod<TData> = Omit<IOptions<TData>, 'method'>;

type TXMLHttpResponse<TRes> = XMLHttpRequest & {
    response: TRes;
};

function queryStringify(queryObj: Record<string, unknown>) {
    const keys = Object.keys(queryObj);
    return keys.reduce(
        (result, key, index) =>
            `${result}${key}=${queryObj[key]}${
                index < keys.length - 1 ? '&' : ''
            }`,
        '?'
    );
}

export class HTTPTransport {
    host: string;

    constructor(host = '') {
        this.host = host;
    }

    public get = <TReq, TRes>(
        url: string,
        options: TOptionsWithoutMethod<TReq> = {}
    ): Promise<TXMLHttpResponse<TRes>> => {
        return this.request<TReq, TRes>(
            url,
            { ...options, method: MethodTypes.GET },
            options?.timeout
        );
    };

    public put = <TReq, TRes>(
        url: string,
        options: TOptionsWithoutMethod<TReq> = {}
    ): Promise<TXMLHttpResponse<TRes>> => {
        return this.request<TReq, TRes>(
            url,
            { ...options, method: MethodTypes.PUT },
            options?.timeout
        );
    };

    public post = <TReq, TRes>(
        url: string,
        options: TOptionsWithoutMethod<TReq> = {}
    ): Promise<TXMLHttpResponse<TRes>> => {
        return this.request<TReq, TRes>(
            url,
            { ...options, method: MethodTypes.POST },
            options?.timeout
        );
    };

    public delete = <TReq, TRes>(
        url: string,
        options: TOptionsWithoutMethod<TReq> = {}
    ): Promise<TXMLHttpResponse<TRes>> => {
        return this.request<TReq, TRes>(
            url,
            { ...options, method: MethodTypes.DELETE },
            options?.timeout
        );
    };

    request = <TReq, TRes>(
        url: string,
        options: IOptions<TReq> = { method: MethodTypes.GET },
        timeout = 5000
    ): Promise<TXMLHttpResponse<TRes>> => {
        const {
            headers = { 'content-type': 'application/json' },
            method,
            data,
        } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === MethodTypes.GET;
            const fullUrl = `${this.host}${url}`;
            const curData =
                data && headers['content-type'] === 'application/json'
                    ? JSON.stringify(data)
                    : data;

            xhr.open(
                method,
                isGet && !!data ? `${fullUrl}${queryStringify(data)}` : fullUrl
            );

            Object.keys(headers).forEach((key) => {
                if (headers[key]) xhr.setRequestHeader(key, headers[key]);
            });

            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.withCredentials = true;
            xhr.responseType = 'json';

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !curData) {
                xhr.send();
            } else {
                xhr.send(curData);
            }
        });
    };
}
