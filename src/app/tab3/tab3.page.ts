import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/provider/post-provider';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  penduduks: any = [];
  filteredPenduduks: any = [];
  searchTerm: string = '';
  limit: number = 10;
  start: number = 0;

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    public toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.router.routerState.root.queryParams.subscribe(async params => {
      const isRefresh = params['refresh'] === 'true';

      // Reset data
      this.penduduks = [];
      this.filteredPenduduks = [];
      this.start = 0;

      await this.loadPenduduk();

      if (isRefresh) {
        const toast = await this.toastController.create({
          message: 'Data berhasil diperbarui',
          duration: 2000,
          position: 'top',
          color: 'success'
        });
        toast.present();

        // Bersihkan query param agar tidak terus refresh
        this.router.navigate([], {
          queryParams: {},
          replaceUrl: true
        });
      }
    });
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  loadData(event: any) {
    this.start += this.limit;
    setTimeout(() => {
      this.loadPenduduk().then(() => {
        event.target.complete();
      });
    }, 500);
  }

  loadPenduduk() {
    return new Promise(resolve => {
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'action.php').subscribe(data => {
        for (let penduduk of data.result) {
          this.penduduks.push(penduduk);
        }
        this.filteredPenduduks = [...this.penduduks];
        resolve(true);
      });
    });
  }

  searchPenduduk() {
    let body = {
      aksi: 'search_penduduk',
      searchTerm: this.searchTerm
    };

    if (this.searchTerm.length > 0) {
      this.postPvdr.postData(body, 'action.php').subscribe(data => {
        if (data.success) {
          this.penduduks = data.result;
          this.filteredPenduduks = [...this.penduduks];
        }
      });
    } else {
      this.penduduks = [];
      this.filteredPenduduks = [];
      this.start = 0;
      this.loadPenduduk();
    }
  }

  onSearchChange(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredPenduduks = this.penduduks.filter((penduduk: any) => {
        return penduduk.NIK.toLowerCase().includes(searchTerm) ||
               penduduk.Nama.toLowerCase().includes(searchTerm);
      });
    } else {
      this.filteredPenduduks = [...this.penduduks];
    }
  }

  getActionButtons(penduduk: any) {
    return [
      {
        text: 'Lihat & Edit Data',
        icon: 'create-outline',
        handler: () => {
          this.navigateToEdit(penduduk);
        }
      },
      {
        text: 'Hapus',
        icon: 'trash-outline',
        role: 'destructive',
        handler: () => {
          this.confirmDelete(penduduk);
        }
      },
      {
        text: 'Batal',
        icon: 'close-outline',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ];
  }

  navigateToEdit(penduduk: any) {
    this.router.navigate(['/edit-penduduk', penduduk.NIK]);
  }

  async confirmDelete(penduduk: any) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Hapus',
      message: `Apakah Anda yakin ingin menghapus data ${penduduk.Nama}?`,
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          handler: () => {
            console.log('Cancel delete');
          }
        },
        {
          text: 'Hapus',
          role: 'destructive',
          handler: () => {
            this.deletePenduduk(penduduk);
          }
        }
      ]
    });

    await alert.present();
  }

  deletePenduduk(penduduk: any) {
    let body = {
      aksi: 'delete',
      nik: penduduk.NIK
    };

    this.postPvdr.postData(body, 'action.php').subscribe(async (data: any) => {
      if (data.success) {
        this.penduduks = this.penduduks.filter((p: any) => p.NIK !== penduduk.NIK);
        this.filteredPenduduks = this.filteredPenduduks.filter((p: any) => p.NIK !== penduduk.NIK);

        const toast = await this.toastController.create({
          message: 'Data berhasil dihapus',
          duration: 2000,
          position: 'top',
          color: 'success'
        });
        toast.present();
      } else {
        const toast = await this.toastController.create({
          message: 'Gagal menghapus data',
          duration: 2000,
          position: 'top',
          color: 'danger'
        });
        toast.present();
      }
    });
  }
}
