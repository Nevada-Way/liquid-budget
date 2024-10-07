import { Component, Input } from '@angular/core';
import { Firm, Account } from '../interfaces/finance.model';
import { FinancialService } from '../services/financial.service';
declare var google: any;

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  @Input() firmDataInput: Firm = {} as Firm;
  chartId: string = '';
  // accountsOfFirm: Account[] = [];

  constructor(private financialService: FinancialService) {}

  async ngOnInit() {
    this.chartId = `chart-${this.firmDataInput.id}`;

    try {
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

      // This google.charts.setOnLoadCallback() function is used to specify a callback function that
      // will be executed once the Google Charts library has been fully loaded and initialized.
      // The setOnLoadCallback function is essential for ensuring that your chart-related
      // code doesn't run before the Google Charts library is ready.
      //
      // The this.drawChart value is the specific callback function that we want to execute once loading completed.
      //
      // The .bind(this) method of the callback function (in our case drawChart) creates a new function
      // instance with a specific 'this' value bound to it.
      // This binding means that no matter how the new function instance (drawChart instance) is called,
      // the 'this' keyword inside that function instance will always refer to the 'this' belonging to
      // HomeComponent (since HomeComponent is the specific object in which the ngOnInint and its context are a child of).
      //
      // By using "bind(this)" we make sure that the 'this' keyword is hard-wired into the function drawChart.
      // If we had not done that, then 'this' could have different context associations and we could not of used
      // the 'this.chartId' & 'this.firmDataInput' variables inside the drawChart.
      google.charts.setOnLoadCallback(this.drawChart.bind(this));

      // console.log('===Firms Accounts are : =======');
      // console.log(accountsOfFirm);
    } catch (error) {
      console.error('Error loading Google Chart package:', error);
    }
  } // End ngOnInit

  // This is the callback function , it will use the values in the 'this.firmDataInput' object
  // to create a unique ID for the chart drawing.
  drawChart() {
    const lala: any[] = this.financialService.agregateAccounts();
    // const accountTotal: AccountTotal[] = this.agregateAccounts();

    console.log(lala);
    console.log(`=== Firm Name is : ${this.firmDataInput.name}  =======`);
    console.log(`=== Chart ID is : ${this.chartId}  =======`);

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows(lala);

    // URL to table with all option properties :
    // https://developers-dot-devsite-v2-prod.appspot.com/chart/interactive/docs/gallery/piechart#configuration-options
    var options = {
      backgroundColor: 'white', // 'transparent',
      title: 'this.firmDataInput.name',
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
    };

    var chartDiv = new google.visualization.PieChart(
      document.getElementById(this.chartId)
    );
    chartDiv.draw(data, options);
  }
}

// ===========================================================================
// ===========================================================================
// ===========================================================================
//               T R A S H B I N      /    R E F E R E N C E
// ===========================================================================
// ===========================================================================
// ===========================================================================
