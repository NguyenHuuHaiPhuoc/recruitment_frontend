import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class EducationService {

    private api_url = 'http://localhost:8080/api/recruitment';

    constructor (
        private http: HttpClient
    ) {}

    public findByApplicantID(id:any):Observable<any>{
        return this.http.get<any>(this.api_url + '/educations/app_id=' + id,{
            headers: this.createAuthorizationHeader()
        });
    }

    public createEducation(education:any):Observable<any>{
        return this.http.post<any>(this.api_url + '/education', education, {
            headers: this.createAuthorizationHeader()
        });
    }

    public updateEducation(education:any):Observable<any> {
        return this.http.put<any>(this.api_url + '/education', education, {
            headers: this.createAuthorizationHeader()
        });
    }

    public deleteEducation(id:any, obj:any):Observable<any> {
        return this.http.patch<any>(this.api_url + '/education/id=' + id, obj, {
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