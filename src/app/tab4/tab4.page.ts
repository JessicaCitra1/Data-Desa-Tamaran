import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from 'src/provider/post-provider';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false,
})
export class Tab4Page implements OnInit {
  // Variabel untuk menyimpan data statistik
  totalPenduduk: number = 0;
  totalLakiLaki: number = 0;
  totalPerempuan: number = 0;
  totalKeluarga: number = 0;
  totalAnak: number = 0;
  totalRemaja: number = 0;
  totalDewasa: number = 0;
  totalLansia: number = 0;
  isLoading: boolean = false;
  
  // Array untuk menyimpan data penduduk
  allData: any[] = [];

  constructor(
    public toastController: ToastController,
    private postPvd: PostProvider
  ) {}

  ngOnInit() {
    this.loadStatistics();
  }

  ionViewWillEnter() {
    this.loadStatistics();
  }

  async loadStatistics() {
    this.isLoading = true;
    
    try {
      // Gunakan endpoint statistik khusus untuk performa yang lebih baik
      await this.getStatisticsData();
      
    } catch (error) {
      console.error('Error loading statistics:', error);
      const toast = await this.toastController.create({
        message: 'Gagal memuat data statistik',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    } finally {
      this.isLoading = false;
    }
  }

  async getStatisticsData() {
    return new Promise((resolve, reject) => {
      let body = {
        aksi: 'getstatistics'
      };
      
      this.postPvd.postData(body, 'action.php').subscribe(
        data => {
          if (data.success) {
            const stats = data.result;
            this.totalPenduduk = stats.total_penduduk;
            this.totalLakiLaki = stats.total_laki_laki;
            this.totalPerempuan = stats.total_perempuan;
            this.totalKeluarga = stats.total_keluarga;
            this.totalAnak = stats.total_anak;
            this.totalRemaja = stats.total_remaja;
            this.totalDewasa = stats.total_dewasa;
            this.totalLansia = stats.total_lansia;
            resolve(stats);
          } else {
            reject('Failed to fetch statistics');
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

  // Fallback method - jika endpoint statistik tidak tersedia
  async getAllData() {
    return new Promise((resolve, reject) => {
      let body = {
        limit: 10000, // Ambil semua data
        start: 0,
        aksi: 'getdata'
      };
      
      this.postPvd.postData(body, 'action.php').subscribe(
        data => {
          if (data.success) {
            this.allData = data.result;
            resolve(data.result);
          } else {
            reject('Failed to fetch data');
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

  calculateStatistics() {
    // Reset semua counter
    this.totalPenduduk = 0;
    this.totalLakiLaki = 0;
    this.totalPerempuan = 0;
    this.totalKeluarga = 0;
    this.totalAnak = 0;
    this.totalRemaja = 0;
    this.totalDewasa = 0;
    this.totalLansia = 0;

    // Hitung statistik berdasarkan data yang ada
    this.allData.forEach(person => {
      // Total penduduk
      this.totalPenduduk++;

      // Berdasarkan jenis kelamin
      if (person.Jenis_Kelamin === 'LAKI-LAKI') {
        this.totalLakiLaki++;
      } else if (person.Jenis_Kelamin === 'PEREMPUAN') {
        this.totalPerempuan++;
      }

      // Total keluarga (kepala keluarga)
      if (person.Kepala_Keluarga === 'IYA') {
        this.totalKeluarga++;
      }

      // Berdasarkan kelompok umur
      const umur = parseInt(person.Umur);
      if (!isNaN(umur)) {
        if (umur >= 0 && umur <= 12) {
          this.totalAnak++;
        } else if (umur >= 13 && umur <= 17) {
          this.totalRemaja++;
        } else if (umur >= 18 && umur <= 59) {
          this.totalDewasa++;
        } else if (umur >= 60) {
          this.totalLansia++;
        }
      }
    });
  }

  async refreshData() {
    const toast = await this.toastController.create({
      message: 'Memperbarui data statistik...',
      duration: 1000
    });
    toast.present();
    
    await this.loadStatistics();
    
    const successToast = await this.toastController.create({
      message: 'Data statistik berhasil diperbarui',
      duration: 2000,
      color: 'success'
    });
    successToast.present();
  }

  // Fungsi helper untuk mendapatkan persentase
  getPercentage(value: number, total: number): number {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  }

  // Fungsi untuk mendapatkan persentase jenis kelamin
  getGenderPercentage(gender: 'male' | 'female'): number {
    if (gender === 'male') {
      return this.getPercentage(this.totalLakiLaki, this.totalPenduduk);
    } else {
      return this.getPercentage(this.totalPerempuan, this.totalPenduduk);
    }
  }
}