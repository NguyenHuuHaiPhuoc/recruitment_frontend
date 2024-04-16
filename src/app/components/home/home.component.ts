import { Component,OnInit} from '@angular/core';
import { QuickSearchComponent } from '../quick-search/quick-search.component';
import { Http2ServerRequest } from 'http2';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QuickSearchComponent,NgFor,NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private http: HttpClient) { }
  res: any;
  url :string  = './assets/test.json';
  limit:number=5;
  loading:boolean = false;
  btn_loadmore:boolean = true;
  ngOnInit(limit:number =5): void {
    // hiển thị 5 công việc
    this.http.get(this.url).subscribe((data: any) =>{
    this.res = data.slice(0,limit);
    console.log(this.res);
  });

  }


  //hiển thị thêm 5 công việc sau mỗi lần click
 loadmore(){
  this.loading = true;
   window.setTimeout(() =>{
   this.limit +=5;
   this.http.get(this.url).subscribe((data: any) =>{
    this.res = data.slice(0,this.limit);
    console.log(this.res);
 });
 this.loading = false;
 },700);
 }
}
