import { HttpClient } from "@angular/common/http";
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

    public findAccountByUsername(username:any,password:any):Observable<any>{
        return this.http.get<any>(this.base_url + '/login/username=' + username + "&" + 'password=' +password);
    }
}