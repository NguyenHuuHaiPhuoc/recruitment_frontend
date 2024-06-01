import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  localStorage.setItem('stageUrl', state.url);

  let account = [];
  let auth = localStorage.getItem('account');
  if (auth != null) {
    account = JSON.parse(auth);
  }
  const token = localStorage.getItem(account.username+"_jwtToken")
  const roles = account.roles;
  if(roles != null){
    if(state.url.includes('easyjob') && roles[0] == 3){
      router.navigateByUrl(state.url);
      console.error("Ban khong co quyen truy cap vao trang nay");
      return false;
    }
    if(
      (
        state.url.includes('dashboard-recruiter/dashboard')
        ||
        state.url.includes('dashboard-recruiter/cong-viec')
      )
      && roles[0] == 2)
    {
      console.error("Ban khong co quyen truy cap vao trang nay")
      return false;
    }

    if (
      (
        state.url.includes('dashboard-admin/dashboard')
        ||
        state.url.includes('dashboard-admin/quan-ly-cong-viec')
        ||
        state.url.includes('dashboard-admin/code')
      ) 
      && (roles[0] == 2 || roles[0] == 3)) 
    {
      console.error("Ban khong co quyen truy cap vao trang nay")
      return false;
    }
  }


  if (token != null) {
    return true;
  }else{
    router.navigateByUrl('/dang-nhap');
    return false;
  }
};
