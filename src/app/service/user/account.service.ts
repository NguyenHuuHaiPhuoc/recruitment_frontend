import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AccountService {

    private base_url = 'http://localhost:8080/recruitment';
    private api_url = 'http://localhost:8080/api/recruitment';

    constructor (
        private http: HttpClient
    ) {}

    public register (account:any):Observable<any> {
        return this.http.post<any>(this.base_url + '/register', account);
    }

    public findAccountByUsername(request:any):Observable<any>{
        return this.http.post<any>(this.base_url + '/login',request);
    }

    public changePassword(username:string,request:any):Observable<any> {
        return this.http.patch<any>(this.api_url+ '/update/password/username=' + username, request, {
            headers: this.createAuthorizationHeader()
        })
    }

    public updateFullname(id:any,request:any):Observable<any> {
        return this.http.patch<any>(this.api_url+ '/update/full_name/id=' + id, request, {
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