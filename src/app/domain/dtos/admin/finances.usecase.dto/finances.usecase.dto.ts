import { ListByPeriodDto } from '@domain/dtos';

export interface RevenueDto {
    amount: number;
    paymentDate: string;
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

export interface FinanceGroupDto {
    id?: string;
    name: string;
    revenues: RevenueDto[];
    expenses: ExpenseDto[];
    createdAt: string;
}