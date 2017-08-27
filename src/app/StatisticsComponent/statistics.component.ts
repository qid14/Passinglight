import { Component } from '@angular/core';
// import { ROUTER_DIRECTIVES} from '@angular/router';
// import { LoginService } from '../services/login.service';
import { DashboardService } from '../services/dashboard.service';
import { ReadBookService } from '../services/readbook.service';

// import angular2-data-table
// import '../src/components/datatable.scss';
// import '../src/themes/material.scss';


@Component({
	providers: [DashboardService, ReadBookService],
	// moduleId:module.id,
	// templateUrl: 'app/modules/ReadBookComponent/readbook.component.html',

	// styleUrls: ['app/modules/ReadBookComponent/readbook.component.css'],

	template: `
	<div class="row" style="margin-left:20px;margin-top:20px;">
<div class="col-md-3 col-xs-3 col-lg-3" style="text-align:center;vertical-align:middle; display:table-cell;border-style:groove;">
<div>
<label>Total numbers of readers</label>
	 <ngx-charts-advanced-pie-chart
      [view]="view1"
      [scheme]="colorScheme"
      [results]="single"

      [gradient]="gradient"
      (select)="onSelect($event)">
    </ngx-charts-advanced-pie-chart>
</div>
<div style="border-style:groove;">
<ngx-charts-bar-horizontal
      [view]="view2"
      [scheme]="colorScheme"
      [results]="dura"
      [gradient]="gradient"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]=false
      [showXAxisLabel]="showXAxisLabel"
      [showYAxisLabel]="showYAxisLabel2"
      [xAxisLabel]="xAxisLabel2"
      [yAxisLabel]="yAxisLabel2"
      (select)="onSelect($event)">
    </ngx-charts-bar-horizontal>
</div>
</div>
	<div class="col-md-9 col-xs-9 col-lg-9" style="text-align:center;vertical-align:middle; display:table-cell;border-style:groove;">
	<label >Answer Statistics of Questionaire</label>
     <ngx-charts-bar-vertical-stacked
      [view]="view"
      [scheme]="colorScheme"
      [results]="multi"
      [gradient]="gradient"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [showXAxisLabel]="showXAxisLabel"
      [showYAxisLabel]="showYAxisLabel"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel"
      (select)="onSelect($event)">
    </ngx-charts-bar-vertical-stacked>
       </div>
       </div>

  `,
	// styleUrls: ['./readbook.component.css'],
	// directives: [ROUTER_DIRECTIVES]
})



export class StatisticsComponent {
	sumofduration = 0;
	rows: any[];
	multi = [];
	reading = 0;
	totalnum = 0;
	single = [];
	dura=[];


	view: any[] = [1000, 400];
	view1: any[] = [350, 300];
	view2: any[] = [350, 100];

	// options
	showXAxis = true;
	showYAxis = true;
	gradient = false;
	showLegend = true;
	showXAxisLabel = true;
	xAxisLabel = 'Questions';
	showYAxisLabel = true;
	yAxisLabel = 'Answers';

	xAxisLabel2 = 'Days';
	showYAxisLabel2 = false;
	// yAxisLabel2 = 'Ave Dura.';

	colorScheme = {
		domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
	};

	constructor(private dashboardService: DashboardService, private readBookService: ReadBookService) { }

	ngOnInit() {
		this.getStatistics();
		this.getCountAllNum();
		this.getCountReading();
		// console.log('getbooks------ ')
	}
	getCountReading() {
		this.dashboardService.getCountReadingNum()
			.subscribe(
			data => {
				// this.single=data;

				// console.log('count reading: xxxxxxxxxxxxxxx', data,data.text());
				this.reading = +data.text();
				// this.getCountAllNum();
			},
			err => { console.log('reading err ', err) },
			() => {
				// debugger
				this.single = [{
					"name": "Done",
					"value": this.totalnum - this.reading
				},
				{
					"name": "Reading",
					"value": this.reading
				}
				];
			}
			)
	}
	getCountAllNum() {
		this.dashboardService.getCountAllNum()
			.subscribe(
			data => {

				// console.log('countAll:', data.toString());
				this.totalnum = +data.text();

			},
			err => { console.log('countAll err:', err) },
			() => { }
			);
	}


	// Get Books
	getStatistics() {

		this.readBookService.SearchBorrows()
			.subscribe(
			data => {
				// if(data)
				// debugger
				for (let i = 0; i < data.length; i++) {
					this.sumofduration += +data[i].duration
				}
				
				let avgDur=this.sumofduration/ data.length;
				console.log('SUM OF DURATION', data.length, avgDur)

				this.dura=[{
				 "name": "AVG Duration",
				 "value":avgDur
				}
				]
				console.log('Dura:', this.dura)
			// 	,
			// err => { console.log('sum of duration err:', err) },
			// () => {
			// 	console.log('SUM OF DURATION', this.sumofduration)
			// }

      })


		this.dashboardService.getQuestionaireAnswers()
	.subscribe(
	data => {
		// console.log('temparray in statistics:', data, data[0], data[0].No_1001);

		this.multi = [
			{
				"name": "Are you a Christian?",
				"series": [
					{
						"name": "Yes",
						"value": data[0].Yes_1001
					},
					{
						"name": "No",
						"value": data[0].No_1001
					}
				]
			},
			{
				"name": "Do you like the book?",
				"series": [
					{
						"name": "Yes",
						"value": data[0].Yes_1002
					},
					{
						"name": "No",
						"value": data[0].No_1002
					}
				]
			},
			{
				"name": "Does the book touch your heart?",
				"series": [
					{
						"name": "Yes",
						"value": data[0].Yes_1003
					},
					{
						"name": "No",
						"value": data[0].No_1003
					}
				]
			}

			,
			{
				"name": "Do you want to know more about Jesus if you are not a Christian?",
				"series": [
					{
						"name": "Yes",
						"value": data[0].Yes_1004
					},
					{
						"name": "No",
						"value": data[0].No_1004
					}
				]
			}
			,
			{
				"name": "Do you like to receive the book《游子吟》？",
				"series": [
					{
						"name": "Yes",
						"value": data[0].Yes_1005
					},
					{
						"name": "No",
						"value": data[0].No_1005
					}
				]
			}
			,
			{
				"name": "Do you like to accept Jesus as your savior if you have not done so?",
				"series": [
					{
						"name": "Yes",
						"value": data[0].Yes_1006
					},
					{
						"name": "No",
						"value": data[0].No_1006
					}
				]
			}
			,
			{
				"name": "Do you like to attend any Christian church to have better understanding of Jesus and God?",
				"series": [
					{
						"name": "Yes",
						"value": data[0].Yes_1007
					},
					{
						"name": "No",
						"value": data[0].No_1007
					}
				]
			}
			,
			{
				"name": "Do you like to pass the book to your close friend just like passing the torch to next one in darkness?",
				"series": [
					{
						"name": "Yes",
						"value": data[0].Yes_1008
					},
					{
						"name": "No",
						"value": data[0].No_1008
					}
				]
			}
			,
			{
				"name": "Do you like to purchase more books so that you can pass them along to more of your friends?",
				"series": [
					{
						"name": "Yes",
						"value": data[0].Yes_1009
					},
					{
						"name": "No",
						"value": data[0].No_1009
					}
				]
			}
		]

		// this.rows = data;
	},
	err => alert(err),
	() => { }
	);

	}


};