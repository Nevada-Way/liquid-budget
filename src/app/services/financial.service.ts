import { Injectable } from '@angular/core';
import { Account, Firm } from '../interfaces/finance.model';
import { HardcodedDataService } from './hardcoded-data.service';

interface AccountTotal {
  accountType: string;
  totalValue: number;
}
@Injectable({
  providedIn: 'root',
})
export class FinancialService {
  constructor(private HardcodedDataService: HardcodedDataService) {}

  generateDemoFirms(): Firm[] {
    // const demoFirmData: Firm[] = [];
    var demoFirmData: Firm[];

    const firm1Data: Firm = this.getFirmWithAccounts('FIRM-1', [
      'OTS-ACCT-1',
      'OTS-ACCT-2',
      'OTS-ACCT-3',
      'OTS-ACCT-4',
      'OTS-ACCT-5',
    ]);
    console.log(firm1Data);

    const firm2Data: Firm = this.getFirmWithAccounts('FIRM-2', [
      'IBI-ACCT-1',
      'IBI-ACCT-2',
      'IBI-ACCT-3',
      'IBI-ACCT-4',
      'IBI-ACCT-5',
      'IBI-ACCT-6',
    ]);
    const firm3Data: Firm = this.getFirmWithAccounts('FIRM-3', [
      'MTV-ACCT-1',
      'MTV-ACCT-2',
      'MTV-ACCT-3',
      'MTV-ACCT-4',
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
    // console.log('Mason: getFirmWithAccounts.accountIds =', accountIds);
    // console.log(
    //   'Mason: getFirmWithAccounts.fetchAccountsByIds.accounts =',
    //   accounts
    // );
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
      percentFromTotalFirms: 0,
      actualValueFirmTotal: 0,
      type: '',
      accounts: [],
    };

    const firms: Firm[] = this.HardcodedDataService.getALlFirms();

    const foundFirm = firms.find((firm) => firm.id === firmId);

    if (foundFirm) {
      return foundFirm;
    } else {
      return emptyFirm;
    }
  }

  fetchAccountsByIds(accountIds: string[]): Account[] {
    const allAccounts: Account[] = this.HardcodedDataService.getAllAccounts();
    //const selectedAccounts: Account[] = [];

    allAccounts.filter((account) => accountIds.includes(account.id));

    return allAccounts;
  }

  convertDataToActualValues(
    originalFirms: Firm[],
    totalFirmsValue: number
  ): Firm[] {
    // Mapping actual values of the firms total
    const actualValueFirms: Firm[] = originalFirms.map((firm) => ({
      ...firm,
      actualValueFirmTotal:
        (firm.percentFromTotalFirms / 100) * totalFirmsValue,
    }));

    // Mapping the actual values of each account in the firm
    actualValueFirms.forEach((firm) => {
      firm.accounts.forEach((account) => {
        account.actualValueAccountTotal =
          (account.percentFromAllFirmAccounts / 100) *
          firm.actualValueFirmTotal;
      });
    });
    return actualValueFirms;
  }

  agregateAccounts(): any[] {
    // const accountsOfFirm: Account[] = this.firmDataInput.accounts;

    const reply: AccountTotal[] = [
      { accountType: 'cash', totalValue: 3 },
      { accountType: 'stock', totalValue: 6 },
      { accountType: 'bond', totalValue: 5 },
      { accountType: 'saving', totalValue: 2 },
    ];

    // This code does the following:
    // (1) reply.map() maps the reply array:
    //     It iterates over each object in the reply array using the map method.
    //
    // (2) ({ accountType, totalValue }) Destructures object properties:
    //     For each object, it destructures the accountType and totalValue properties.
    //
    // (3) Creates a new array:  => [ accountType, totalValue,]
    //
    //     It creates a new array containing the destructured properties,
    //     wrapped in another array (to match the format expected by data.addRows).
    //
    const lala: any[] = reply.map(({ accountType, totalValue }) => [
      accountType,
      totalValue,
    ]);

    // console.log('==========');
    // accountsOfFirm.forEach((account) => {
    //   //console.log(account); // Logs the entire Account object
    //   console.log(account.type); // Logs only the name property
    //   console.log(account.actualValueAccountTotal); // Logs only the name property
    // });

    return lala;
  }
}
