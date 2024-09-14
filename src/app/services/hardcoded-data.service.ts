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
        name: 'MEITAV',
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
        name: 'Money Fund',
        id: 'OTS-ACCT-1',
        percentFromAllFirmAccounts: 0.2486,
        actualValueAccountTotal: 0,
        type: 'MoneyFund',
        comment: 'A money fund for inflation protection',
        unitAmount: 44000.0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'Tue Aug 13 2024 16:01:46 GMT-0700 Pacific Daylight Time',
      },
      {
        name: 'Gov bond',
        id: 'OTS-ACCT-2',
        percentFromAllFirmAccounts: 0.1412,
        actualValueAccountTotal: 0,
        type: 'Bond',
        comment: 'My second investment account',
        unitAmount: 25000.0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'Wed Aug 14 2024 17:02:47 GMT-0700 Pacific Daylight Time',
      },
      {
        name: 'Savings',
        id: 'OTS-ACCT-3',
        percentFromAllFirmAccounts: 0.339,
        actualValueAccountTotal: 0,
        type: 'Savings',
        comment: 'My third investment account',
        unitAmount: 60000.0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'Feb 5 2025 18:03:48 GMT-0700 Pacific Daylight Time',
      },
      {
        name: 'USD Pakam',
        id: 'OTS-ACCT-4',
        percentFromAllFirmAccounts: 0.2712,
        actualValueAccountTotal: 0,
        type: 'Cash',
        comment: 'USD 1 year Pakam translated to NIS',
        unitAmount: 48000.0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'March 1 2025 19:04:49 GMT-0700 Pacific Daylight Time',
      },
      ////////////////////////
      ///  IBI
      {
        name: 'Just Cash',
        id: 'IBI-ACCT-1',
        percentFromAllFirmAccounts: 0.35,
        actualValueAccountTotal: 0,
        type: 'Cash',
        comment: 'Intermediate flow',
        unitAmount: 1000.0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'Tue Aug 13 2024 16:01:46 GMT-0700 Pacific Daylight Time',
      },
      {
        name: 'Gov-changing-intreset',
        id: 'IBI-ACCT-2',
        percentFromAllFirmAccounts: 0.35,
        actualValueAccountTotal: 0,
        type: 'Bond',
        comment: 'My second investment account',
        unitAmount: 85000.0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'May 1 2026',
      },
      {
        name: 'Treas-3-Month-Bill',
        id: 'IBI-ACCT-3',
        percentFromAllFirmAccounts: 0.35,
        actualValueAccountTotal: 0,
        type: 'Bond',
        comment: 'My second investment account',
        unitAmount: 27000.0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'Nov 02 2024',
      },
      {
        name: 'Treas-4.25',
        id: 'IBI-ACCT-4',
        percentFromAllFirmAccounts: 0.35,
        actualValueAccountTotal: 0,
        type: 'Bond',
        comment: 'My second investment account',
        unitAmount: 57000.0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'Sep 30 2027',
      },
      {
        name: 'Treas-3.75',
        id: 'IBI-ACCT-5',
        percentFromAllFirmAccounts: 0.35,
        actualValueAccountTotal: 0,
        type: 'Bond',
        comment: 'My second investment account',
        unitAmount: 98000.0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'Oct 3 2030',
      },
      {
        name: 'VOO-ETF',
        id: 'IBI-ACCT-6',
        percentFromAllFirmAccounts: 0.35,
        actualValueAccountTotal: 0,
        type: 'ETF',
        comment: 'My second investment account',
        unitAmount: 3000.0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'Any Time',
      },
      //////////////////////////////
      ////   MEITAV
      {
        name: 'Just cash',
        id: 'MTV-ACCT-1',
        percentFromAllFirmAccounts: 0.35,
        actualValueAccountTotal: 0,
        type: 'Cash',
        comment: 'Sitting cash for maintenance',
        unitAmount: 2000.0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'Any Time',
      },
      {
        name: 'Gov-Fixed-Intrest 1026',
        id: 'MTV-ACCT-2',
        percentFromAllFirmAccounts: 0.35,
        actualValueAccountTotal: 0,
        type: 'Bond',
        comment: 'My fourth investment account',
        unitAmount: 25000.0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'October 3 2026',
      },
      {
        name: 'Treas-3.25',
        id: 'MTV-ACCT-3',
        percentFromAllFirmAccounts: 0.35,
        actualValueAccountTotal: 0,
        type: 'Bond',
        comment: 'bla bla',
        unitAmount: 88000.0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'November 15 2028',
      },
      {
        name: 'Treas-Oct-2024',
        id: 'MTV-ACCT-4',
        percentFromAllFirmAccounts: 0.35,
        actualValueAccountTotal: 0,
        type: 'Bond',
        comment: 'Short term (few months) bond',
        unitAmount: 77000.0,
        currency: 'YAR',
        unitValue: 1,
        maturity: 'Oct 3 2024',
      },
    ];

    return allAccounts;
  }
}
