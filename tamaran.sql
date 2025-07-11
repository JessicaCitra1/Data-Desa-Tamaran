-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Jul 2025 pada 14.35
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tamaran`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `penduduk`
--

CREATE TABLE `penduduk` (
  `id` int(11) NOT NULL,
  `NIK` bigint(16) NOT NULL,
  `Nama` varchar(250) NOT NULL,
  `Tempat_TanggalLahir` varchar(250) NOT NULL,
  `Umur` int(3) NOT NULL,
  `Jenis_Kelamin` varchar(250) NOT NULL,
  `Golongan_Darah` varchar(250) NOT NULL,
  `Alamat` varchar(250) NOT NULL,
  `Agama` varchar(250) NOT NULL,
  `Status_Menikah` varchar(250) NOT NULL,
  `Pekerjaan` varchar(250) NOT NULL,
  `Kepala_Keluarga` varchar(250) NOT NULL,
  `No_HP` bigint(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `penduduk`
--

INSERT INTO `penduduk` (`id`, `NIK`, `Nama`, `Tempat_TanggalLahir`, `Umur`, `Jenis_Kelamin`, `Golongan_Darah`, `Alamat`, `Agama`, `Status_Menikah`, `Pekerjaan`, `Kepala_Keluarga`, `No_HP`) VALUES
(1, 3201010000010001, 'Rina Andini', 'Medan, 2015-04-12', 9, 'PEREMPUAN', 'A', 'Desa Tamaran', 'ISLAM', 'BELUM', '-', 'TIDAK', 628123456001),
(2, 3201010000010002, 'Fajar Ramadhan', 'Binjai, 2014-08-21', 10, 'LAKI-LAKI', 'B', 'Desa Tamaran', 'ISLAM', 'BELUM', '-', 'TIDAK', 628123456002),
(3, 3201010000010003, 'Nadia Salsabila', 'Pematang Siantar, 2013-11-30', 11, 'PEREMPUAN', 'O', 'Desa Tamaran', 'ISLAM', 'BELUM', '-', 'TIDAK', 628123456003),
(4, 3201010000010004, 'Andi Pratama', 'Tanjungbalai, 2009-01-15', 15, 'LAKI-LAKI', 'A', 'Desa Tamaran', 'ISLAM', 'BELUM', 'Pelajar', 'TIDAK', 628123456004),
(5, 3201010000010005, 'Lestari Ayu', 'Tebing Tinggi, 2008-07-25', 16, 'PEREMPUAN', 'B', 'Desa Tamaran', 'ISLAM', 'BELUM', 'Pelajar', 'TIDAK', 628123456005),
(6, 3201010000010006, 'Riko Firmansyah', 'Medan, 2007-09-10', 17, 'LAKI-LAKI', 'AB', 'Desa Tamaran', 'ISLAM', 'BELUM', 'Pelajar', 'TIDAK', 628123456006),
(7, 3201010000010007, 'Budi Santoso', 'Binjai, 1990-05-10', 35, 'LAKI-LAKI', 'A', 'Desa Tamaran', 'ISLAM', 'SUDAH', 'Karyawan', 'IYA', 628123456007),
(8, 3201010000010008, 'Sinta Dewi', 'Pematang Siantar, 1991-06-11', 34, 'PEREMPUAN', 'B', 'Desa Tamaran', 'ISLAM', 'SUDAH', 'Ibu Rumah Tangga', 'TIDAK', 628123456008),
(9, 3201010000010009, 'Rahmat Hidayat', 'Tanjungbalai, 1985-03-22', 40, 'LAKI-LAKI', 'AB', 'Desa Tamaran', 'ISLAM', 'SUDAH', 'Wiraswasta', 'IYA', 628123456009),
(10, 3201010000010010, 'Putri Anggraini', 'Tebing Tinggi, 1986-02-14', 39, 'PEREMPUAN', 'O', 'Desa Tamaran', 'ISLAM', 'SUDAH', 'Guru', 'TIDAK', 628123456010),
(11, 3201010000010011, 'Yusuf Maulana', 'Medan, 1992-12-05', 32, 'LAKI-LAKI', 'A', 'Desa Tamaran', 'ISLAM', 'SUDAH', 'Dokter', 'IYA', 628123456011),
(12, 3201010000010012, 'Dina Kurnia', 'Binjai, 1993-08-19', 31, 'PEREMPUAN', 'B', 'Desa Tamaran', 'ISLAM', 'SUDAH', 'Perawat', 'TIDAK', 628123456012),
(13, 3201010000010013, 'Suharto', 'Pematang Siantar, 1950-01-01', 75, 'LAKI-LAKI', 'A', 'Desa Tamaran', 'ISLAM', 'SUDAH', 'Pensiunan', 'TIDAK', 628123456013),
(14, 3201010000010090, 'Rohani', 'Tanjungbalai, 1955-05-05', 70, 'PEREMPUAN', 'B', 'Desa Tamaran', 'ISLAM', 'SUDAH', 'Ibu Rumah Tangga', 'TIDAK', 628123456014),
(15, 3201010000010023, 'Slamet Widodo', 'Tebing Tinggi, 1960-10-10', 65, 'LAKI-LAKI', 'AB', 'Desa Tamaran', 'ISLAM', 'SUDAH', 'Pensiunan', 'TIDAK', 628123456015),
(16, 1234567890123456, 'Putri ', 'Batang Serangan 09 FebruarI 2004', 20, 'PEREMPUAN', 'O', 'Batang Serangan', 'ISLAM', 'BELUM', 'Mahasiswa', 'TIDAK', 87798654312),
(17, 907865123456789, 'Nazwa', 'Batang Serangan 12 Mei 2004', 20, 'PEREMPUAN', 'B', 'Batang Serangan', 'ISLAM', 'BELUM', 'Mahasiawa', 'TIDAK', 89765432145);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `penduduk`
--
ALTER TABLE `penduduk`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `penduduk`
--
ALTER TABLE `penduduk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
