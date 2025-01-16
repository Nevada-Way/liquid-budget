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

      const generatedFirms: Firm[] = this.financialService.generateFirms();
      // console.log('Firms fetched:', generatedFirms);

      this.recalcFirmsAndAnnualBudget(
        generatedFirms,
        this.signalTotalFirmBalance()
      );
      // this.recalcFirms(generatedFirms, this.signalTotalFirmBalance());

      // //////////////////////////////////
      // // Recalculating the annual budgets
      // //////////////////////////////////

      // this.annualBudgets = this.recalcAnnualBudget(
      //   this.signalTotalFirmBalance()
      // );

      console.log('annualBudgets = ', this.annualBudgets);
    } catch (error) {
      console.error('Error fetching firms:', error);
    }
  }

  recalcFirmsAndAnnualBudget(listOfFirms: Firm[], totalFirmsBalance: number) {
    //////////////////////////////////
    // Recalculating the equity value for each firm and each account in each firm
    //////////////////////////////////
    this.firms = this.recalcFirms(listOfFirms, totalFirmsBalance);

    //////////////////////////////////
    // Recalculating the annual budgets
    //////////////////////////////////

    this.annualBudgets = this.recalcAnnualBudget(totalFirmsBalance);
  }

  /**
   * Function : generateFirms()
   *   (1) What it does
   *         - Reads the raw hardcoded data and organizes it into array of Firm objects
   *   (2) Why we need it
   *         - The hardcode data is organized into an array of firms metadata and another
   *           array of accounts from the different firms.
   *         - What we need is for each firm a list of its accounts, so this function does that.
   *   (3) When to call it
   *         - Whenever we need to get the data for the firms.
   *         - This happens on initial page open and when changing the value in the input box
   *         - of the total value of assets from all firms, updating the value of signalTotalFirmBalance()
   *   (4) How it works in general / the main mechanisem
   *         - For each firm i create a Firm object, then those objects are arranged in an array and returned.
   *         - I need to manually update the account id in each Firm object so that it matches the accounts in
   *           file hardcoded-data.service.ts
   *
   * @param inpuGeneratedFirms
   * @param totalFirmBalance
   */
  recalcFirms(inpuGeneratedFirms: Firm[], totalFirmBalance: number): Firm[] {
    const resultUpdatedFirms = this.financialService.convertDataToActualValues(
      inpuGeneratedFirms,
      totalFirmBalance
    );

    return resultUpdatedFirms;
  }

  /**
   *
   */
  recalcAnnualBudget(totalBudget: number): AnnualBudget[] {
    //Loading the hardcoded budget plan (value in %) into budgetsList
    const budgetsList: AnnualBudget[] =
      this.hardcodedDataService.getAllBudgets();
    //console.log(`Budgets list length : ${budgetsList.length}`);
    ///////////////////////////////

    // Into the result lilst we calculate the real world numbers
    // by multiplying the % with the total equity of all firms (the function's input parameter)
    const resultAnnualBudget: AnnualBudget[] = budgetsList.map(
      (budget, index) => {
        const year = budget.year;
        const percentBudget =
          this.helperService.roundUpToNearestThousand(
            (budget.percentBudget * totalBudget) / 100
          ) / 1000;
        const percentRemaining =
          this.helperService.roundUpToNearestThousand(
            (budget.percentRemaining * totalBudget) / 100
          ) / 1000;

        return {
          year,
          percentBudget,
          percentRemaining,
        };
      }
    );

    return resultAnnualBudget;
  } //end func recalcAnnualBudget
}
