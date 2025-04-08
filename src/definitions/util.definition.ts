export interface BaseTable {
    id: string;
    date_create: Date;
    date_update: Date;
    active: boolean;
}

export interface PayloadToken {
    id: string;
    name: string;
    lastName: string;
    document: string;
}