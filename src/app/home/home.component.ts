import { Component, OnInit } from '@angular/core';
import { Firm, Account } from '../interfaces/finance.model'; // Import the Account interface
import { FinancialService } from '../services/financial.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // accounts: Account[] = [];
  firms: Firm[] = [];

  constructor(private FinancialService: FinancialService) {}

  async ngOnInit() {
    try {
      const generatedFirms: Firm[] = this.FinancialService.generateDemoFirms();
      console.log('Firms fetched:', generatedFirms);

      this.firms = this.FinancialService.convertDataToActualValues(
        generatedFirms,
        100
      );

      console.log('Actual value firms:', this.firms);
    } catch (error) {
      console.error('Error fetching firms:', error);
    }
  }
}
