import { Component, OnInit, signal, WritableSignal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AnnualBudget, Firm } from '../interfaces/finance.model';
import { FinancialService } from '../services/financial.service';
import { AssetsTableComponent } from '../assets-table/assets-table.component';
import { ChartComponent } from '../chart/chart.component';
import { HelperService } from '../services/helper.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { HardcodedDataService } from '../services/hardcoded-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AssetsTableComponent,
    ChartComponent,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  signalTotalFirmBalance: WritableSignal<number> = signal(100000); //709000

  firms: Firm[] = [];

  charts: any[] = []; // Array to store charts

  annualBudgets: AnnualBudget[] = [];

  constructor(
    public financialService: FinancialService,
    public helperService: HelperService,
    public hardcodedDataService: HardcodedDataService
  ) {}

  async ngOnInit() {
    try {
      //////////////////////////////////
      // Loading and calculating the firm's data
      //////////////////////////////////

      const generatedFirms: Firm[] = this.financialService.generateDemoFirms();
      // console.log('Firms fetched:', generatedFirms);

      this.recalcFirms(generatedFirms, this.signalTotalFirmBalance());

      //////////////////////////////////
      // Loading the annual budgets
      //////////////////////////////////
      this.annualBudgets = this.hardcodedDataService.getAllBudgets();

      console.log('Budgets list :', this.annualBudgets);
    } catch (error) {
      console.error('Error fetching firms:', error);
    }
  }

  recalcFirms(inpuGeneratedFirms: Firm[], totalFirmBalance: number) {
    this.firms = this.financialService.convertDataToActualValues(
      inpuGeneratedFirms,
      totalFirmBalance
    );
  }
}
