import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { PostProvider } from 'src/provider/post-provider';

@Component({
  selector: 'app-edit-penduduk',
  templateUrl: './edit-penduduk.page.html',
  styleUrls: ['./edit-penduduk.page.scss'],
  standalone: false,
})
export class EditPendudukPage implements OnInit {
  pendudukData: any = null;
  originalData: any = null;
  isEditMode: boolean = false;
  nikParam: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postPvdr: PostProvider,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.nikParam = this.route.snapshot.paramMap.get('nik') || '';
    if (this.nikParam) {
      this.loadPendudukData();
    }
  }

  async loadPendudukData() {
    const loading = await this.loadingController.create({
      message: 'Memuat data penduduk...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      const body = {
        aksi: 'getdetail',
        nik: this.nikParam,
      };

      this.postPvdr.postData(body, 'action.php').subscribe(
        async (data: any) => {
          await loading.dismiss();

          if (data.success) {
            this.pendudukData = { ...data.result };
            this.originalData = { ...data.result };
          } else {
            await this.showToast('Data tidak ditemukan', 'danger');
            this.router.navigate(['/tabs/tab3']);
          }
        },
        async (error) => {
          await loading.dismiss();
          await this.showToast('Gagal memuat data', 'danger');
          console.error('Error loading data:', error);
        }
      );
    } catch (error) {
      await loading.dismiss();
      await this.showToast('Terjadi kesalahan', 'danger');
      console.error('Error:', error);
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;

    const formCard = document.querySelector('.form-card');
    if (this.isEditMode) {
      formCard?.classList.add('edit-mode');
    } else {
      formCard?.classList.remove('edit-mode');
    }
  }

  async saveChanges() {
    if (!this.validateInput()) return;

    const loading = await this.loadingController.create({
      message: 'Menyimpan perubahan...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      const body = {
        aksi: 'update_penduduk',
        id: this.pendudukData.id,
        NIK: this.pendudukData.NIK,
        Nama: this.pendudukData.Nama,
        Tempat_TanggalLahir: this.pendudukData.Tempat_TanggalLahir,
        Umur: this.pendudukData.Umur,
        Jenis_Kelamin: this.pendudukData.Jenis_Kelamin,
        Golongan_Darah: this.pendudukData.Golongan_Darah,
        Alamat: this.pendudukData.Alamat,
        Agama: this.pendudukData.Agama,
        Status_Menikah: this.pendudukData.Status_Menikah,
        Pekerjaan: this.pendudukData.Pekerjaan,
        Kepala_Keluarga: this.pendudukData.Kepala_Keluarga,
        No_HP: this.pendudukData.No_HP,
      };

      this.postPvdr.postData(body, 'action.php').subscribe(
        async (data: any) => {
          await loading.dismiss();

          if (data.success) {
            await this.showToast('Data berhasil diperbarui', 'success');
            this.originalData = { ...this.pendudukData };

            setTimeout(() => {
              this.router.navigate(['/tabs/tab3'], {
                queryParams: { refresh: 'true' },
              });
            }, 500);
          } else {
            await this.showToast('Gagal memperbarui data', 'danger');
          }
        },
        async (error) => {
          await loading.dismiss();
          await this.showToast('Terjadi kesalahan saat menyimpan', 'danger');
          console.error('Error saving data:', error);
        }
      );
    } catch (error) {
      await loading.dismiss();
      await this.showToast('Terjadi kesalahan', 'danger');
      console.error('Error:', error);
    }
  }

  async cancelEdit() {
    if (this.hasChanges()) {
      const alert = await this.alertController.create({
        header: 'Konfirmasi',
        message: 'Apakah Anda yakin ingin membatalkan perubahan?',
        buttons: [
          {
            text: 'Tidak',
            role: 'cancel',
          },
          {
            text: 'Ya',
            handler: () => this.resetData(),
          },
        ],
      });
      await alert.present();
    } else {
      this.resetData();
    }
  }

  resetData() {
    this.pendudukData = { ...this.originalData };
    this.isEditMode = false;
  }

  validateInput(): boolean {
    const requiredFields = [
      'NIK', 'Nama', 'Tempat_TanggalLahir', 'Umur',
      'Jenis_Kelamin', 'Golongan_Darah', 'Alamat', 'Agama',
      'Status_Menikah', 'Pekerjaan', 'Kepala_Keluarga', 'No_HP',
    ];

    for (const field of requiredFields) {
      if (!this.pendudukData[field] || this.pendudukData[field].toString().trim() === '') {
        this.showToast(`${this.getFieldName(field)} harus diisi`, 'warning');
        return false;
      }
    }

    return true;
  }

  getFieldName(field: string): string {
    const fieldNames: { [key: string]: string } = {
      NIK: 'NIK',
      Nama: 'Nama',
      Tempat_TanggalLahir: 'Tempat dan Tanggal Lahir',
      Umur: 'Umur',
      Jenis_Kelamin: 'Jenis Kelamin',
      Golongan_Darah: 'Golongan Darah',
      Alamat: 'Alamat',
      Agama: 'Agama',
      Status_Menikah: 'Status Menikah',
      Pekerjaan: 'Pekerjaan',
      Kepala_Keluarga: 'Kepala Keluarga',
      No_HP: 'No HP',
    };
    return fieldNames[field] || field;
  }

  hasChanges(): boolean {
    if (!this.originalData || !this.pendudukData) return false;
    return JSON.stringify(this.originalData) !== JSON.stringify(this.pendudukData);
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color,
    });
    await toast.present();
  }
}
