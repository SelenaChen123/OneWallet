export interface AccountData {
  bankName: string;
  accounts: {
    accountNumber: string;
    accountType: string;
    balance: number;
  }[];
}

export interface RawBillData {
  dueDate: string;
  bills: {
    amountDue: number;
    description: string;
    isPaid: boolean;
  }[];
}

export interface BillData extends Omit<RawBillData, 'dueDate'> {
  dueDate: Date
}

export interface RawTransactionData {
  date: string;
  transactions: {
    accountNumber: string;
    bankName: string;
    amount: number;
    description: string;
    isWithdrawal: boolean;
  }[];
}

export interface TransactionData extends Omit<RawTransactionData, 'date'> {
  date: Date;
}

export interface RawCreditScoreData {
  reportDate: string;
  creditScore: number;
  reportingAgency: string;
}

export interface CreditScoreData extends Omit<RawCreditScoreData, 'reportDate'> {
  reportDate: Date;
}

export interface FinancialAdvisorData {
  bankName: string;
  advisor: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface RawPaymentData {
  dueDate: string;
  bills: {
    amountDue: number;
    description: string;
  }[];
}

export interface PaymentData extends Omit<RawPaymentData, 'dueDate'> {
  dueDate: Date
}

export interface RawAppData {
  name: string;
  accountData: AccountData[];
  billData: RawBillData[];
  transactionData: RawTransactionData[];
  creditScoreData: RawCreditScoreData[];
  financialAdvisorData: FinancialAdvisorData[];
  paymentData: RawPaymentData[];
}

export interface AppData {
  name: string;
  accountData: AccountData[];
  billData: BillData[];
  transactionData: TransactionData[];
  creditScoreData: CreditScoreData[];
  financialAdvisorData: FinancialAdvisorData[];
  paymentData: PaymentData[];
}
