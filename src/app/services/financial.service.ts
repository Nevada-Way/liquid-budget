import { Injectable } from '@angular/core';
import { Account, Firm, AnnualBudgetPlan } from '../interfaces/finance.model';
import { HardcodedDataService } from './hardcoded-data.service';
import { HelperService } from './helper.service';

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
  constructor(
    private hardcodedDataService: HardcodedDataService,
    private helperService: HelperService
  ) {}

  /**
   * Function : generateFirms()
   *   (1) What it does
   *         - Reads the raw hardcoded data and organizes it into array of Firm objects
   *   (2) Why we need it
   *         - The hardcode data is organized into an array of firms metadata and another
   *           array of accounts from the different firms.
   *         - What we need is for each firm a list of its accounts, so this function does that.
   *   (3) When to call it
   *         - Whenever we need to get the data for the firms.
   *         - This happens on initial page open and when changing the value in the input box
   *         - of the total value of assets from all firms, updating the value of signalTotalFirmBalance()
   *   (4) How it works in general / the main mechanisem
   *         - For each firm i create a Firm object, then those objects are arranged in an array and returned.
   *         - I need to manually update the account id in each Firm object so that it matches the accounts in
   *           file hardcoded-data.service.ts
   * @returns Firm[]
   */
  generateFirms(): Firm[] {
    // const demoFirmData: Firm[] = [];
    var generatedFirms: Firm[];

    const firm1Data: Firm = this.getFirmWithAccounts('FIRM-1', [
      'OTS-ACCT-1',
      'OTS-ACCT-2',
      'OTS-ACCT-3',
      'OTS-ACCT-4',
      'OTS-ACCT-5',
    ]);
    //console.log(firm1Data);

    const firm2Data: Firm = this.getFirmWithAccounts('FIRM-2', [
      'IBI-ACCT-1',
      'IBI-ACCT-2',
      'IBI-ACCT-3',
      'IBI-ACCT-4',
      'IBI-ACCT-5',
    ]);

    const firm3Data: Firm = this.getFirmWithAccounts('FIRM-3', [
      'MTV-ACCT-1',
      'MTV-ACCT-2',
      'MTV-ACCT-3',
      'MTV-ACCT-4',
      'MTV-ACCT-5',
    ]);

    // demoFirmData =
    generatedFirms = [firm1Data, firm2Data, firm3Data];
    return generatedFirms;
  }

  /**
   * Function : getFirmWithAccounts()
   *   (1) What it does
   *         - It injects a value into the 'accounts' property of a specific Firm.
   *   (2) Why we need it
   *         - The hardcode Firm data does not include the accounts.
   *         - So we need a way to inject those accounts as a value to the 'accounts' property.
   *   (3) When to call it
   *         - Whenever we need to get a Firm object including it's accounts.
   *         - This happens on initial page open and when changing the value in the input box
   *         - of the total value of assets from all firms, updating the value of signalTotalFirmBalance()
   *   (4) How it works in general / the main mechanisem
   *         - For each firm i create a Firm object, then those objects are arranged in an array and returned.
   *         - I need to manually update the account id in each Firm object so that it matches the accounts in
   *           file hardcoded-data.service.ts
   *
   * @param firmId
   * @param accountIds
   * @returns Firm // A single Firm object with an aray tha includes all
   *                  the users accounts in that firm
   */
  getFirmWithAccounts(firmId: string, accountIds: string[]): Firm {
    // Fetch the firm from array of firms
    const firm: Firm = this.fetchFirmById(firmId);

    //Populat the firm's accounts property with its correct accounts (using list of account ids)
    const accounts: Account[] = this.fetchAccountsByIds(accountIds);

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
  } // end getFirmWithAccounts

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
  } // end fetchFirmById

  fetchAccountsByIds(accountIds: string[]): Account[] {
    const allAccounts: Account[] = this.hardcodedDataService.getAllAccounts();
    //const selectedAccounts: Account[] = [];

    allAccounts.filter((account) => accountIds.includes(account.id));

    return allAccounts;
  } // end fetchAccountsByIds

  /**
   * Function : convertFirmsToRealValues()
   *   (1) What it does
   *         - Creates an array of Firm objects where the values of the equity are in real values and not %.
   *           FYI : The Firm object has two properties that hold a real (not %) value, one is the firm total
   *                 and the other is the total in each of the firm's account ( each firm has a list of accounts).
   *           The properties of a firm object that need real values are:
   *            (1) Firm.actualValueFirmTotal = Holds the real value of all the equity in the firm
   *            (2) Firm.account.actualValueAccountTotal = The real value of the equity of each account
   *           FYI : By default the hardcoded vauesfor these properties is 0.
   *
   *   (2) Why we need it
   *         - The hardcoded Firm equity values are in % and the real values are 0.
   *         - So this function converts them to real values based on the input parameters
   *            (1) originalFirms = An array of the firms with their % values
   *            (2) totalFirmsValue = The real value of equity in all the firms (sum of all firm total)
   *
   *   (3) When to call it
   *         - Whenever we need to get a list of firms with real values , not %.
   *         - This happens on initial page open and when changing the value in the input box
   *         - of the total value of assets from all firms, updating the value of signalTotalFirmBalance()
   *
   *   (4) How it works in general / the main mechanisem
   *         - For each Firm object we updated the default 0 value of firm.actualValueFirmTotal
   *           to a caclulated real value
   *         - Then in step-2 per firm we update each of its account's default 0 value
   *           of firm.account.actualValueAccountTotal to a caclulated real value.
   *
   * @param inputFirms
   * @param totalEquityOfAllFirms
   * @returns actualValueFirms : Firm[]
   */
  convertFirmsToRealValues(
    inputFirms: Firm[],
    totalEquityOfAllFirms: number
  ): Firm[] {
    //////////////////////////////////////////////
    // STEP - 1 : Focus on the Firm objects,
    //            Converting the default 0 value of firm.actualValueFirmTotal to a caclulated real value
    //            Mapping actual values of the firms total.
    //////////////////////////////////////////////
    const actualValueFirms: Firm[] = inputFirms.map((firm) => ({
      ...firm,
      actualValueFirmTotal:
        (firm.percentFromTotalFirms / 100) * totalEquityOfAllFirms,
    }));

    //////////////////////////////////////////////
    // STEP - 2 : Focus on the Accounts objects array of each Firm object
    //            Converting the default 0 value of firm.account.actualValueAccountTotal
    //            to a caclulated real value.
    //////////////////////////////////////////////
    actualValueFirms.forEach((firm) => {
      firm.accounts.forEach((account) => {
        account.actualValueAccountTotal =
          (account.percentFromAllFirmAccounts / 100) *
          firm.actualValueFirmTotal;
      });
    });
    return actualValueFirms;
  } // end convertFirmsToRealValues

  /**
   * Function : recalcAnnualBudgetPlan()
   *   (1) What it does
   *         - Calculates real values for 2 of the AnnualBudgetPlan properties.
   *         FTI : There is a bad practice use of the 2 properties, they have double use
   *               with different units. Their names are 'percentBudget' & ' percentRemaining'
   *               By default they have values with % units but after this recalcAnnualBudget()
   *               their values are real numbers and not %.
   *        TODO: In future refactor add 2 more properties to the AnnualBudgetPlan object
   *              that will hold the real values (by default values are 0) so that the values of the
   *              properties holding the % values are not overwritten.
   *   (2) Why we need it
   *         - The hardcoded annual budget plan is in % values, so we need to convert them to 
   *           real values based on the total budget value.
   *   (3) When to call it
   *         - Whenever we need to get an updated budget plan with real values (not %).
   *         - This happens on initial page open and when changing the value in the input box
   *         - of the total value of assets from all firms, updating the value of signalTotalFirmBalance().

   *   (4) How it works in general / the main mechanisem
   *         - First we load the hardcoded budget plan with % values
   *         - Then we recalc each of the % values to real values by multiplying by the total budget
   *           We also make the values user freindly by using helperService.roundUpToNearestThousand.
   *
   * @param totalBudget
   * @returns AnnualBudgetPlan[] // This is the recalculated plan with real numbers (not %)
   */
  recalcAnnualBudgetPlan(totalBudget: number): AnnualBudgetPlan[] {
    /////////////////////////////////////
    // STEP-1 : Loading the hardcoded budget plan, values are in % by default.
    /////////////////////////////////////
    const budgetsList: AnnualBudgetPlan[] =
      this.hardcodedDataService.getAllBudgets();

    /////////////////////////////////////
    // Step-2 : Into the result lilst we calculate the real values by multiplying
    //          the % with the total equity of all firms (the function's input parameter)
    /////////////////////////////////////
    const resultAnnualBudget: AnnualBudgetPlan[] = budgetsList.map(
      (budget, index) => {
        const year = budget.year;
        const percentBudget =
          this.helperService.roundUpToNearestThousand(
            (budget.percentBudget * totalBudget) / 100
          ) / 1000;
        const percentRemaining =
          this.helperService.roundUpToNearestThousand(
            (budget.percentRemaining * totalBudget) / 100
          ) / 1000;

        return {
          year,
          percentBudget,
          percentRemaining,
        };
      }
    );

    return resultAnnualBudget;
  } //end func recalcAnnualBudgetPlan

  /**
   * This function is given an array of a firm's accounts and returns then combines accounts
   * based on their type property, summing their actualValueAccountTotal values.
   * The result returned is an array of [string, number] because this is the format that the chart function needs
   * in order to display each the total value of each of the firms account by type of account.
   * @param theAccountsInFirm
   * @returns [string, number][]
   */
  agregateAccounts(theAccountsInFirm: Account[]): [string, number][] {
    //
    // The reduce method is applied to the theAccountsInFirm array which is an array of Account objects.
    // It iterates over each element (Account object) in the array and applies
    // the callback function (acc , cur) to accumulate a result.
    //
    const reducedAccounts = theAccountsInFirm.reduce((acc: Account[], cur) => {
      //
      // This line uses the find method to search for an existing account in the acc array with
      //  the same type as the current element (cur).
      //
      const existingItem = acc.find((item) => item.type === cur.type);

      // If it has found inside the acc (accumulator) array an existing account with the same type
      // then it adds the value of this account to the value of the account being accumulated (in the acc var).
      //
      if (existingItem) {
        existingItem.actualValueAccountTotal += cur.actualValueAccountTotal;
      } else {
        //
        // else , since the acc accumulator doesnt have an object with the type in
        // the cur object then we push this object into the acc.
        // Now the acc has an account with this new type, if in the next loops
        // another object has the same type it will not be pushed, instead its value
        // will be added to the value of this object that we are now pusinh here
        //
        acc.push({ ...cur }); // Create a copy to avoid mutating the original object
      }

      return acc;
    }, []);

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////  C O O N V E R T I N G   I N T O   A R R A Y    O F  [string, number]  //////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    // The final return value needs to be an aray of [string, number] because this is what
    // the chart function needs to display the aggregated values of all account types.

    // The reducedAccounts.map iterates over each element in the reducedAccounts array and
    // applies a callback function (a) => [a.type , a.the_total_value_for_all_accounts_of_this_type].
    // The result is an array of [string, number] arrays.
    // the string is the value of the 'type' property in the reducedAccounts objects.
    // the number is the value of the 'actualValueAccountTotal' property in the reducedAccounts objects.
    //   I also converted the value to a nice esthetic number rounded to the nearest 1000.
    // When value is returned I divide by 1000 to get a short number without trailing zeros.

    const myResult: [string, number][] = reducedAccounts.map((account) => [
      account.type,
      this.helperService.roundUpToNearestThousand(
        account.actualValueAccountTotal
      ) / 1000,
    ]);

    // console.log('=== Converted RESULT=========\n', myResult);
    return myResult;
  } // end agregateAccounts
} // end FinancialService class
