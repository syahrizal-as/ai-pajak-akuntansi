/* Seluruh nama, transaksi, dan dokumen merupakan simulasi. Nilai rupiah. */
window.DATASETS = [
 {id:'transaksi',title:'Transaksi September 2026',file:'transaksi.csv',description:'12 baris mentah termasuk satu kandidat duplikat. Nominal dokumen untuk latihan pembukuan; rincian pajak belum tersedia, bukan berarti pajak nol.',headers:['id','tanggal','dokumen','jenis','pihak','deskripsi','nominal','hpp','referensi_bank','status_bukti'],rows:[
 ['T01','2026-09-02','S-001','penjualan_kredit','Pelanggan A','Penjualan barang kredit',15000000,9000000,'','lengkap'],
 ['T02','2026-09-03','B-001','pembelian_kredit','Vendor B','Pembelian persediaan',8000000,0,'','lengkap'],
 ['T03','2026-09-04','RC-001','penerimaan_piutang','Pelanggan C','Pelunasan piutang awal',10000000,0,'BK01','lengkap'],
 ['T04','2026-09-05','PAY-001','pembayaran_utang','Vendor D','Pembayaran utang awal',10000000,0,'BK02','lengkap'],
 ['T05','2026-09-07','SEWA-001','beban_sewa','Vendor E','Sewa September',3000000,0,'BK03','lengkap'],
 ['T06','2026-09-08','ATK-001','beban_atk','Vendor F','Pembelian alat tulis',750000,0,'BK04','lengkap'],
 ['T07','2026-09-08','ATK-001','beban_atk','Vendor F','Impor ulang baris T06',750000,0,'BK04','kandidat_duplikat'],
 ['T08','2026-09-12','S-002','penjualan_tunai','Pelanggan G','Penjualan barang tunai',9000000,5400000,'BK05','lengkap'],
 ['T09','2026-09-15','PAY-002','pembayaran_utang','Vendor B','Pelunasan B-001',8000000,0,'BK06','lengkap'],
 ['T10','2026-09-20','UTIL-001','beban_utilitas','Vendor H','Pembayaran utilitas',1250000,0,'BK07','invoice_belum_ada'],
 ['T11','2026-09-25','RC-002','penerimaan_piutang','Pelanggan A','Pelunasan S-001',15000000,0,'BK08','lengkap'],
 ['T12','2026-09-28','ASET-001','pembelian_peralatan','Vendor I','Peralatan kantor',6000000,0,'BK09','review_kebijakan_aset']
 ]},
 {id:'bank',title:'Rekening koran simulasi',file:'bank.csv',description:'Saldo awal Rp50.000.000. Mutasi bank independen dari data impor transaksi; BK10 belum ada pada buku kas mentah.',headers:['id','tanggal','referensi','deskripsi','masuk','keluar','saldo'],rows:[
 ['BK01','2026-09-04','RC-001','Pelunasan piutang awal',10000000,0,60000000],
 ['BK02','2026-09-05','PAY-001','Pembayaran utang awal',0,10000000,50000000],
 ['BK03','2026-09-07','SEWA-001','Sewa September',0,3000000,47000000],
 ['BK04','2026-09-08','ATK-001','Alat tulis',0,750000,46250000],
 ['BK05','2026-09-12','S-002','Penjualan tunai',9000000,0,55250000],
 ['BK06','2026-09-15','PAY-002','Pelunasan B-001',0,8000000,47250000],
 ['BK07','2026-09-20','UTIL-001','Utilitas',0,1250000,46000000],
 ['BK08','2026-09-25','RC-002','Pelunasan S-001',15000000,0,61000000],
 ['BK09','2026-09-28','ASET-001','Peralatan kantor',0,6000000,55000000],
 ['BK10','2026-09-30','ADM-001','Biaya administrasi bank',0,50000,54950000]
 ]},
 {id:'buku-kas',title:'Buku kas mentah',file:'buku-kas.csv',description:'Memuat impor ganda ATK-001 dan belum memuat biaya bank. Saldo akhir sebelum koreksi Rp54.250.000.',headers:['id_transaksi','tanggal','referensi','masuk','keluar','saldo'],rows:[
 ['T03','2026-09-04','RC-001',10000000,0,60000000],['T04','2026-09-05','PAY-001',0,10000000,50000000],['T05','2026-09-07','SEWA-001',0,3000000,47000000],['T06','2026-09-08','ATK-001',0,750000,46250000],['T07','2026-09-08','ATK-001',0,750000,45500000],['T08','2026-09-12','S-002',9000000,0,54500000],['T09','2026-09-15','PAY-002',0,8000000,46500000],['T10','2026-09-20','UTIL-001',0,1250000,45250000],['T11','2026-09-25','RC-002',15000000,0,60250000],['T12','2026-09-28','ASET-001',0,6000000,54250000]
 ]},
 {id:'coa',title:'Daftar akun & saldo awal',file:'coa.csv',description:'COA latihan yang disederhanakan. Saldo awal debit dan kredit masing-masing Rp100.000.000; bukan bagan akun wajib untuk semua entitas.',headers:['kode','nama','kelompok','debit_awal','kredit_awal'],rows:[
 ['1101','Bank','Aset',50000000,0],['1102','Piutang usaha','Aset',12000000,0],['1103','Persediaan','Aset',20000000,0],['1201','Peralatan','Aset',18000000,0],['2101','Utang usaha','Liabilitas',0,20000000],['3101','Modal awal','Ekuitas',0,80000000],['4101','Penjualan','Pendapatan',0,0],['5101','Harga pokok penjualan','Beban',0,0],['6101','Beban sewa','Beban',0,0],['6102','Beban ATK','Beban',0,0],['6103','Beban utilitas','Beban',0,0],['6104','Beban administrasi bank','Beban',0,0]
 ]},
 {id:'laporan',title:'Ringkasan keuangan dua periode',file:'laporan.csv',description:'Angka September sesudah koreksi impor ganda dan biaya bank. Ringkasan sederhana sebelum penyusutan dan pajak, bukan laporan sesuai SAK yang lengkap. Agustus hanya data pembanding laba rugi.',headers:['indikator','agustus','september','satuan'],rows:[
 ['Pendapatan',20000000,24000000,'IDR'],['HPP',12000000,14400000,'IDR'],['Laba kotor',8000000,9600000,'IDR'],['Beban operasional',4000000,5050000,'IDR'],['Hasil sebelum penyusutan dan pajak',4000000,4550000,'IDR'],['Bank akhir','',54950000,'IDR'],['Piutang akhir','',2000000,'IDR'],['Persediaan akhir','',13600000,'IDR'],['Peralatan akhir sebelum penyusutan','',24000000,'IDR'],['Total aset sebelum penyusutan','',94550000,'IDR'],['Utang akhir','',10000000,'IDR'],['Modal dan hasil periode','',84550000,'IDR']
 ]},
 {id:'dokumen',title:'Register kelengkapan dokumen',file:'dokumen.csv',description:'Prioritas dan bukti yang perlu diminta; tidak memuat NIK, NPWP, rekening, atau alamat nyata.',headers:['id','dokumen','terkait','kondisi','tindak_lanjut'],rows:[
 ['D01','S-001','T01/T11','invoice tersedia','Cocokkan pengiriman dan penerimaan'],['D02','B-001','T02/T09','invoice tersedia','Cocokkan penerimaan barang dan pelunasan'],['D03','ATK-001','T06/T07','satu kuitansi, dua baris impor','Konfirmasi satu pembayaran lalu keluarkan T07 dari posting'],['D04','UTIL-001','T10','invoice belum tersedia','Minta invoice; pembayaran bank bukan rincian pajak'],['D05','ASET-001','T12','invoice tersedia','Review kapitalisasi, masa manfaat, dan kebijakan entitas'],['D06','Rincian pajak dokumen','seluruh dokumen','tidak disediakan pada simulasi','Tentukan kebutuhan sumber dan dokumen; jangan mengarang DPP atau tarif'],['D07','Daftar umur piutang','saldo awal','tanggal jatuh tempo belum tersedia','Minta rincian jatuh tempo sebelum menghitung aging']
 ]}
];
