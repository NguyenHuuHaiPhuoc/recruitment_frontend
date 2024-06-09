import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private base_url = 'http://localhost:8080/recruitment';
  private loggedIn = false;
  private account:any ;
  constructor(
    private http: HttpClient
  ) {
    this.loadStateFromStorage();
   }

  public login(account:any){
    this.account = account;
    this.loggedIn = true;
    this.saveStateToStorage();
  }

  public createToken(acount:any):Observable<any>{
    return this.http.post<any>(this.base_url + '/authentication', acount);
  }

  public logout(){
    this.account = null;
    this.loggedIn = false;
    this.clearStateFromStorage();
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public getAccount(): any {
    return this.account;
  }

  private saveStateToStorage() {
    localStorage.setItem('loggedIn', JSON.stringify(this.loggedIn));
    localStorage.setItem('account', JSON.stringify(this.account));
  }

  private loadStateFromStorage() {
    const loggedIn = localStorage.getItem('loggedIn');
    const account = localStorage.getItem('account');
    if (loggedIn && account) {
      this.loggedIn = JSON.parse(loggedIn);
      this.account = JSON.parse(account);
    }
  }

  private clearStateFromStorage() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('account');
  }
}
