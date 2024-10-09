import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firm, DataDemo } from '../interfaces/finance.model';
import { FinancialService } from '../services/financial.service';
import { AssetsTableComponent } from '../assets-table/assets-table.component';
import { ChartComponent } from '../chart/chart.component';
// declare var google: any;
// import * as google from 'google-charts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AssetsTableComponent, ChartComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  firms: Firm[] = [];
  charts: any[] = []; // Array to store charts

  constructor(private FinancialService: FinancialService) {}

  async ngOnInit() {
    try {
      const generatedFirms: Firm[] = this.FinancialService.generateDemoFirms();
      console.log('Firms fetched:', generatedFirms);

      this.firms = this.FinancialService.convertDataToActualValues(
        generatedFirms,
        620000
      );

      console.log('Actual value firms:', this.firms);

      // this.FinancialService.test(this.firms[0].accounts);
    } catch (error) {
      console.error('Error fetching firms:', error);
    }
  }
}
