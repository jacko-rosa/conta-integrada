export interface PayloadTokenBacen {
    client_info: {
        client_id: string;
        compe_code: string;
        account_id?: string;
    },
    receptor_info: {
        client_id: string;
        roles: string[];
    },
    iat: number,
    exp: number,
}

export interface ResponseApi<T> {
    data: T;
    links?: {
        self: string;
        first: string;
        prev: string;
        next: string;
        last: string;
    }
    meta?: {
        totalRecords: number;
        totalPages: number;
        requestDateTime: string;
    }
}