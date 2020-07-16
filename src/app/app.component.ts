import { Component, OnInit, ViewChild, } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('f',{static:false}) searchForm:NgForm;

  public data:any = [];
  public Maindata:any=[];
  public TableData:any=[];
  state = {
    "statenm" : " ",
    "region": " ",
    "totalInfected": 0,
    "recovered": 0,
    "deceased": 0,
    "totalCases": 0
  };
  submitted = false;
 
  constructor(private http: HttpClient){ 
  }

 ngOnInit(){
  this.http.get("https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true",
        {
          headers: new HttpHeaders(
            {'Content-Type': 'application/json'}
          )
          })
        .subscribe((res) => {
          this.data = res;
          this.Maindata=this.TableData=this.data.regionData;
          console.log(this.data);
        })
 }


  public onRefresh(){
       this.http.get("https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true",
        {
          headers: new HttpHeaders(
            {'Content-Type': 'application/json'}
          )
        }
        )
        .subscribe((res) => {
          console.log(res);
          this.data = res;
          console.log(this.data);
        })
  }


  public onSearch(){
    this.submitted = true;
    console.log(this.searchForm);
    this.state.statenm = this.searchForm.value.filter;
    this.state.statenm = this.state.statenm.toLowerCase();
    console.log(this.state.statenm);

    this.TableData=[];

    for (let index = 0; index < this.Maindata.length; index++) {
      if(String(this.Maindata[index].region).toLocaleLowerCase().includes(this.state.statenm))
        this.TableData.push(this.Maindata[index]);
       console.log(this.TableData);
    }
  }

}
