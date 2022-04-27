export type Indexed<T = any> = {
    [key in string]: T;
};

export type TRequestApi = {
    isLoading: boolean;
    errorMessage: string;
};
