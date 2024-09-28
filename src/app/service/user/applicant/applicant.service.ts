import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ApplicantService {

    private base_url = 'http://localhost:8080/recruitment/create';
    private api_url = 'http://localhost:8080/api/recruitment';

    constructor (
        private http: HttpClient
    ) {}

    public createApplicant (applicant:any):Observable<any> {
        return this.http.post<any>(this.base_url + '/applicant', applicant);
    }

    public findApplicantByAccountID (id:any):Observable<any> {
        return this.http.get<any>(this.api_url + '/applicant/accountID=' + id,{
            headers: this.createAuthorizationHeader()
        });
    }

    public updateApplicant(applicant:any):Observable<any>{
        return this.http.put<any>(this.api_url + '/update/applicant',applicant,{
            headers: this.createAuthorizationHeader()
        })
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