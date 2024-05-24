import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class JobService{
    private api_url:any = 'http://localhost:8080/api/recruitment';

    constructor 
    (
        private http: HttpClient
    ) {}

    public getAllJob ():Observable<any> {
        return this.http.get<any>(this.api_url + '/jobs', {
            headers: this.createAuthorizationHeader()
        });
    }

    public getJobById (id:any):Observable<any> {
        return this.http.get<any>(this.api_url + '/jobs/id=' + id);
    }

    public createJob (job:any):Observable<any> {
        return this.http.post<any>(this.api_url + '/jobs',job);
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
            'Athorization', 'Bearer' + token
        );
    }
}