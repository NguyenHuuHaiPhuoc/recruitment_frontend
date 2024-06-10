import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class JobService{
    private api_url:any = 'http://localhost:8080/api/recruitment';
    private base_url = 'http://localhost:8080/recruitment/jobs';

    constructor 
    (
        private http: HttpClient
    ) {}

    public getAllJob():Observable<any> {
        return this.http.get<any>(this.base_url);
    }

    public getAllJobByAccountID (id:any):Observable<any> {
        return this.http.get(this.api_url + '/jobs/account_id='+id,{
            headers: this.createAuthorizationHeader()
        });
    }

    public getJobById (id:any):Observable<any> {
        return this.http.get<any>(this.api_url + '/jobs/id=' + id, {
            headers: this.createAuthorizationHeader()
        });
    }

    public createJob (job:any):Observable<any> {
        return this.http.post<any>(this.api_url + '/create/jobs',job, {
            headers: this.createAuthorizationHeader()
        });
    }

    public updateJob (job:any):Observable<any> {
        return this.http.put<any>(this.api_url + '/update/jobs',job, {
            headers: this.createAuthorizationHeader()
        });
    }

    public approvalJob (jobID:number,approval:any):Observable<any> {
        return this.http.patch<any>(this.api_url + '/approve/jobs/id=' + jobID, approval, {
            headers: this.createAuthorizationHeader()
        });
    }

    public deleteJob (jobID:number,request:any):Observable<any> {
        return this.http.patch<any>(this.api_url + '/delete/jobs/id=' + jobID, request, {
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