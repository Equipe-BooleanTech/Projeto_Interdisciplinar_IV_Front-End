import { DataTransferService } from './data-transfer/data-transfer.service';
import { FormValidateService } from './form-validate/form-validate.service';
import { SidebarService } from './sidebar/sidebar.service';

export * from './data-transfer/data-transfer.service';
export * from './form-validate/form-validate.service';
export * from './sidebar/sidebar.service';

export const services = [
    DataTransferService,
    FormValidateService,
    SidebarService,
];