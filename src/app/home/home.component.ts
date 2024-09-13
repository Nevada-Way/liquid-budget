import { Component, OnInit } from '@angular/core';
import { Firm, Account } from '../interfaces/finance.model'; // Import the Account interface
import { AccountService } from '../services/financial.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // accounts: Account[] = [];
  // firms: Firm[] = [];

  constructor(private accountService: AccountService) {}

  async ngOnInit() {
    try {
      const generatedFirms: Firm[] = this.accountService.generateDemoFirms();
      // this.firms = generatedFirms;
      console.log('Firms fetched:', generatedFirms);
    } catch (error) {
      console.error('Error fetching firms:', error);
    }
  }
}
