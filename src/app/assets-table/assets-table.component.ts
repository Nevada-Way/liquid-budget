import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Account } from '../interfaces/finance.model';
import { HelperService } from '../services/helper.service';

@Component({
    selector: 'app-assets-table',
    imports: [MatTableModule, CommonModule],
    templateUrl: './assets-table.component.html',
    styleUrl: './assets-table.component.css'
})
export class AssetsTableComponent {
  // @Input() firmsDataInput: Firm[] = [];
  @Input() accountsDataInput: Account[] = [];
  constructor(public helperService: HelperService) {}

  displayedColumns: string[] = ['name', 'accountTotal'];
  // actualValueAccountTotal;
}
