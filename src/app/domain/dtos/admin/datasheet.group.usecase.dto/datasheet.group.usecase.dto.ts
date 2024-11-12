import { DatasheetDto } from '@domain/dtos';

export interface DataSheetGroupDto {
    name: string;
    datasheets: DatasheetDto[];
}
