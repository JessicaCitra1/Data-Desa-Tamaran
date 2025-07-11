import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from 'src/provider/post-provider';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
    NIK: string = '';
    Nama: string = '';
    Tempat_TanggalLahir: string = '';
    Umur: string = '';
    Jenis_Kelamin: string = '';
    Golongan_Darah: string = '';
    Alamat: string = '';
    Agama: string = '';
    Status_Menikah: string = '';
    Pekerjaan: string = '';
    Kepala_Keluarga: string = '';
    No_HP: string = '';

  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvd: PostProvider,
  ) {

  }

  ngOnInit() {

  }

  async addRegister() {
      if (this.NIK == '') { 
        const toast = await this.toastController.create({ 
        message: 'NIK harus di isi', 
        duration: 2000 
        }); 
        toast.present(); 
      } else if (this.Nama == '') { 
        const toast = await this.toastController.create({ 
          message: 'Nama harus di isi', 
          duration: 2000 
          }); 
        toast.present(); 
      } else if (this.Tempat_TanggalLahir == '') { 
        const toast = await this.toastController.create({ 
          message: 'Tempat dan Tanggal Lahir harus di isi', 
          duration: 2000 
          }); 
        toast.present(); 
      } else if (this.Umur == '') { 
        const toast = await this.toastController.create({ 
          message: 'Umur harus di isi', 
          duration: 2000 
          }); 
        toast.present(); 
      } else if (this.Jenis_Kelamin == '') { 
        const toast = await this.toastController.create({ 
          message: 'Jenis Kelamin harus di isi', 
          duration: 2000 
          }); 
        toast.present(); 
      } else if (this.Golongan_Darah == '') { 
        const toast = await this.toastController.create({ 
          message: 'Golongan Darah harus di isi', 
          duration: 2000 
          }); 
        toast.present(); 
      } else if (this.Alamat == '') { 
        const toast = await this.toastController.create({ 
          message: 'Alamat harus di isi',
          duration: 2000 
          }); 
        toast.present(); 
      } else if (this.Agama == '') { 
        const toast = await this.toastController.create({ 
          message: 'Agama harus di isi', 
          duration: 2000 
          }); 
        toast.present(); 
      } else if (this.Status_Menikah == '') { 
        const toast = await this.toastController.create({ 
          message: 'Status Menikah harus di isi', 
          duration: 2000 
          }); 
        toast.present();
      } else if (this.Pekerjaan == '') { 
        const toast = await this.toastController.create({ 
          message: 'Pekerjaan harus di isi', 
          duration: 2000 
          }); 
        toast.present(); 
      } else if (this.Kepala_Keluarga == '') {
        const toast = await this.toastController.create({ 
          message: 'Kepala Keluarga harus di isi', 
          duration: 2000 
          }); 
        toast.present(); 
      } else if (this.No_HP == '') { 
        const toast = await this.toastController.create({
          message: 'No HP harus di isi', 
          duration: 2000 
          }); 
        toast.present(); 
      } else {
        let body = {
          NIK: this.NIK,
          Nama: this.Nama,
          Tempat_TanggalLahir: this.Tempat_TanggalLahir,
          Umur: this.Umur,
          Jenis_Kelamin: this.Jenis_Kelamin,
          Golongan_Darah: this.Golongan_Darah,
          Alamat: this.Alamat,
          Agama: this.Agama,
          Status_Menikah: this.Status_Menikah,
          Pekerjaan: this.Pekerjaan,
          Kepala_Keluarga: this.Kepala_Keluarga,
          No_HP: this.No_HP,
          aksi: 'add_register'
        };
        this.postPvd.postData(body, 'action.php').subscribe(async data => { 
          var alertpesan = data.msg; 
          if (data.success) { 
            this.router.navigate(['/tabs/tab3']); 
            const toast = await this.toastController.create({ 
             message: 'Selamat! Registrasi alumni sukses.', 
             duration: 2000 
            }); 
            toast.present();
          setTimeout(() => {
            location.reload();
          }, 1000);
          } else { 
            const toast = await this.toastController.create({ 
              message: alertpesan, 
              duration: 2000 
            }); 
          } 
        }); 
    
       } 
     } 
  }


