import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Firm, Account } from '../interfaces/finance.model';

@Component({
  selector: 'app-assets-table',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './assets-table.component.html',
  styleUrl: './assets-table.component.css',
})
export class AssetsTableComponent {
  // @Input() firmsDataInput: Firm[] = [];
  @Input() accountsDataInput: Account[] = [];

  displayedColumns: string[] = ['id', 'name', 'accountTotal'];
  // actualValueAccountTotal;
}
