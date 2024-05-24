import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class OptionDetailService{
    private base_url:any = 'http://localhost:8080/recruitment/api/option_detail';

    constructor 
    (
        private http: HttpClient
    ) {}

    getOptionDetailAll ():Observable<any> {
        return this.http.get<any>(this.base_url);
    }

    getOptionDetailTechnologiesUsing ():Observable<any> {
        return this.http.get<any>(this.base_url + '/tecnologies');
    }

    getOptionDetailLevel ():Observable<any> {
        return this.http.get<any>(this.base_url + '/levels');
    }

    getOptionDetailContractType ():Observable<any> {
        return this.http.get<any>(this.base_url + '/contract_types');
    }

    getOptionDetailWorkingForm ():Observable<any> {
        return this.http.get<any>(this.base_url + '/working_forms');
    }
}
