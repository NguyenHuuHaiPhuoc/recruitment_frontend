import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
        state.url.includes('employer-dashboard/news')
        ||
        state.url.includes('employer-dashboard/settingaccount/changepassword')
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
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "warning",
        title: 'Bạn không được phép vào trang này'
      });
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
