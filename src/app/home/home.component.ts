import { Component, OnInit } from '@angular/core';
import { Account } from '../interfaces/account.model'; // Import the Account interface
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  accounts: Account[] = [];

  constructor(private accountService: AccountService) {}

  async ngOnInit() {
    try {
      const accounts = this.accountService.getAllAccounts();
      this.accounts = accounts;
      console.log('Accounts fetched:', accounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  }
}
