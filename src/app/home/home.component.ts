import { Component, OnInit, signal, WritableSignal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AnnualBudgetPlan, Firm } from '../interfaces/finance.model';
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
  signalTotalFirmBalance: WritableSignal<number> = signal(650000);

  firms: Firm[] = [];

  charts: any[] = []; // Array to store charts

  annualBudgets: AnnualBudgetPlan[] = [];

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

      const generatedFirms: Firm[] = this.financialService.generateFirms();
      // console.log('Firms fetched:', generatedFirms);

      // //////////////////////////////////
      // // Recalculating the firms & annual budgets
      // //////////////////////////////////
      this.recalcFirmsAndAnnualBudget(
        generatedFirms,
        this.signalTotalFirmBalance()
      );

      //console.log('annualBudgets = ', this.annualBudgets);
    } catch (error) {
      console.error('Error recalculating the firms & annual budgets :', error);
    }
  }

  /**
   * Function : recalcFirmsAndAnnualBudget()
   *   (1) What it does
   *         - Calculates real values for both the Firm list and the AnnualBudgetPlan list.
   *   (2) Why we need it
   *         - This function just wraps two other functions, the reason it exists is that because :
   *           (1) We need to call both functions in more than one place its easier when its wrapped as one.
   *           (2) We need to set the output of the functions in this class's properties :
   *               this.firms = Holds the list of firms to be displayed with the real values
   *               this.annualBudgets = Holds the budget plan to be displayed with the real values
   *   (3) When to call it
   *         - Whenever we need to get an updated firm list and budget plan with real values (not %).
   *         - This happens on initial page open and when changing the value in the input box
   *         - of the total value of assets from all firms, updating the value of signalTotalFirmBalance().

   *   (4) How it works in general / the main mechanisem
   *           We simply call the two functions from this one.
   *
   * @param listOfFirms
   * @param totalFirmsBalance
   */
  recalcFirmsAndAnnualBudget(listOfFirms: Firm[], totalFirmsBalance: number) {
    //////////////////////////////////
    // Recalculating the equity value for each firm and each account in each firm
    //////////////////////////////////
    this.firms = this.financialService.convertFirmsToRealValues(
      listOfFirms,
      totalFirmsBalance
    );

    //////////////////////////////////
    // Recalculating the annual budgets
    //////////////////////////////////

    this.annualBudgets =
      this.financialService.recalcAnnualBudgetPlan(totalFirmsBalance);
  } // recalcFirmsAndAnnualBudget()
}
