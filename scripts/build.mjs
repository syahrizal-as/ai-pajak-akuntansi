import {readFile,writeFile,mkdir,copyFile,cp,rm} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const ctx={window:{}};vm.runInNewContext(await readFile(path.join(root,'assets/datasets.js'),'utf8'),ctx);
const csv=rows=>'\uFEFF'+rows.map(r=>r.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\r\n')+'\r\n';
for(const d of ctx.window.DATASETS)await writeFile(path.join(root,'data',d.file),csv([d.headers,...d.rows]));
const source=ctx.window.DATASETS.find(d=>d.id==='transaksi').rows;
const map={penjualan_kredit:['1102','4101'],pembelian_kredit:['1103','2101'],penerimaan_piutang:['1101','1102'],pembayaran_utang:['2101','1101'],beban_sewa:['6101','1101'],beban_atk:['6102','1101'],penjualan_tunai:['1101','4101'],beban_utilitas:['6103','1101'],pembelian_peralatan:['1201','1101']};
const names=Object.fromEntries(ctx.window.DATASETS.find(d=>d.id==='coa').rows.map(r=>[r[0],r[1]]));
const journal=[];
function pair(id,date,doc,d,k,n,status){journal.push([id,date,doc,d,names[d],n,0,status],[id,date,doc,k,names[k],0,n,status]);}
for(const r of source){if(r[0]==='T07')continue;const [d,k]=map[r[3]];pair(r[0],r[1],r[2],d,k,r[6],r[0]==='T10'?'draft_invoice_tertunda':r[0]==='T12'?'asumsi_kapitalisasi_perlu_review':'draft_perlu_review');if(r[7]>0)pair(r[0]+'-HPP',r[1],r[2],'5101','1103',r[7],'draft_HPP_simulasi');}
pair('BK10','2026-09-30','ADM-001','6104','1101',50000,'draft_dari_rekening_koran');
await writeFile(path.join(root,'data/contoh-jurnal.csv'),csv([['id','tanggal','dokumen','kode_akun','nama_akun','debit','kredit','status'],...journal]));
const total=journal.reduce((s,r)=>s+r[5],0);
if(total!==100450000||journal.reduce((s,r)=>s+r[6],0)!==total)throw Error('Kontrol jurnal gagal');
await writeFile(path.join(root,'data/BACA-DULU.txt'),'PAKET SIMULASI — PT ASA MITRA KONSULTAN\nPeriode September 2026. Semua pihak fiktif, nilai rupiah.\nCSV UTF-8, pemisah koma. Kolom kosong bukan nol.\n12 baris transaksi mentah memuat kandidat duplikat T07.\nRincian pajak, penyusutan, dan jatuh tempo piutang tidak tersedia.\ncontoh-jurnal.csv adalah bahan pembahasan, bukan hasil final yang disetujui.\nBuka dokumen-dummy.html untuk invoice dan kuitansi; cetak melalui browser.\nGunakan lembar-kerja.md untuk bukti praktik, sumber, dan evaluasi.\n');
vm.runInNewContext(await readFile(path.join(root,'assets/content.js'),'utf8'),ctx);
const promptFiles=[];
for(const m of ctx.window.COURSE){
 const number=String(m.id).padStart(2,'0');
 let body='BAHAN SHARING AI — DATA SIMULASI\nTopik: '+m.title+'\nTidak ada data klien nyata.\n';
 for(const name of m.uploadFiles){if(name.endsWith('.pdf'))continue;body+='\nSUMBER: '+name+'\n'+(await readFile(path.join(root,'data',name),'utf8')).replace(/\r\n/g,'\n').replace(/^\uFEFF/,'').trimEnd()+'\n';}
 const demo='demo-topik-'+number+'.txt',prompt='prompt-topik-'+number+'.txt';
 await writeFile(path.join(root,'data',demo),body.trimEnd()+'\n');await writeFile(path.join(root,'data',prompt),m.prompt+'\n');promptFiles.push(demo,prompt);
}
const dataFiles=[...ctx.window.DATASETS.map(d=>d.file),'contoh-jurnal.csv','dokumen-dummy.html','catatan-sharing.txt','BACA-DULU.txt','invoice-demo.pdf','brief-workflow.txt','skenario-keamanan.txt',...promptFiles];
// Bangun ZIP baru tanpa menumpuk salinan berkas dari versi sebelumnya.
await rm(path.join(root,'data/paket-latihan.zip'),{force:true});
execFileSync('/usr/bin/zip',['-q',path.join(root,'data/paket-latihan.zip'),...dataFiles],{cwd:path.join(root,'data')});
const dist=path.join(root,'dist');await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
await copyFile(path.join(root,'index.html'),path.join(dist,'index.html'));
await cp(path.join(root,'assets'),path.join(dist,'assets'),{recursive:true});
await cp(path.join(root,'data'),path.join(dist,'data'),{recursive:true});
await copyFile(path.join(root,'README.md'),path.join(dist,'README.md'));
await rm(path.join(root,'portal-offline.zip'),{force:true});
execFileSync('/usr/bin/zip',['-qr',path.join(root,'portal-offline.zip'),'.'],{cwd:dist});
console.log(`Build berhasil: 9 modul, ${dataFiles.length} bahan latihan, jurnal debit/kredit Rp${total.toLocaleString('id-ID')}.\nOutput: pajak/dist/ dan pajak/portal-offline.zip. Tidak ada deployment.`);
