import { AuthService } from './auth/auth.service';
import { ProspectionService } from './prospection/prospection.service';
import { DataTransferService } from './shared/data-transfer/data-transfer.service';
import { FormValidateService } from './shared/form-validate/form-validate.service';
import { SidebarService } from './shared/sidebar/sidebar.service';

export * from './prospection/prospection.service';
export * from './auth/auth.service';
export * from './shared/data-transfer/data-transfer.service';
export * from './shared/form-validate/form-validate.service';
export * from './shared/sidebar/sidebar.service';

export const services = [
    ProspectionService,
    AuthService,
    DataTransferService,
    FormValidateService,
    SidebarService,
];
