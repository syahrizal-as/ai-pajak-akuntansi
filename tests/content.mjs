import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import vm from 'node:vm';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const ctx={window:{}};
for(const file of ['content','datasets'])vm.runInNewContext(await readFile(path.join(root,'assets',file+'.js'),'utf8'),ctx);
const {COURSE,DATASETS,GLOSSARY}=ctx.window;
const obj=id=>{const d=DATASETS.find(d=>d.id===id);return d.rows.map(r=>Object.fromEntries(d.headers.map((h,i)=>[h,r[i]])));};
test('9 substantive modules include the demo content without removed exercise sections',()=>{
 assert.equal(COURSE.length,9);assert.equal(COURSE.reduce((s,m)=>s+m.minutes,0),810);
 for(const [i,m] of COURSE.entries()){
  assert.equal(m.id,i+1);assert.ok(m.title.length>15);assert.equal(m.objectives.length,3);assert.equal(m.competencies.length,3);
  assert.equal(m.concepts.length,5);for(const [h,p] of m.concepts){assert.ok(h.length>8);assert.ok(p.length>180);}
  for(const k of ['tagline','caseTitle','caseText','prompt','expected','summary','safety'])assert.ok(typeof m[k]==='string'&&m[k].length>20,k);
  assert.equal(m.steps,undefined);assert.ok(m.applications.length>=3);assert.ok(m.mistakes.length>=3);assert.equal(m.quiz,undefined);assert.equal(m.exercise,undefined);
 }
 assert.ok(new Set(COURSE.map(m=>m.prompt)).size===9);assert.ok(GLOSSARY.length>=20);
});
test('independent financial calculation reconciles raw ledger, bank, journals and period reports',async()=>{
 const tx=obj('transaksi'),bank=obj('bank'),cash=obj('buku-kas'),coa=obj('coa'),report=obj('laporan');
 assert.equal(tx.length,12);assert.equal(bank.length,10);
 let bankBalance=50000000;for(const r of bank){bankBalance+=r.masuk-r.keluar;assert.equal(r.saldo,bankBalance);}
 let cashBalance=50000000;for(const r of cash){cashBalance+=r.masuk-r.keluar;assert.equal(r.saldo,cashBalance);}
 assert.equal(cashBalance,54250000);assert.equal(bankBalance,54950000);
 assert.equal(bankBalance-cashBalance,700000);
 const duplicate=tx.filter(t=>t.dokumen==='ATK-001');assert.equal(duplicate.length,2);assert.equal(bank.filter(b=>b.referensi==='ATK-001').length,1);
 const unique=tx.filter(t=>t.id!=='T07');assert.equal(unique.length,11);
 const sum=(kind,field='nominal')=>unique.filter(t=>t.jenis===kind).reduce((s,t)=>s+t[field],0);
 const revenue=sum('penjualan_kredit')+sum('penjualan_tunai');const cogs=unique.reduce((s,t)=>s+t.hpp,0);
 const opex=sum('beban_atk')+sum('beban_sewa')+sum('beban_utilitas')+bank.find(t=>t.id==='BK10').keluar;
 assert.equal(revenue,24000000);assert.equal(cogs,14400000);assert.equal(opex,5050000);assert.equal(revenue-cogs-opex,4550000);
 const receivables=12000000+sum('penjualan_kredit')-sum('penerimaan_piutang');
 const payables=20000000+sum('pembelian_kredit')-sum('pembayaran_utang');
 const stock=20000000+sum('pembelian_kredit')-cogs;const equipment=18000000+sum('pembelian_peralatan');
 assert.equal(receivables,2000000);assert.equal(payables,10000000);assert.equal(stock,13600000);assert.equal(equipment,24000000);
 assert.equal(bankBalance+receivables+stock+equipment,payables+80000000+revenue-cogs-opex);
 assert.equal(coa.reduce((s,c)=>s+c.debit_awal-c.kredit_awal,0),0);
 const value=name=>report.find(t=>t.indikator===name).september;
 assert.equal(value('Bank akhir'),bankBalance);assert.equal(value('Pendapatan'),revenue);assert.equal(value('Beban operasional'),opex);assert.equal(value('Total aset sebelum penyusutan'),94550000);
 assert.ok(Math.abs((revenue/20000000-1)*100-20)<1e-8);assert.ok(Math.abs((opex/4000000-1)*100-26.25)<1e-8);
 const journal=await readFile(path.join(root,'data/contoh-jurnal.csv'),'utf8');
 const rows=journal.trim().split(/\r?\n/).slice(1).map(s=>s.split(',').map(x=>x.replace(/^"|"$/g,'')));
 const debits=rows.reduce((s,r)=>s+Number(r[5]),0),credits=rows.reduce((s,r)=>s+Number(r[6]),0);
 assert.equal(debits,100450000);assert.equal(credits,debits);assert.ok(!rows.some(r=>r[0]==='T07'));
 // Reproduce each account balance from exported journals, then compare to independent controls.
 const balances=Object.fromEntries(coa.map(c=>[c.kode,c.debit_awal-c.kredit_awal]));
 for(const r of rows)balances[r[3]]+=Number(r[5])-Number(r[6]);
 assert.equal(balances['1101'],bankBalance);assert.equal(balances['1102'],receivables);assert.equal(balances['2101'],-payables);assert.equal(balances['1103'],stock);assert.equal(balances['1201'],equipment);
});
test('build includes real downloadable files, safe assets, and complete offline archives',async()=>{
 for(const file of ['index.html','assets/content.js','assets/app.js','assets/style.css','assets/datasets.js','assets/favicon.svg',...DATASETS.map(d=>'data/'+d.file),'data/contoh-jurnal.csv','data/dokumen-dummy.html','data/lembar-kerja.md','data/paket-latihan.zip'])assert.ok((await stat(path.join(root,'dist',file))).size>0,file);
 for(const d of DATASETS){const csv=await readFile(path.join(root,'dist/data',d.file),'utf8');assert.equal(csv.trim().split(/\r?\n/).length,d.rows.length+1);assert.ok(csv.startsWith('\uFEFF'));}
 const html=await readFile(path.join(root,'index.html'),'utf8');assert.ok(!/https:\/\/(fonts|cdn)/.test(html));
 for(const file of ['app.js','content.js','datasets.js'])new vm.Script(await readFile(path.join(root,'assets',file),'utf8'));
 execFileSync('/usr/bin/unzip',['-tq',path.join(root,'portal-offline.zip')]);
 execFileSync('/usr/bin/unzip',['-tq',path.join(root,'data/paket-latihan.zip')]);
});
