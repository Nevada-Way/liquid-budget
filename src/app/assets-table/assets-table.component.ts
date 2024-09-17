import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-assets-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './assets-table.component.html',
  styleUrl: './assets-table.component.css',
})
export class AssetsTableComponent {
  dataSource = [
    {
      id: 1,
      name: 'aaa',
    },
    {
      id: 2,
      name: 'bbb',
    },
    {
      id: 3,
      name: 'ccc',
    },
  ];

  displayedColumns: string[] = ['id', 'name'];
}
