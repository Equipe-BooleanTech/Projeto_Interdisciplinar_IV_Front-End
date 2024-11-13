import { ListByPeriodDto } from '@domain/dtos';

export interface RevenueDto {
    amount: number;
    saleDate: string;
}

export interface ExpenseDto {
    amount: number;
    paymentDate: string;
    category: string;
    description: string;
}

export interface CashFlowDto extends ListByPeriodDto {
    totalRevenue: number;
    totalExpenses: number;
    finalBalance: number;
}
