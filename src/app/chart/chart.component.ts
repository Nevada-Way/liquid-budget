import { Component, Input } from '@angular/core';
import { Firm, Account } from '../interfaces/finance.model';
import { FinancialService } from '../services/financial.service';
import { HelperService } from '../services/helper.service';
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

  constructor(
    private financialService: FinancialService,
    private helperService: HelperService
  ) {}

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
    const accountsOfFirm: Account[] = this.firmDataInput.accounts;

    const accountAgregated: any[] =
      this.financialService.agregateAccounts(accountsOfFirm);
    // const accountAgregated: any[] = this.financialService.test(accountsOfFirm);

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'haha');
    data.addColumn('number', 'gogo');

    data.addRows(this.helperService.convertArrayToUpperCase(accountAgregated));
    // data.addRows(accountAgregated);

    // console.log(
    //   '$$$$$$$ Agregated Accounts array = ',
    //   this.helperService.convertArrayToUpperCase(accountAgregated)
    // );

    // URL to table with all option properties :
    // https://developers-dot-devsite-v2-prod.appspot.com/chart/interactive/docs/gallery/piechart#configuration-options
    var options = {
      backgroundColor: 'transparent', //'white',
      title: '',
      pieHole: 0.4, // last balue was 0.4
      enableInteractivity: false,
      pieSliceText: 'value', // other values : 'none', 'label' , 'percentage' (default)
      pieSliceTextStyle: { color: 'white', fontSize: 14 },
      // legend: { position: 'none' },
      legend: {
        position: 'bottom', // Possible values: 'labeled'
        textStyle: { color: 'black', fontSize: 14 },
      },

      chartArea: {
        // left: 20,
        top: 15,
        // width: '120%',
        // height: '90%',
        // backgroundColor: 'yellow',
      },
      width: '300', // prev value:  width: '350',
      height: '180', // prev value: height: '250',

      slices: [
        // If you want to update color values then first update the
        // commented color defenitions here and in file \src\styles\abstracts\_variables.scss
        { color: '#60099e' }, // $chart-color-cash: #60099e;
        { color: '#005cbb' }, //$chart-color-bonds: #005cbb;

        { color: '#c78f0c' }, // $chart-color-shares: #c78f0c;
        { color: 'blue' }, // $chart-color-other: 'blue';
      ],
    };

    var chartDiv = new google.visualization.PieChart(
      document.getElementById(this.chartId)
    );
    chartDiv.draw(data, options);
  }
}
