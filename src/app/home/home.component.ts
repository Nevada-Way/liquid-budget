import { Component, OnInit, signal, WritableSignal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Firm } from '../interfaces/finance.model';
import { FinancialService } from '../services/financial.service';
import { AssetsTableComponent } from '../assets-table/assets-table.component';
import { ChartComponent } from '../chart/chart.component';
import { HelperService } from '../services/helper.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AssetsTableComponent, ChartComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  signalTotalFirmBalance: WritableSignal<number> = signal(100000); //709000

  firms: Firm[] = [];

  charts: any[] = []; // Array to store charts

  constructor(
    public financialService: FinancialService,
    public helperService: HelperService
  ) {}

  async ngOnInit() {
    try {
      const generatedFirms: Firm[] = this.financialService.generateDemoFirms();
      console.log('Firms fetched:', generatedFirms);

      this.recalcFirms(generatedFirms, this.signalTotalFirmBalance());
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
