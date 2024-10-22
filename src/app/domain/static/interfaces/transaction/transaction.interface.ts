// transaction.model.ts
export interface Transaction {
    date: string;            // Data da transação
    description: string;     // Descrição da transação
    amount: number;          // Valor da transação
    type: 'income' | 'expense' | 'credit' | 'debit'; // Tipo de transação (entrada ou saída)
}
