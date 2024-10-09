export interface Firm {
  name: string;
  id: string;
  type: string;
  accounts: Account[];
  percentFromTotalFirms: number; //This is used to calc the actual value of investment sum in a firm.
  // SInce the actual value of the assets in in each is private we wont use it in the hardcoded public code.
  // So instead we use %, when the user inputs the total value of all firms, then the actual total of each firm
  // can be calculated
  // Only knowing the total of all assets will give the real value.
  actualValueFirmTotal: number; // This is the actual value of the sum in the firm, it can be used to store
  // the calculated value based on the % and the total of all the firms
}
export interface Account {
  name: string;
  id: string;
  type: string;
  comment: string;
  currency: string;
  unitAmount: number;
  unitValue: number;
  percentFromAllFirmAccounts: number;
  actualValueAccountTotal: number;
  maturity: string;
}

export interface DataDemo {
  id: number;
  name: string;
}

export interface PseudoAccount {
  typeOfAccount: string;
  totalValue: number;
}
