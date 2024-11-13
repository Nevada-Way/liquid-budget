import { Injectable } from '@angular/core';
import { Account, AnnualBudget, Firm } from '../interfaces/finance.model';

@Injectable({
  providedIn: 'root',
})
export class HardcodedDataService {
  constructor() {}

  //////////////////////////////////////////////////////
  ///// HARD CODED DATA  ///////////////////////////////
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
        name: 'OTSAR',
        id: 'FIRM-1',
        percentFromTotalFirms: 26.84,
        actualValueFirmTotal: 0,
        type: 'Investment Firm',
        accounts: [],
      },
      {
        name: 'IBI',
        id: 'FIRM-2',
        percentFromTotalFirms: 43.5,
        actualValueFirmTotal: 0,
        type: 'Financial Institution',
        accounts: [],
      },
      {
        name: 'MEITAV',
        id: 'FIRM-3',
        percentFromTotalFirms: 29.66,
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
        id: 'OTS-ACCT-1',
        percentFromAllFirmAccounts: 6.32,
        actualValueAccountTotal: 0,
        type: 'cash', // Cash (IL + FC)
        comment: 'Cash in local & Foreign Currency USD & EUR',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
      {
        name: 'ETF Money Fund',
        id: 'OTS-ACCT-2',
        percentFromAllFirmAccounts: 23.16,
        actualValueAccountTotal: 0,
        type: 'cash',
        comment: 'Money fund based on local bonds',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
      {
        name: 'Bond IL 1026',
        id: 'OTS-ACCT-3',
        percentFromAllFirmAccounts: 13.16,
        actualValueAccountTotal: 0,
        type: 'bond',
        comment: 'Bond fixed Oct 2026',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'Oct 15 2026 18:03:48 GMT-0700 Pacific Daylight Time',
      },
      {
        name: 'Savings Feb 2025',
        id: 'OTS-ACCT-4',
        percentFromAllFirmAccounts: 31.58,
        actualValueAccountTotal: 0,
        type: 'bond', // This is a savings account, i consider it a bond
        comment: 'Savings matures Feb 2025',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'Feb 5 2025 19:04:49 GMT-0700 Pacific Daylight Time',
      },
      {
        name: 'Pakam US bond 0325',
        id: 'OTS-ACCT-5',
        percentFromAllFirmAccounts: 25.79,
        actualValueAccountTotal: 0,
        type: 'bond',
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
        percentFromAllFirmAccounts: 2.6,
        actualValueAccountTotal: 0,
        type: 'cash',
        comment: 'For internal firm cashflow',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
      {
        name: 'ETF T3 Bill',
        id: 'IBI-ACCT-2',
        percentFromAllFirmAccounts: 46.75,
        actualValueAccountTotal: 0,
        type: 'cash',
        comment: 'Resets every 3 months',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
      {
        name: 'GovIL-0526',
        id: 'IBI-ACCT-3',
        percentFromAllFirmAccounts: 27.6,
        actualValueAccountTotal: 0,
        type: 'bond',
        comment: 'Changing intreset IL May 2026',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'May 1 2026',
      },
      {
        name: 'ETF SCHD',
        id: 'IBI-ACCT-4',
        percentFromAllFirmAccounts: 0.97,
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
        percentFromAllFirmAccounts: 3.57,
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
        percentFromAllFirmAccounts: 0.62,
        actualValueAccountTotal: 0,
        type: 'cash',
        comment: 'For internal firm cashflow',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
      {
        name: 'ETF T3 Bill',
        id: 'MTV-ACCT-2',
        percentFromAllFirmAccounts: 44.43,
        actualValueAccountTotal: 0,
        type: 'cash',
        comment: 'Resets every 3 months',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
      {
        name: 'ETF SGOV 3 Bill',
        id: 'MTV-ACCT-3',
        percentFromAllFirmAccounts: 32.49,
        actualValueAccountTotal: 0,
        type: 'cash',
        comment: 'Resets every 3 months',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
      {
        name: 'GovIL-0526',
        id: 'MTV-ACCT-4',
        percentFromAllFirmAccounts: 11.94,
        actualValueAccountTotal: 0,
        type: 'bond',
        comment: 'Changing intreset IL Oct 2026',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'October 3 2026',
      },
      {
        name: 'SPDR Gold GLD',
        id: 'MTV-ACCT-5',
        percentFromAllFirmAccounts: 10.51,
        actualValueAccountTotal: 0,
        type: 'gold',
        comment: 'Gold stock',
        unitAmount: 0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'liquid',
      },
    ];

    return allAccounts;
  }

  getAllBudgets(): AnnualBudget[] {
    const allBudgets: AnnualBudget[] = [
      {
        year: 2025,
        budget: 30,
        percentUsed: 0,
      },
      {
        year: 2026,
        budget: 45,
        percentUsed: 0,
      },
      {
        year: 2027,
        budget: 30,
        percentUsed: 0,
      },
      {
        year: 2028,
        budget: 57,
        percentUsed: 0,
      },
      {
        year: 2029,
        budget: 45,
        percentUsed: 0,
      },
      {
        year: 2030,
        budget: 57,
        percentUsed: 0,
      },
      {
        year: 2031,
        budget: 30,
        percentUsed: 0,
      },
    ];

    return allBudgets;
  }
}
