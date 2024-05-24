import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthorityService {

    private base_url = 'http://localhost:8080/recruitment/create';
    private api_url = 'http://localhost:8080/api/recruitment';

    constructor (
        private http: HttpClient
    ) {}

    public createAuthority (authority:any):Observable<any> {
        return this.http.post<any>(this.base_url + '/auth', authority);
    }
}