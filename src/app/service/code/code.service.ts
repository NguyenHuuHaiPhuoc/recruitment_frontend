import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CodeService {
  private api_url = 'http://localhost:8080/api/recruitment';
  private account:any = [];
  private item = localStorage.getItem('account');
  constructor(
    private http: HttpClient
  ) {}

  public getAllCodeoption():Observable<any> {
    return this.http.get<any>(this.api_url + '/code-option', {
      headers: this.createAuthorizationHeader()
    });
  }

  public createCodeOption(codeOption:any):Observable<any> {
    return this.http.post<any>(this.api_url + '/create/code-option',codeOption, {
      headers: this.createAuthorizationHeader()
    });
  
  }
  public updateCodeOption(codeOption:any):Observable<any> {
    return this.http.put<any>(this.api_url + '/update/code-option',codeOption, {
      headers: this.createAuthorizationHeader()
    });
  
  }
  public deleteCodeOption(codeOption:any):Observable<any> {
    return this.http.put<any>(this.api_url + '/delete/code-option',codeOption, {
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
