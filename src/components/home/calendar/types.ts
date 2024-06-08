
export interface Transaction {
  id: number;
  date: string;
  amount: number;
  content: string;
  category: string;
  isIncome: 'INCOME' | 'EXPENDITURE';
}

export interface Transactions {
  [key: string]: {
    income: number;
    expense: number;
  };
}