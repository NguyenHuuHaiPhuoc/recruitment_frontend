import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private account:any ;
  constructor() {
    this.loadStateFromStorage();
   }

  login(account:any){
    this.account = account;
    this.loggedIn = true;
    this.saveStateToStorage();
  }

  logout(){
    this.account = null;
    this.loggedIn = false;
    this.clearStateFromStorage();
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getAccount(): any {
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
