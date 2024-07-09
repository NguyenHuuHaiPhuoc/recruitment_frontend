import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ExpProjectService {

    private api_url = 'http://localhost:8080/api/recruitment';

    constructor (
        private http: HttpClient
    ) {}

    public findByExperienceID(id:any):Observable<any>{
        return this.http.get<any>(this.api_url + '/projectEXP/exp_id=' + id,{
            headers: this.createAuthorizationHeader()
        });
    }

    public createProjectEXP(projectEXP:any):Observable<any>{
        return this.http.post<any>(this.api_url + '/create/projectEXP', projectEXP, {
            headers: this.createAuthorizationHeader()
        });
    }

    public updateProjectEXP(projectEXP:any):Observable<any> {
        return this.http.put<any>(this.api_url + '/update/projectEXP', projectEXP, {
            headers: this.createAuthorizationHeader()
        });
    }

    public deleteProjectEXP(id:any, obj:any):Observable<any> {
        return this.http.patch<any>(this.api_url + '/delete/projectEXP/proj_id=' + id, obj, {
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