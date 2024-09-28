import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ProcessService{
    private api_url:any = 'http://localhost:8080/api/recruitment';

    constructor(
        private http: HttpClient
    ) {}

    public processByJobID (id:any):Observable<any> {
        return this.http.get<any>(this.api_url+ '/process/id='+ id,{
            headers: this.createAuthorizationHeader()
        });
    }
    public createProcess (process:any):Observable<any> {
        return this.http.post<any>(this.api_url+ '/create/process', process,{
            headers: this.createAuthorizationHeader()
        });
    }

    public deleteProcess (id:any):Observable<any> {
        return this.http.delete<any>(this.api_url+ '/delete/process/id=' + id,{
            headers: this.createAuthorizationHeader()
        });
    }

    private createAuthorizationHeader() {
        let account = [];
        let item = localStorage.getItem('account');
        if (item != null) {
            account = JSON.parse(item);
        }
        const token = localStorage.getItem(account.username+"_jwtToken");
        if (!token) {
            console.log("Tocken not found local Storage!");
            return;
        }
        return new HttpHeaders().set(
            'Authorization', 'Bearer ' + token
        );
    }
}