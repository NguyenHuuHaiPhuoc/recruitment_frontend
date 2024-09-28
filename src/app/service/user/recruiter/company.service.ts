import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CompanyService {

    private base_url = 'http://localhost:8080/recruitment';
    private api_url = 'http://localhost:8080/api/recruitment';

    constructor (
        private http: HttpClient
    ) {}

    public createCompany (company:any):Observable<any> {
        return this.http.post<any>(this.base_url + '/create/company', company);
    }

    public findCompanyByJobCreateBy():Observable<any>{
        return this.http.get<any>(this.base_url + '/company');
    }

    public findCompanyByRecruiterID(id:any):Observable<any>{
        return this.http.get<any>(this.api_url + '/company/recruiter='+id,{
            headers: this.createAuthorizationHeader()
        });
    }

    public recruiterUpdateCompany(company:any):Observable<any>{
        return this.http.put<any>(this.api_url + '/recruiter/update/company', company,{
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