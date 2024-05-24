import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ProcessService{
    private url:any = 'http://localhost:8080/api/recruitment';

    constructor(
        private http: HttpClient
    ) {}

    public createProcess (process:any):Observable<any> {
        return this.http.post<any>(this.url+ '/process', process);
    }
}