import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class SmsService{
    private api_url = "http://api.123-txt.com/Api123WCF.svc/rest/";

    constructor (private http: HttpClient){}

    public sendOneSMS(req:any):Observable<any>{
        return this.http.get<any>(this.api_url+'SendSms', req);
    }
}