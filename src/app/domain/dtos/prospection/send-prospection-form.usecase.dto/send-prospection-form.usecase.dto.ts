export interface OutputSendProspectionFormDto {
    statusCode: number;
    message?: string;
}

export interface InputSendProspectionFormDto {
    fullName: string;
    email: string;
    phone: string;
    enterprise?: string;
    message?: string;
}
