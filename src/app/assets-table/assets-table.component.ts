import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DataDemo, Firm } from '../interfaces/finance.model';

@Component({
  selector: 'app-assets-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './assets-table.component.html',
  styleUrl: './assets-table.component.css',
})
export class AssetsTableComponent {
  @Input() firmsDataInput: Firm[] = [];
  // @Input() myDataInput: DataDemo[] = [];

  // displayedColumns: string[] = ['id', 'name'];
  displayedColumns: string[] = ['id', 'name'];
}
