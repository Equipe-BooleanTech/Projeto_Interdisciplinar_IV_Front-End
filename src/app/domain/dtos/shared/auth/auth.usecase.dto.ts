export interface InputSendLoginFormDto {
    email: string;
    password: string;
}

export interface OutputSendLoginFormDto {
    token?: string;
    id?: string;
    statusCode?: number;
}
