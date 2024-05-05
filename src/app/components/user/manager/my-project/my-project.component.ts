import { Component } from '@angular/core';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';

declare var $:any;
@Component({
  selector: 'app-my-project',
  standalone: true,
  imports: [AngularEditorModule],
  templateUrl: './my-project.component.html',
  styleUrl: './my-project.component.scss'
})
export class MyProjectComponent {

  public myProject:any = [
    {
      id: 1,
      name: 'Recruitment Website',
      position: 'Full-stack',
      member: 1,
      start_date: '10/2023',
      end_date: '12/2023',
      skill: [
        {
          id: 1,
          code: 'Java'
        },
        {
          id: 2,
          code: 'Spring Boot'
        },
        {
          id: 3,
          code: 'Angular'
        }
      ],

      description: '<b>Website bán Laptop online</b><div><b>Web cung cấp đầy đủ các tính năng như:</b></div><div><ol><li><b>Tìm kiếm sản phẩm tho nhiêu tieu chí</b></li><li><b>Thêm sản phẩm vào giỏ hàng</b></li><li><b>Thanh toán online qua thẻ ngân hàng</b></li></ol></div>',
      url:'http://easyjob.com'
    }
  ];

  configEditor: AngularEditorConfig = {
    editable : true,
    spellcheck : true,
    height : "10rem",
    minHeight : '5rem',
    translate : 'yes',
    defaultParagraphSeparator : 'p',
    defaultFontName : 'Times new Roman'
  };

  constructor() {
  }
  
  ngOnInit () :void {}

  openAddProjectModal () {$('#btn-modal-add_project').trigger('click');}
  openEditProjectModal (value:any) {
    $('#btn-modal-edit_project').trigger('click');
    $('#editProjectModalLabel').text(value)
  }

  deleteProject (id:any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-md-2",
        cancelButton: "btn btn-danger mx-md-2"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Bạn chắc chắn muốn xóa?",
      text: "Bạn sẽ không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          // title: "Xóa thành công!",
          title:'Chuc nang chua thuc hien',
          showConfirmButton: false,
          icon: "success",
          timer: 1500
        });
      } 
      /* Read more about handling dismissals below */
      else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
          title: "Đã hủy!",
          showConfirmButton: false,
          icon: "error",
          timer: 1500
        });
      }
    });
  }

  // submit success 
  // Swal.fire({
  //   position: "center",
  //   icon: "success",
  //   title: message,
  //   showConfirmButton: false,
  //   timer: 1500
  // });
}
