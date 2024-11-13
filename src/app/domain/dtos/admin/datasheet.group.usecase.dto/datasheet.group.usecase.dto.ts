import { DataSheetDto } from '@domain/dtos';

export interface DataSheetGroupDto {
    id?: string;
    name: string;
    datasheets: DataSheetDto[];
}
