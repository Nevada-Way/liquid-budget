import { Injectable } from '@angular/core';
import { Account, Firm } from '../interfaces/finance.model';

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
        percentFromTotalFirms: 0.35,
        actualValueFirmTotal: 0,
        type: 'Investment Firm',
        accounts: [],
      },
      {
        name: 'IBI',
        id: 'FIRM-2',
        percentFromTotalFirms: 0.35,
        actualValueFirmTotal: 0,
        type: 'Financial Institution',
        accounts: [],
      },
      {
        name: 'Meitav',
        id: 'FIRM-3',
        percentFromTotalFirms: 0.3,
        actualValueFirmTotal: 0,
        type: 'Brokerage',
        accounts: [],
      },
    ];
    return allFirms;
  }

  getAllAccounts(): Account[] {
    const allAccounts: Account[] = [
      {
        name: 'First Ots Account',
        id: 'OTS-ACCT-1',
        percentFromAllFirmAccounts: 0.2486,
        actualValueAccountTotal: 0,
        type: 'MoneyFund',
        comment: 'A money fund for inflation protection',
        unitAmount: 44000.0,
        currency: 'NIS',
        unitValue: 1,
        maturity: 'Tue Aug 13 2024 16:01:46 GMT-0700 Pacific Daylight Time',
      },
      {
        name: 'Second Ots Account',
        id: 'OTS-ACCT-2',
        percentFromAllFirmAccounts: 0.1412,
        actualValueAccountTotal: 0,
        type: 'Bond',
        comment: 'My second investment account',
        unitAmount: 25000.0,
        currency: 'NIS',
        unitValue: 1,
        maturity: 'Wed Aug 14 2024 17:02:47 GMT-0700 Pacific Daylight Time',
      },
      {
        name: 'Third Ots Account',
        id: 'OTS-ACCT-3',
        percentFromAllFirmAccounts: 0.339,
        actualValueAccountTotal: 0,
        type: 'Savings',
        comment: 'My third investment account',
        unitAmount: 60000.0,
        currency: 'NIS',
        unitValue: 1,
        maturity: 'Feb 5 2025 18:03:48 GMT-0700 Pacific Daylight Time',
      },
      {
        name: 'My Fourth Account',
        id: 'OTS-ACCT-4',
        percentFromAllFirmAccounts: 0.2712,
        actualValueAccountTotal: 0,
        type: 'Cash',
        comment: 'USD 1 year Pakam translated to NIS',
        unitAmount: 48000.0,
        currency: 'NIS',
        unitValue: 1,
        maturity: 'March 1 2025 19:04:49 GMT-0700 Pacific Daylight Time',
      },
      ////////////////////////
      {
        name: '436',
        id: 'ACCT-5',
        percentFromAllFirmAccounts: 0.35,
        actualValueAccountTotal: 0,
        type: 'Stock',
        comment: 'My first investment account',
        unitAmount: 1000.0,
        currency: 'USD',
        unitValue: 50.0,
        maturity: 'Tue Aug 13 2024 16:01:46 GMT-0700 Pacific Daylight Time',
      },
      {
        name: '437',
        id: 'ACCT-6',
        percentFromAllFirmAccounts: 0.35,
        actualValueAccountTotal: 0,
        type: 'Bond',
        comment: 'My second investment account',
        unitAmount: 2000.0,
        currency: 'EUR',
        unitValue: 100.0,
        maturity: 'Wed Aug 14 2024 17:02:47 GMT-0700 Pacific Daylight Time',
      },
      {
        name: '438',
        id: 'ACCT-7',
        percentFromAllFirmAccounts: 0.35,
        actualValueAccountTotal: 0,
        type: 'MoneyFund',
        comment: 'My third investment account',
        unitAmount: 3000.0,
        currency: 'GBP',
        unitValue: 150.0,
        maturity: 'Thu Aug 15 2024 18:03:48 GMT-0700 Pacific Daylight Time',
      },
      {
        name: '439',
        id: 'ACCT-8',
        percentFromAllFirmAccounts: 0.35,
        actualValueAccountTotal: 0,
        type: 'Cash',
        comment: 'My fourth investment account',
        unitAmount: 4000.0,
        currency: 'CAD',
        unitValue: 200.0,
        maturity: 'Fri Aug 16 2024 19:04:49 GMT-0700 Pacific Daylight Time',
      },
    ];

    return allAccounts;
  }
}
