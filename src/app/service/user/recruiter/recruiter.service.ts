import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class RecruiterService {
    private base_url = 'http://localhost:8080';

    constructor (
        private http: HttpClient
    ) {}

    public createRecruiter(recruiter:any):Observable<any> {
        return this.http.post<any>(this.base_url + '/recruitment/create/recruiter', recruiter);
    }

    public updateRecruiter(recruiter:any):Observable<any> {
        return this.http.put<any>(this.base_url + '/api/recruitment/update/recruiter', recruiter, {
            headers: this.createAuthorizationHeader()
        });
    }

    public uploadAvatar(id:any, request:any):Observable<any> {
        return this.http.patch<any>(this.base_url + '/api/recruitment/upload/img/id=' + id, request, {
            headers: this.createAuthorizationHeader()
        });
    }

    public recruiterByAccountID(id:any):Observable<any> {
        return this.http.get<any>(this.base_url + '/api/recruitment/recruiter/profile/id=' + id, {
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