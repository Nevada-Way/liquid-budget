import { Injectable } from '@angular/core';
import { Account, AnnualBudgetPlan, Firm } from '../interfaces/finance.model';

@Injectable({
  providedIn: 'root',
})
export class HardcodedDataService {
  constructor() {}

  //////////////////////////////////////////////////////
  ///// HARD CODED DATA  ///////////////////////////////
  //////////////////////////////////////////////////////
  /**
   * Function : getALlFirms()
   *   (1) What it does
   *         - Returns an array of the hardcoded Firm items.
   *         - FYI: These firm items do not have a list of the accounts, these
   *                are associated onl via the service generateFirms()
   *   (2) Why we need it
   *         - We need the data of each firm. This tells us the id of the firm
   *         - wich we later use to link accounts to it using the generateFirms() service.
   *   (3) When to call it
   *         - Whenever we need to get the firm data itself, regardless of the accounts value.
   *         - It is called by the function fetchFirmById() where we return a specific
   *           Firm object WITHOUT a value in the accounts property.
   *   (4) How it works in general / the main mechanisem
   *         - Creats a hardcoded array and retruns it.
   *
   *    FYI : To get a firm object with its associated accounts you need
   *          to call getFirmWithAccounts(firm-id , array-of-account-ids)
   * @returns Firm[] an array of firms only (without the list of accounts)
   */
  getALlFirms(): Firm[] {
    const allFirms: Firm[] = [
      {
        name: 'OTSAR',
        id: 'FIRM-1',
        percentFromTotalFirms: 31.14,
        actualValueFirmTotal: 0,
        type: 'Investment Firm',
        accounts: [],
      },
      {
        name: 'IBI',
        id: 'FIRM-2',
        percentFromTotalFirms: 37.24,
        actualValueFirmTotal: 0,
        type: 'Financial Institution',
        accounts: [],
      },
      {
        name: 'MEITAV',
        id: 'FIRM-3',
        percentFromTotalFirms: 31.62,
        actualValueFirmTotal: 0,
        type: 'Brokerage',
        accounts: [],
      },
    ];
    return allFirms;
  }

