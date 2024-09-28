import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class SkillService {
    private api_url = 'http://localhost:8080/api/recruitment';

    constructor (
        private http: HttpClient
    ) {}

    public findAllSkill(id:any):Observable<any> {
        return this.http.get<any>(this.api_url + '/skills/app_id=' + id,{
            headers: this.createAuthorizationHeader()
        });
    }

    public createSkill(skill:any):Observable<any>{
        return this.http.post<any>(this.api_url + '/create/skill', skill,{
            headers: this.createAuthorizationHeader()
        });
    }

    public updateSkill(skill:any):Observable<any>{
        return this.http.put<any>(this.api_url + '/update/skill', skill,{
            headers: this.createAuthorizationHeader()
        });
    }

    public deleteSkill(id:any):Observable<any> {
        return this.http.delete<any>(this.api_url + '/delete/skill/id=' + id,{
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