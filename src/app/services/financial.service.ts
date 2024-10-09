import { Injectable } from '@angular/core';
import { Account, Firm, PseudoAccount } from '../interfaces/finance.model';
import { HardcodedDataService } from './hardcoded-data.service';

interface AccountTotal {
  accountType: string;
  totalValue: number;
}
interface Person {
  price: number;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class FinancialService {
  constructor(private hardcodedDataService: HardcodedDataService) {}

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

    const firms: Firm[] = this.hardcodedDataService.getALlFirms();

    const foundFirm = firms.find((firm) => firm.id === firmId);

    if (foundFirm) {
      return foundFirm;
    } else {
      return emptyFirm;
    }
  }

  fetchAccountsByIds(accountIds: string[]): Account[] {
    const allAccounts: Account[] = this.hardcodedDataService.getAllAccounts();
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

  agregateAccounts(theAccountsInFirm: Account[]): PseudoAccount[] {
    const result = theAccountsInFirm.reduce((acc: Account[], cur, index) => {
      const existingItem = acc.find((item) => item.type === cur.type);

      console.log('=== index : ', index);
      console.log('=== cur : ', cur);
      console.log('=== acc-1 : ', acc);
      // acc.push(cur.name);
      if (existingItem) {
        existingItem.actualValueAccountTotal += cur.actualValueAccountTotal;
      } else {
        acc.push({ ...cur }); // Create a copy to avoid mutating the original object
      }

      return acc;
    }, []);

    const myResult: any[] = result.map((account) => [
      account.type,
      this.roundUpToNearestThousand(account.actualValueAccountTotal),
    ]);

    console.log('=== Converted RESULT=========\n', myResult);
    return myResult;
  }

  roundUpToNearestThousand(inputNumber: number): number {
    return Math.ceil(inputNumber / 1000) * 1000;
  }
}
