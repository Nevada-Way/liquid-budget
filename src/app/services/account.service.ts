import { Injectable } from '@angular/core';
import { Account } from '../interfaces/account.model'; // Import the Account interface

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor() {}

  getAllAccounts(): Account[] {
    const allAccounts: Account[] = [
      {
        sourceName: 'My First Account',
        id: 'ACCT-1',
        type: 'Stock',
        comment: 'My first investment account',
        amount: 1000.0,
        currency: 'USD',
        unitValue: 50.0,
        maturity: 'Tue Aug 13 2024 16:01:46 GMT-0700 Pacific Daylight Time',
      },
      {
        sourceName: 'My Second Account',
        id: 'ACCT-2',
        type: 'Bond',
        comment: 'My second investment account',
        amount: 2000.0,
        currency: 'EUR',
        unitValue: 100.0,
        maturity: 'Wed Aug 14 2024 17:02:47 GMT-0700 Pacific Daylight Time',
      },
      {
        sourceName: 'My Third Account',
        id: 'ACCT-3',
        type: 'Mutual Fund',
        comment: 'My third investment account',
        amount: 3000.0,
        currency: 'GBP',
        unitValue: 150.0,
        maturity: 'Thu Aug 15 2024 18:03:48 GMT-0700 Pacific Daylight Time',
      },
      {
        sourceName: 'My Fourth Account',
        id: 'ACCT-4',
        type: 'Real Estate',
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
