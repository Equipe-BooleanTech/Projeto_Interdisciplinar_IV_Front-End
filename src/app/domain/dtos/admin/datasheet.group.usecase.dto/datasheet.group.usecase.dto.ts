import { DataSheetDto } from '@domain/dtos';

export interface DataSheetGroupDto {
    name: string;
    datasheets: DataSheetDto[];
}
