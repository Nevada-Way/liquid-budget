import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firm, DataDemo } from '../interfaces/finance.model'; // Import the Account interface
import { FinancialService } from '../services/financial.service';
import { AssetsTableComponent } from '../assets-table/assets-table.component';
declare var google: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AssetsTableComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  firms: Firm[] = [];

  constructor(private FinancialService: FinancialService) {}

  myParentData: DataDemo[] = [
    {
      id: 1,
      name: 'aaa',
    },
    {
      id: 2,
      name: '======',
    },
    {
      id: 3,
      name: 'ccc',
    },
  ];

  async ngOnInit() {
    try {
      const generatedFirms: Firm[] = this.FinancialService.generateDemoFirms();
      console.log('Firms fetched:', generatedFirms);

      this.firms = this.FinancialService.convertDataToActualValues(
        generatedFirms,
        620000
      );

      console.log('Actual value firms:', this.firms);
    } catch (error) {
      console.error('Error fetching firms:', error);
    }

    // =================================================
    // ==  G o o g l e   C h a r t s   S u p p o r t
    // =================================================

    // google.charts.load is the version name or number, as a string and also an optional object.
    // If you specify 'current', this causes the latest official release of Google Charts to be loaded.
    // If you want to try the candidate for the next release, use 'upcoming' instead.
    // The optional object can describe an array of packages.
    // Here we load the 'corechart' package ( which includes bar, column, line, area, stepped area, bubble, pie, donut, combo, candlestick, histogram, scatter).
    // We can list several packages in the array. You can find the package name in
    // the 'Loading' section of the documentation page for each chart.
    // URL : https://developers-dot-devsite-v2-prod.appspot.com/chart/interactive/docs/basic_load_libs

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  // This is the callback function we need to
  drawChart() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2],
    ]);

    // // Set chart options
    // var options = {
    //   title: 'How Much Pizza I Ate Last Night',
    //   width: 400,
    //   height: 300,
    // };

    // // Instantiate and draw our chart, passing in some options.
    // var chart = new google.visualization.PieChart(
    //   document.getElementById('chart_div')
    // );

    // chart.draw(data, options);

    // URL to table with all option properties :
    // https://developers-dot-devsite-v2-prod.appspot.com/chart/interactive/docs/gallery/piechart#configuration-options
    var options = {
      backgroundColor: 'white', //'transparent',
      title: '',
      pieHole: 0.4,
      enableInteractivity: false,
      pieSliceText: 'none',
      // legend: { position: 'none' },

      chartArea: {
        left: 20,
        top: 10,
        width: '90%',
        height: '90%',
        backgroundColor: 'yellow',
      },

      // width: 300,
      // height: 200,
      // is3D: true,
    };

    var chart = new google.visualization.PieChart(
      document.getElementById('donutchart')
    );
    chart.draw(data, options);
  }
}
