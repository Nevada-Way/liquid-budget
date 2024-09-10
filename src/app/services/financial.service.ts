import { Injectable } from '@angular/core';
import { Account, Firm } from '../interfaces/finance.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor() {}

  generateDemoFirms(): Firm[] {
    // const demoFirmData: Firm[] = [];
    var demoFirmData: Firm[];

    const firm1Data: Firm = this.getFirmWithAccounts('FIRM-1', [
      'ACCT-1',
      'ACCT-2',
      'ACCT-3',
    ]);
    console.log(firm1Data);

    const firm2Data: Firm = this.getFirmWithAccounts('FIRM-2', [
      'ACCT-4',
      'ACCT-5',
      'ACCT-6',
    ]);
    const firm3Data: Firm = this.getFirmWithAccounts('FIRM-3', [
      'ACCT-7',
      'ACCT-8',
    ]);

    // demoFirmData =
    demoFirmData = [firm1Data, firm2Data, firm3Data];
    return demoFirmData;
  }

  getFirmWithAccounts(firmId: string, accountIds: string[]): Firm {
    // Fetch the firm from array of firms
    const firm: Firm = this.fetchFirmById(firmId);

    //Populat the firm's accounts property with its correct accounts (using list of account ids)
    const accounts: Account[] = this.fetchAccountsByIds(accountIds);
    console.log('Mason: getFirmWithAccounts.accountIds =', accountIds);
    console.log(
      'Mason: getFirmWithAccounts.fetchAccountsByIds.accounts =',
      accounts
    );
    // Filter accounts to only include those with matching IDs
    const filteredAccounts = accounts.filter((account) =>
      accountIds.includes(account.id)
    );

    // Create a new firm object with the filtered accounts
    const result: Firm = {
      ...firm,
      accounts: filteredAccounts,
    };

    return result;
  }

  fetchFirmById(firmId: string): Firm {
    const emptyFirm: Firm = {
      name: '',
      id: '',
      type: '',
      accounts: [],
    };

    const firms: Firm[] = this.getALlFirms();

    const foundFirm = firms.find((firm) => firm.id === firmId);

    if (foundFirm) {
      return foundFirm;
    } else {
      return emptyFirm;
    }
  }

  fetchAccountsByIds(accountIds: string[]): Account[] {
    const allAccounts: Account[] = this.getAllAccounts();
    //const selectedAccounts: Account[] = [];

    allAccounts.filter((account) => accountIds.includes(account.id));

    return allAccounts;
  }

  //////////////////////////////////////////////////////
  ///// HARD CODED DATA  /////////////////////////////////////////////////
  //////////////////////////////////////////////////////

  /**
   *
   * These hard coded 'firm' array items dont have accounts associated with them
   * To get a firm object with specific accounts need to
   *  call getFirmWithAccounts(firm-id , array-of-account-ids)
   * @returns Firm[] an array of firms with hardcoded property valuee
   */
  getALlFirms(): Firm[] {
    const allFirms: Firm[] = [
      {
        name: 'Bank-1',
        id: 'FIRM-1',
        type: 'Investment Firm',
        accounts: [],
      },
      {
        name: 'IBI',
        id: 'FIRM-2',
        type: 'Financial Institution',
        accounts: [],
      },
      {
        name: 'Meitav',
        id: 'FIRM-3',
        type: 'Brokerage',
        accounts: [],
      },
    ];
    return allFirms;
  }

  getAllAccounts(): Account[] {
    const allAccounts: Account[] = [
      {
        name: 'My First Account',
        id: 'ACCT-1',
        type: 'Stock',
        comment: 'My first investment account',
        amount: 1000.0,
        currency: 'USD',
        unitValue: 50.0,
        maturity: 'Tue Aug 13 2024 16:01:46 GMT-0700 Pacific Daylight Time',
      },
      {
        name: 'My Second Account',
        id: 'ACCT-2',
        type: 'Bond',
        comment: 'My second investment account',
        amount: 2000.0,
        currency: 'EUR',
        unitValue: 100.0,
        maturity: 'Wed Aug 14 2024 17:02:47 GMT-0700 Pacific Daylight Time',
      },
      {
        name: 'My Third Account',
        id: 'ACCT-3',
        type: 'MoneyFund',
        comment: 'My third investment account',
        amount: 3000.0,
        currency: 'GBP',
        unitValue: 150.0,
        maturity: 'Thu Aug 15 2024 18:03:48 GMT-0700 Pacific Daylight Time',
      },
      {
        name: 'My Fourth Account',
        id: 'ACCT-4',
        type: 'Cash',
        comment: 'My fourth investment account',
        amount: 4000.0,
        currency: 'CAD',
        unitValue: 200.0,
        maturity: 'Fri Aug 16 2024 19:04:49 GMT-0700 Pacific Daylight Time',
      },
      ////////////////////////
      {
        name: '436',
        id: 'ACCT-5',
        type: 'Stock',
        comment: 'My first investment account',
        amount: 1000.0,
        currency: 'USD',
        unitValue: 50.0,
        maturity: 'Tue Aug 13 2024 16:01:46 GMT-0700 Pacific Daylight Time',
      },
      {
        name: '437',
        id: 'ACCT-6',
        type: 'Bond',
        comment: 'My second investment account',
        amount: 2000.0,
        currency: 'EUR',
        unitValue: 100.0,
        maturity: 'Wed Aug 14 2024 17:02:47 GMT-0700 Pacific Daylight Time',
      },
      {
        name: '438',
        id: 'ACCT-7',
        type: 'MoneyFund',
        comment: 'My third investment account',
        amount: 3000.0,
        currency: 'GBP',
        unitValue: 150.0,
        maturity: 'Thu Aug 15 2024 18:03:48 GMT-0700 Pacific Daylight Time',
      },
      {
        name: '439',
        id: 'ACCT-8',
        type: 'Cash',
        comment: 'My fourth investment account',
        amount: 4000.0,
        currency: 'CAD',
        unitValue: 200.0,
        maturity: 'Fri Aug 16 2024 19:04:49 GMT-0700 Pacific Daylight Time',
      },
    ];

    return allAccounts;
  }
}
