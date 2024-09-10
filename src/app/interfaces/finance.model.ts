export interface Account {
  name: string;
  id: string;
  type: string;
  comment: string;
  amount: number;
  currency: string;
  unitValue: number;
  maturity: string;
}

export interface Firm {
  name: string;
  id: string;
  type: string;
  accounts: Account[];
}
