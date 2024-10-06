import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firm, DataDemo } from '../interfaces/finance.model';
import { FinancialService } from '../services/financial.service';
import { AssetsTableComponent } from '../assets-table/assets-table.component';
import { ChartComponent } from '../chart/chart.component';
declare var google: any;
// import * as google from 'google-charts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AssetsTableComponent, ChartComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  firms: Firm[] = [];
  charts: any[] = []; // Array to store charts

  constructor(private FinancialService: FinancialService) {}

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

    // This google.charts.setOnLoadCallback() function is used to specify a callback function that
    // will be executed once the Google Charts library has been fully loaded and initialized.
    //
    // The setOnLoadCallback function is essential for ensuring that your chart-related
    // code doesn't run before the Google Charts library is ready.
    // google.charts.setOnLoadCallback(this.drawChart(this.firms));
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  // This is the callback function we need to
  // drawChart(theFirms: Firm[]) {
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

    // URL to table with all option properties :
    // https://developers-dot-devsite-v2-prod.appspot.com/chart/interactive/docs/gallery/piechart#configuration-options
    var options = {
      backgroundColor: 'white', // 'transparent',
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
    };

    const colorArray = ['red', 'green', 'white'];
    for (let i = 0; i < this.firms.length; i++) {
      const chartId = `donutchart-FIRM-${i + 1}`; // Dynamic chart ID
      // const chartId = '12';
      const chartDiv = document.getElementById(chartId);

      if (chartDiv) {
        const chart = new google.visualization.PieChart(chartDiv);
        this.charts.push(chart); // Add chart to charts array

        // options.title = `Title ${i + 1}`;
        options.backgroundColor = colorArray[i];

        this.charts[i].draw(data, options);

        //  // Prepare data and draw the chart
        //  const data = new google.visualization.DataTable();
        //  // ... (your data preparation logic here)
        //  chart.draw(data, {
        //    title: 'Firm ' + (i + 1) + ' Chart',
        //    width: 400,
        //    height: 300,
        //  });
      }
    }

    // for (let i = 0; i < this.firms.length; i++) {
    //   // Code to be executed n times
    //   var chart1 = new google.visualization.PieChart(
    //     document.getElementById('donutchart-FIRM-1')
    //   );
    // }

    // var chart1 = new google.visualization.PieChart(
    //   document.getElementById(this.firms[0].id)
    // );

    // var chart2 = new google.visualization.PieChart(
    //   document.getElementById(this.firms[1].id)
    // );

    // var chart3 = new google.visualization.PieChart(
    //   document.getElementById(this.firms[2].id)
    // );

    // chart1.draw(data, options);
    // chart2.draw(data, options);
    // chart3.draw(data, options);
  }
}