  getAllAccounts(): Account[] {
    const allAccounts: Account[] = [
      ////////////////////////
      ///  OTSAR
      {
        name: 'Cash local & FC',
        // Cash (IL + FC)
        id: 'OTS-ACCT-1',
        percentFromAllFirmAccounts: 4.16,
        actualValueAccountTotal: 0,
        type: 'CS', // CS = CASH
        comment: 'Cash in local & Foreign Currency USD & EUR',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
      {
        name: 'ETF Money Fund',
        id: 'OTS-ACCT-2',
        percentFromAllFirmAccounts: 7.47,
        actualValueAccountTotal: 0,
        type: 'CS', // CS = CASH
        comment: 'Money fund based on local bonds',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
      {
        name: 'Bond IL 1026',
        id: 'OTS-ACCT-3',
        percentFromAllFirmAccounts: 12.627,
        actualValueAccountTotal: 0,
        type: 'BD', // BD=BOND
        comment: 'Bond fixed Oct 2026',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'Oct 15 2026 18:03:48 GMT-0700 Pacific Daylight Time',
      },
      {
        name: 'Saving 0225',
        // This is a savings account, i consider it a bond
        id: 'OTS-ACCT-4',
        percentFromAllFirmAccounts: 51.96,
        actualValueAccountTotal: 0,
        type: 'BD', // BD=BOND
        comment: 'Savings matures Feb 2025',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'Feb 5 2025 19:04:49 GMT-0700 Pacific Daylight Time',
      },
      {
        name: 'Pakam bnd 0325',
        id: 'OTS-ACCT-5',
        percentFromAllFirmAccounts: 23.8,
        actualValueAccountTotal: 0,
        type: 'BD', // BD=BOND
        comment: 'A USD Short term holding matures Mar 30 2025',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'Wed Aug 14 2024 17:02:47 GMT-0700 Pacific Daylight Time',
      },
      ////////////////////////
      ///  IBI
      {
        name: 'Cashflow',
        id: 'IBI-ACCT-1',
        percentFromAllFirmAccounts: 1.65,
        actualValueAccountTotal: 0,
        type: 'CS', // CS = CASH
        comment: 'For internal firm cashflow',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
      {
        name: 'ETF T3 Bill',
        id: 'IBI-ACCT-2',
        percentFromAllFirmAccounts: 57.39,
        actualValueAccountTotal: 0,
        type: 'CS', // CS = CASH
        comment: 'Resets every 3 months',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
      {
        name: 'GovIL-0526',
        id: 'IBI-ACCT-3',
        percentFromAllFirmAccounts: 35.17,
        actualValueAccountTotal: 0,
        type: 'BD', // BD=BOND
        comment: 'Changing intreset IL May 2026',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'May 1 2026',
      },
      {
        name: 'ETF SCHD',
        id: 'IBI-ACCT-4',
        percentFromAllFirmAccounts: 1.3,
        actualValueAccountTotal: 0,
        type: 'S&P',
        comment: 'Bit more stable than S&P',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
      {
        name: 'ETF VOO',
        id: 'IBI-ACCT-5',
        percentFromAllFirmAccounts: 4.48,
        actualValueAccountTotal: 0,
        type: 'S&P',
        comment: 'A Vanguard ETF Tracking the S&P',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
      //////////////////////////////
      ////   MEITAV
      {
        name: 'Cashflow',
        id: 'MTV-ACCT-1',
        percentFromAllFirmAccounts: 1.22,
        actualValueAccountTotal: 0,
        type: 'CS', // CS = CASH
        comment: 'For internal firm cashflow',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
      {
        name: 'ETF T3 Bill',
        id: 'MTV-ACCT-2',
        percentFromAllFirmAccounts: 43.8,
        actualValueAccountTotal: 0,
        type: 'CS', // CS = CASH
        comment: 'Resets every 3 months',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
      {
        name: 'ETF SGOV 3 Bill',
        id: 'MTV-ACCT-3',
        percentFromAllFirmAccounts: 32.27,
        actualValueAccountTotal: 0,
        type: 'CS', // CS = CASH
        comment: 'Resets every 3 months',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
      {
        name: 'GovIL-1026',
        id: 'MTV-ACCT-4',
        percentFromAllFirmAccounts: 11.94,
        actualValueAccountTotal: 0,
        type: 'BD', // BD=BOND
        comment: 'Changing intreset IL Oct 2026',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'October 3 2026',
      },
      {
        name: 'SPDR Gold GLD',
        id: 'MTV-ACCT-5',
        percentFromAllFirmAccounts: 10.77,
        actualValueAccountTotal: 0,
        type: 'GD', // GD = GOLD
        comment: 'Gold stock',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
    ];

    return allAccounts;
  }

  /**
   * Function : getAllBudgets()
   *   (1) What it does
   *         - Returns an array of the hardcoded AnnualBudget objects.
   *         - Each object is for a specific year and its values are in percentage 
   *         - from the total of all the assets (sum of equity of all the firms).
   *   (2) Why we need it
   *         - This data is the budget plan, we display in in the budget plan table.
   *   (3) When to call it
   *         - Whenever we need to get the firm data itself, regardless of the accounts value.
   *         - It is called by the function fetchFirmById() where we return a specific
   *           Firm object WITHOUT a value in the accounts property.
   *   (4) How it works in general / the main mechanisem
   *         - Creats a hardcoded array and retruns it.
   * 
   *    FYI : To get a firm object with its associated accounts you need
   *          to call getFirmWithAccounts(firm-id , array-of-account-ids)
  /**
   *
   * @returns AnnualBudget[] , Each item in the array is a budget for a specific year and
   *                           the remainder from the total assets.
   *                           Values are in percentage from total value of the assets.
   */
  getAllBudgets(): AnnualBudgetPlan[] {
    const allBudgets: AnnualBudgetPlan[] = [
      {
        year: 2025,
        percentBudget: 10.79,
        percentRemaining: 99.38,
      },
      {
        year: 2026,
        percentBudget: 10.794,
        percentRemaining: 77.81,
      },
      {
        year: 2027,
        percentBudget: 7.7,
        percentRemaining: 70.1,
      },
      {
        year: 2028,
        percentBudget: 10.79,
        percentRemaining: 59.32,
      },
      {
        year: 2029,
        percentBudget: 7.7,
        percentRemaining: 51.62,
      },
      {
        year: 2030,
        percentBudget: 10.79,
        percentRemaining: 40.83,
      },
      {
        year: 2031,
        percentBudget: 7.7,
        percentRemaining: 33.13,
      },
      {
        year: 2032,
        percentBudget: 10.79,
        percentRemaining: 22.34,
      },
      {
        year: 2033,
        percentBudget: 7.7,
        percentRemaining: 14.64,
      },
      {
        year: 2034,
        percentBudget: 10.79,
        percentRemaining: 3.85,
      },
      {
        year: 2035,
        percentBudget: 3.85,
        percentRemaining: 0,
      },
    ];

    return allBudgets;
  }
}
