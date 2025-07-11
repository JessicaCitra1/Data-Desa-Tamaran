<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');

include "db_config.php";

$postjson = json_decode(file_get_contents('php://input'), true);
$aksi = strip_tags($postjson['aksi']);
$data = array();

switch ($aksi) {

    // Tambah Data Penduduk
    case "add_register":
        $NIK                = filter_var($postjson['NIK'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $Nama               = filter_var($postjson['Nama'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $Tempat_TanggalLahir= filter_var($postjson['Tempat_TanggalLahir'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $Umur               = filter_var($postjson['Umur'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $Jenis_Kelamin      = filter_var($postjson['Jenis_Kelamin'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $Golongan_Darah     = filter_var($postjson['Golongan_Darah'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $Alamat             = filter_var($postjson['Alamat'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $Agama              = filter_var($postjson['Agama'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $Status_Menikah     = filter_var($postjson['Status_Menikah'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $Pekerjaan          = filter_var($postjson['Pekerjaan'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $Kepala_Keluarga    = filter_var($postjson['Kepala_Keluarga'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $No_HP              = filter_var($postjson['No_HP'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

        try {
            $sql = "INSERT INTO penduduk 
                        (NIK, Nama, Tempat_TanggalLahir, Umur, Jenis_Kelamin, Golongan_Darah, Alamat, Agama, Status_Menikah, Pekerjaan, Kepala_Keluarga, No_HP)
                    VALUES 
                        (:NIK, :Nama, :Tempat_TanggalLahir, :Umur, :Jenis_Kelamin, :Golongan_Darah, :Alamat, :Agama, :Status_Menikah, :Pekerjaan, :Kepala_Keluarga, :No_HP)";

            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':NIK', $NIK);
            $stmt->bindParam(':Nama', $Nama);
            $stmt->bindParam(':Tempat_TanggalLahir', $Tempat_TanggalLahir);
            $stmt->bindParam(':Umur', $Umur);
            $stmt->bindParam(':Jenis_Kelamin', $Jenis_Kelamin);
            $stmt->bindParam(':Golongan_Darah', $Golongan_Darah);
            $stmt->bindParam(':Alamat', $Alamat);
            $stmt->bindParam(':Agama', $Agama);
            $stmt->bindParam(':Status_Menikah', $Status_Menikah);
            $stmt->bindParam(':Pekerjaan', $Pekerjaan);
            $stmt->bindParam(':Kepala_Keluarga', $Kepala_Keluarga);
            $stmt->bindParam(':No_HP', $No_HP);

            $stmt->execute();

            echo json_encode(array('success' => $stmt ? true : false));
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
        break;

    // Ambil Data Penduduk
    case "getdata":
        $limit = filter_var($postjson['limit'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $start = filter_var($postjson['start'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

        try {
            $sql = "SELECT * FROM penduduk ORDER BY id DESC LIMIT :start, :limit";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':start', $start, PDO::PARAM_INT);
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->execute();

            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($rows as $row) {
                $data[] = $row;
            }

            echo json_encode(array('success' => true, 'result' => $data));
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
        break;

    // Hapus Data
    case "delete":
        $NIK = filter_var($postjson['nik'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

        try {
            $checkSql = "SELECT COUNT(*) as count FROM penduduk WHERE NIK = :NIK";
            $checkStmt = $pdo->prepare($checkSql);
            $checkStmt->bindParam(':NIK', $NIK);
            $checkStmt->execute();
            $checkResult = $checkStmt->fetch(PDO::FETCH_ASSOC);

            if ($checkResult['count'] == 0) {
                echo json_encode(array('success' => false, 'msg' => 'Data tidak ditemukan'));
                break;
            }

            $sql = "DELETE FROM penduduk WHERE NIK = :NIK";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':NIK', $NIK);
            $stmt->execute();

            $msg = $stmt->rowCount() > 0 ? 'Data berhasil dihapus' : 'Gagal menghapus data';
            echo json_encode(array('success' => $stmt->rowCount() > 0, 'msg' => $msg));
        } catch (PDOException $e) {
            echo json_encode(array('success' => false, 'msg' => 'Database error: ' . $e->getMessage()));
        }
        break;

    // Ambil Detail Data
    case "getdetail":
        $NIK = filter_var($postjson['nik'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

        try {
            $sql = "SELECT * FROM penduduk WHERE NIK = :NIK";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':NIK', $NIK);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row) {
                echo json_encode(array('success' => true, 'result' => $row));
            } else {
                echo json_encode(array('success' => false, 'msg' => 'Data tidak ditemukan'));
            }
        } catch (PDOException $e) {
            echo json_encode(array('success' => false, 'msg' => 'Database error: ' . $e->getMessage()));
        }
        break;

    // Cari Penduduk berdasarkan NIK
    case "search_penduduk":
        try {
            $searchTerm = filter_var($postjson['searchTerm'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $sql = "SELECT * FROM penduduk WHERE NIK LIKE :searchTerm ORDER BY id DESC";
            $stmt = $pdo->prepare($sql);
            $searchPattern = "%{$searchTerm}%";
            $stmt->bindParam(':searchTerm', $searchPattern);
            $stmt->execute();

            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $result = !empty($rows) ? array('success' => true, 'result' => $rows) : array('success' => false, 'msg' => 'Tidak ada data ditemukan');

            echo json_encode($result);
        } catch (PDOException $e) {
            echo json_encode(array('success' => false, 'msg' => $e->getMessage()));
        }
        break;

    // Update Data Penduduk
    case "update_penduduk":
        try {
            $id                 = filter_var($postjson['id'], FILTER_SANITIZE_NUMBER_INT);
            $NIK                = filter_var($postjson['NIK'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $Nama               = filter_var($postjson['Nama'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $Tempat_TanggalLahir= filter_var($postjson['Tempat_TanggalLahir'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $Umur               = filter_var($postjson['Umur'], FILTER_SANITIZE_NUMBER_INT);
            $Jenis_Kelamin      = filter_var($postjson['Jenis_Kelamin'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $Golongan_Darah     = filter_var($postjson['Golongan_Darah'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $Alamat             = filter_var($postjson['Alamat'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $Agama              = filter_var($postjson['Agama'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $Status_Menikah     = filter_var($postjson['Status_Menikah'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $Pekerjaan          = filter_var($postjson['Pekerjaan'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $Kepala_Keluarga    = filter_var($postjson['Kepala_Keluarga'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $No_HP              = filter_var($postjson['No_HP'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

            $sql = "UPDATE penduduk SET 
                        NIK = :NIK, Nama = :Nama, Tempat_TanggalLahir = :Tempat_TanggalLahir, Umur = :Umur,
                        Jenis_Kelamin = :Jenis_Kelamin, Golongan_Darah = :Golongan_Darah, Alamat = :Alamat,
                        Agama = :Agama, Status_Menikah = :Status_Menikah, Pekerjaan = :Pekerjaan,
                        Kepala_Keluarga = :Kepala_Keluarga, No_HP = :No_HP 
                    WHERE id = :id";

            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->bindParam(':NIK', $NIK);
            $stmt->bindParam(':Nama', $Nama);
            $stmt->bindParam(':Tempat_TanggalLahir', $Tempat_TanggalLahir);
            $stmt->bindParam(':Umur', $Umur);
            $stmt->bindParam(':Jenis_Kelamin', $Jenis_Kelamin);
            $stmt->bindParam(':Golongan_Darah', $Golongan_Darah);
            $stmt->bindParam(':Alamat', $Alamat);
            $stmt->bindParam(':Agama', $Agama);
            $stmt->bindParam(':Status_Menikah', $Status_Menikah);
            $stmt->bindParam(':Pekerjaan', $Pekerjaan);
            $stmt->bindParam(':Kepala_Keluarga', $Kepala_Keluarga);
            $stmt->bindParam(':No_HP', $No_HP);
            $stmt->execute();

            echo json_encode(array('success' => $stmt ? true : false));
        } catch (PDOException $e) {
            echo json_encode(array('success' => false, 'msg' => $e->getMessage()));
        }
        break;

    // Statistik Penduduk
    case "getstatistics":
        try {
            $sql = "SELECT 
                        COUNT(*) as total_penduduk,
                        SUM(CASE WHEN Jenis_Kelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) as total_laki_laki,
                        SUM(CASE WHEN Jenis_Kelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) as total_perempuan,
                        SUM(CASE WHEN Kepala_Keluarga = 'IYA' THEN 1 ELSE 0 END) as total_keluarga,
                        SUM(CASE WHEN CAST(Umur AS UNSIGNED) BETWEEN 0 AND 12 THEN 1 ELSE 0 END) as total_anak,
                        SUM(CASE WHEN CAST(Umur AS UNSIGNED) BETWEEN 13 AND 17 THEN 1 ELSE 0 END) as total_remaja,
                        SUM(CASE WHEN CAST(Umur AS UNSIGNED) BETWEEN 18 AND 59 THEN 1 ELSE 0 END) as total_dewasa,
                        SUM(CASE WHEN CAST(Umur AS UNSIGNED) >= 60 THEN 1 ELSE 0 END) as total_lansia
                    FROM penduduk";

            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                echo json_encode(array('success' => true, 'result' => $result));
            } else {
                echo json_encode(array('success' => false, 'msg' => 'Tidak ada data ditemukan'));
            }
        } catch (PDOException $e) {
            echo json_encode(array('success' => false, 'msg' => 'Database error: ' . $e->getMessage()));
        }
        break;
}
?>
