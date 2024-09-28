import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class OptionDetailService{
    private base_url:any = 'http://localhost:8080/recruitment/option_detail';
    private api_url:any = 'http://localhost:8080/api/recruitment';

    constructor 
    (
        private http: HttpClient
    ) {}

    public getOptionDetailAll ():Observable<any> {
        return this.http.get<any>(this.base_url);
    }

    public getOptionDetailTechnologiesUsing ():Observable<any> {
        return this.http.get<any>(this.base_url + '/tecnologies');
    }

    public getOptionDetailLevel ():Observable<any> {
        return this.http.get<any>(this.base_url + '/levels');
    }

    public getOptionDetailContractType ():Observable<any> {
        return this.http.get<any>(this.base_url + '/contract_types');
    }

    public getOptionDetailWorkingForm ():Observable<any> {
        return this.http.get<any>(this.base_url + '/working_forms');
    }

    public getOptionDetailApproval ():Observable<any> {
        return this.http.get<any>(this.base_url + '/approval');
    }

    public optionDetailByOptionType (option_type:string):Observable<any> {
        return this.http.get<any>(this.base_url +'/option_type='+option_type);
    }

    public getoptioDetailByCodeOptionID(id:any):Observable<any> {
       return this.http.get<any>(this.api_url+'/option_detail_by_code_option/id=' + id, {
        headers: this.createAuthorizationHeader()
       });
    }

    public createOpDetail(opDetail:any):Observable<any> {
        return this.http.post<any>(this.api_url + '/option_detail',opDetail, {
            headers: this.createAuthorizationHeader()
        });
    }

    public updateOpDetail(opDetail:any):Observable<any> {
        return this.http.put<any>(this.api_url + '/update/option_detail' ,opDetail, {
            headers: this.createAuthorizationHeader()
        });
    }

    public deleteOpDetail(opDetail:any):Observable<any> {
        return this.http.put<any>(this.api_url + '/delete/option_detail',opDetail, {
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
