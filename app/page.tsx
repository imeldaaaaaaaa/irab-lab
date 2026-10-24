"use client";

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { exercises, positions, wordKinds, caseStates, signs, type Exercise, type WordKind, type CaseState, type Sign } from '@/data/exercises';
import { supabase } from '@/lib/supabase/client';

type Role = 'Siswa' | 'Guru' | 'Admin';
type User = { name: string; role: Role; email: string };
type Answer = { kind: WordKind; position: string; state: CaseState; sign: Sign };
type ProgressRecord = { user: User; correct: number; attempts: number; completed: string[]; updatedAt: string };
const blank: Answer = { kind: 'Isim', position: 'Mubtada’', state: 'Marfū‘', sign: 'Ḍammah' };
const lessonGroups = [
 {title:'Dasar-dasar kalimah',desc:'Kenali jenis kata dan sifatnya.',topics:['Isim, fi‘il, huruf','Mu‘rab dan mabnī','Ma‘rifah dan nakirah','Mufrad, mutsanna, jamak']},
 {title:'Jumlah ismiyyah',desc:'Susunan kalimat yang diawali isim.',topics:['Mubtada’ dan khabar','Khabar mufrad, jumlah, syibh jumlah','Kāna wa akhawātuhā','Inna wa akhawātuhā']},
 {title:'Jumlah fi‘liyyah',desc:'Fi‘il, pelaku, objek, dan pelengkap.',topics:['Fi‘il māḍī, muḍāri‘, amr','Fā‘il dan nā’ib al-fā‘il','Maf‘ūl bih','Maf‘ūl muṭlaq, li-ajlih, fīh']},
 {title:'Tawābi‘ dan struktur isim',desc:'Kata yang mengikuti kata lain.',topics:['Na‘t dan man‘ūt','‘Aṭaf dan ma‘ṭūf','Taukīd','Badal','Muḍāf dan muḍāf ilaih']},
 {title:'Huruf dan i‘rab lanjutan',desc:'Pengaruh amil pada kata sesudahnya.',topics:['Huruf jar dan isim majrūr','Fi‘il muḍāri‘ manṣūb','Fi‘il muḍāri‘ majzūm','Ḥāl dan tamyīz','Istitsnā’ dan munādā']}
];
function topicMatches(e:Exercise, topic:string){
 const text=(e.title+' '+e.topic).toLocaleLowerCase();
 const aliases:Record<string,string[]>={
  'Isim, fi‘il, huruf':['fi‘il','huruf','jumlah','mubtada’'], 'Mu‘rab dan mabnī':['mabnī','marfū‘','manṣūb','majrūr','majzūm'],
  'Ma‘rifah dan nakirah':['nakirah','ma‘rifah'], 'Mufrad, mutsanna, jamak':['mutsanna','jamak','mufrad'],
  'Mubtada’ dan khabar':['mubtada’','khabar'], 'Khabar mufrad, jumlah, syibh jumlah':['khabar'],
  'Kāna wa akhawātuhā':['kāna','isim-khabarnya'], 'Inna wa akhawātuhā':['inna','isim-khabarnya'],
  'Fi‘il māḍī, muḍāri‘, amr':['fi‘il','muḍāri‘'], 'Fā‘il dan nā’ib al-fā‘il':['fā‘il','nā’ib al-fā‘il'],
  'Maf‘ūl bih':['maf‘ūl bih','maf‘ūl'], 'Maf‘ūl muṭlaq, li-ajlih, fīh':['maf‘ūl','ẓarf'],
  'Na‘t dan man‘ūt':['na‘t','man‘ūt'], '‘Aṭaf dan ma‘ṭūf':['‘aṭaf','ma‘ṭūf'], 'Taukīd':['taukīd'], 'Badal':['badal'],
  'Muḍāf dan muḍāf ilaih':['muḍāf','iḍāfah'], 'Huruf jar dan isim majrūr':['jar','majrūr'],
  'Fi‘il muḍāri‘ manṣūb':['manṣūb','لن'], 'Fi‘il muḍāri‘ majzūm':['majzūm','لم'],
  'Ḥāl dan tamyīz':['ḥāl','tamyīz'], 'Istitsnā’ dan munādā':['istitsnā','munādā']
 };
 const keys=aliases[topic]||[topic.toLocaleLowerCase()]; return keys.some(k=>text.includes(k));
}
const targetPositions: Record<string, string[]> = {
 'Isim, fi‘il, huruf':['Mubtada’','Fi‘il māḍī','Huruf jar'],
 'Mu‘rab dan mabnī':['Fi‘il māḍī','Mubtada’','Isim majrūr'],
 'Ma‘rifah dan nakirah':['Mubtada’','Fā‘il','Maf‘ūl bih'],
 'Mufrad, mutsanna, jamak':['Mubtada’','Fā‘il','Maf‘ūl bih'],
 'Mubtada’ dan khabar':['Mubtada’','Khabar'],
 'Khabar mufrad, jumlah, syibh jumlah':['Khabar','Khabar إنّ','Khabar كان'],
 'Kāna wa akhawātuhā':['Isim كان','Khabar كان','Fi‘il nāqiṣ'],
 'Inna wa akhawātuhā':['Isim إنّ','Khabar إنّ','Huruf nāsikh'],
 'Fi‘il māḍī, muḍāri‘, amr':['Fi‘il māḍī','Fi‘il muḍāri‘'],
 'Fā‘il dan nā’ib al-fā‘il':['Fā‘il','Nā’ib al-fā‘il'],
 'Maf‘ūl bih':['Maf‘ūl bih'],
 'Maf‘ūl muṭlaq, li-ajlih, fīh':['Maf‘ūl bih','Ẓarf makān'],
 'Na‘t dan man‘ūt':['Na‘t'],
 '‘Aṭaf dan ma‘ṭūf':['Ma‘ṭūf','Huruf ‘aṭaf'],
 'Taukīd':['Mubtada’','Fā‘il'],
 'Badal':['Badal'],
 'Muḍāf dan muḍāf ilaih':['Muḍāf ilaih','Mubtada’'],
 'Huruf jar dan isim majrūr':['Isim majrūr','Huruf jar'],
 'Fi‘il muḍāri‘ manṣūb':['Fi‘il muḍāri‘'],
 'Fi‘il muḍāri‘ majzūm':['Fi‘il muḍāri‘'],
 'Ḥāl dan tamyīz':['Ḥāl'],
 'Istitsnā’ dan munādā':['Isim majrūr','Maf‘ūl bih']
};
function buildLearningQuestions(): Exercise[] {
 const topics=lessonGroups.flatMap(group=>group.topics);
 const result: Exercise[]=[];
 topics.forEach((topic,topicIndex)=>{
  const desired=targetPositions[topic]||[];
  let candidates=exercises.filter(e=>topicMatches(e,topic));
  if(!candidates.length) candidates=exercises;
  let options=candidates.flatMap(seed=>seed.words.filter(w=>desired.some(d=>w.position.toLocaleLowerCase().includes(d.toLocaleLowerCase()))).map(word=>({seed,word})));
  if(!options.length) options=candidates.flatMap(seed=>seed.words.map(word=>({seed,word})));
  for(let i=0;i<10;i++){
   const option=options[i%options.length];
   result.push({...option.seed,id:`q-${topicIndex}-${i}`,title:`${topic} — Soal ${String(i+1).padStart(2,'0')}`,topic,words:[option.word],reference:'',context:`Fokus soal: ${topic}. Analisis kata yang disorot pada kalimat ini. Setiap soal dihitung satu kali dalam penilaian materi.`});
  }
 });
 return result;
}
const learningQuestions = buildLearningQuestions();
function Icon({children}:{children:ReactNode}) { return <span className="icon" aria-hidden="true">{children}</span>; }
function readStore<T>(key:string,fallback:T):T { try { if(typeof window==='undefined') return fallback; const raw=localStorage.getItem(key); return raw?JSON.parse(raw) as T:fallback; } catch { return fallback; } }
export default function Home(){
 const [selectedTopic,setSelectedTopic]=useState(lessonGroups[0].topics[0]);
 const [exerciseId,setExerciseId]=useState('q-0-0'); const [wordIndex,setWordIndex]=useState(0);
 const [answers,setAnswers]=useState<Record<string,Answer>>({}); const [checked,setChecked]=useState(false); const [hint,setHint]=useState(false);
 const [completed,setCompleted]=useState<string[]>([]); const [user,setUser]=useState<User|null>(null); const [allProgress,setAllProgress]=useState<ProgressRecord[]>([]);
 const [showLogin,setShowLogin]=useState(false); const [loginName,setLoginName]=useState(''); const [loginEmail,setLoginEmail]=useState(''); const [loginPassword,setLoginPassword]=useState(''); const [authMode,setAuthMode]=useState<'signin'|'signup'>('signin'); const [inviteCode,setInviteCode]=useState('');
 const [activeTab,setActiveTab]=useState<'Latihan'|'Materi'|'Progres'|'Panel'>('Latihan'); const [notice,setNotice]=useState('');
 useEffect(()=>{setAllProgress(readStore<ProgressRecord[]>('irab_demo_records',[]));if(supabase){void (async()=>{const {data:{user:authUser}}=await supabase.auth.getUser();if(!authUser)return;const {data:profile}=await supabase.from('profiles').select('full_name, role').eq('id',authUser.id).maybeSingle();if(profile&&authUser.email){const role=profile.role==='admin'?'Admin':profile.role==='teacher'?'Guru':'Siswa';setUser({name:profile.full_name||authUser.email.split('@')[0],email:authUser.email,role});}})();}else{const savedUser=readStore<User|null>('irab_demo_user',null);setUser(savedUser?.role==='Siswa'?savedUser:null);}},[]);
 useEffect(()=>{if(user?.role==='Siswa'){setCompleted(readStore<string[]>('irab_demo_progress_'+user.email,[]));}},[user]);
 const available=useMemo(()=>learningQuestions.filter(e=>e.topic===selectedTopic),[selectedTopic]);
 const exercise=available.find(e=>e.id===exerciseId)||available[0]||learningQuestions[0]; const activeIndex=Math.min(wordIndex,exercise.words.length-1); const word=exercise.words[activeIndex];
 const key=`${exercise.id}:${activeIndex}`; const answer=answers[key]||{kind:word.kind,position:blank.position,state:blank.state,sign:blank.sign};
 const isCorrect=answer.kind===word.kind&&answer.position===word.position&&answer.state===word.state&&answer.sign===word.sign;
 const totalWords=learningQuestions.length; const studentRecords=allProgress.filter(r=>r.user.role==='Siswa');
 function chooseExercise(e:Exercise){setExerciseId(e.id);setWordIndex(0);setChecked(false);setHint(false);setActiveTab('Latihan');}
 function nextQuestion(){const currentIndex=available.findIndex(e=>e.id===exercise.id);if(!checked){setNotice('Periksa jawaban terlebih dahulu sebelum lanjut.');return;}if(currentIndex<available.length-1){chooseExercise(available[currentIndex+1]);return;}const score=available.filter(e=>completed.includes(`${e.id}:0`)).length;const topicList=lessonGroups.flatMap(g=>g.topics);const topicIndex=topicList.indexOf(selectedTopic);if(score>=8&&topicIndex<topicList.length-1){const nextTopic=topicList[topicIndex+1];setSelectedTopic(nextTopic);chooseExercise(learningQuestions.find(e=>e.topic===nextTopic)!);setNotice(`Keren! Nilaimu ${score*10}%. Materi berikutnya terbuka.`);}else if(topicIndex===topicList.length-1&&score>=8){setNotice('Selamat! Kamu menyelesaikan seluruh jalur belajar Bedah I‘rab.');}else{const retry=available.find(e=>!completed.includes(`${e.id}:0`));if(retry){chooseExercise(retry);setNotice(`Nilai materi ini ${score*10}%. Minimal 80% untuk membuka materi berikutnya. Ulangi soal yang belum benar, ya.`);}}}

 function setField<K extends keyof Answer>(field:K,value:Answer[K]){setAnswers(prev=>({...prev,[key]:{...(prev[key]||blank),[field]:value}}));setChecked(false);}
 function check(){setChecked(true);if(isCorrect){const next=completed.includes(key)?completed:[...completed,key];setCompleted(next);if(user?.role==='Siswa'){localStorage.setItem('irab_demo_progress_'+user.email,JSON.stringify(next));const record:ProgressRecord={user,correct:next.length,attempts:Object.keys(answers).length+1,completed:next,updatedAt:new Date().toISOString()};const records=readStore<ProgressRecord[]>('irab_demo_records',[]).filter(r=>r.user.email!==user.email);records.push(record);localStorage.setItem('irab_demo_records',JSON.stringify(records));setAllProgress(records);}}}
 async function login(){
  if(!loginEmail.trim()){setNotice('Isi email terlebih dahulu.');return;}
  if(supabase){
   if(!loginPassword){setNotice('Masukkan kata sandi.');return;}
   if(authMode==='signup'&&!loginName.trim()){setNotice('Isi nama untuk membuat akun siswa.');return;}
   if(authMode==='signup'){
    const {data,error}=await supabase.auth.signUp({email:loginEmail.trim().toLowerCase(),password:loginPassword,options:{data:{full_name:loginName.trim()}}});
    if(error){setNotice(error.message);return;}
    if(!data.session){setNotice('Akun dibuat. Periksa email untuk verifikasi, lalu masuk dan gunakan kode undangan jika kamu guru/admin.');setAuthMode('signin');return;}
   }else{
    const {error}=await supabase.auth.signInWithPassword({email:loginEmail.trim().toLowerCase(),password:loginPassword});
    if(error){setNotice(error.message);return;}
   }
   const {data:{user:authUser}}=await supabase.auth.getUser();
   if(!authUser?.email){setNotice('Login belum selesai. Coba masuk kembali.');return;}
   if(inviteCode.trim()){
    const {data:{session}}=await supabase.auth.getSession();
    if(session){const response=await fetch('/api/invitations/redeem',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${session.access_token}`},body:JSON.stringify({code:inviteCode.trim()})});const result=await response.json().catch(()=>({}));if(!response.ok){setNotice(result.error||'Kode undangan tidak berhasil diverifikasi.');return;}}
   }
   const {data:profile}=await supabase.from('profiles').select('full_name, role').eq('id',authUser.id).maybeSingle();
   const role:Role=profile?.role==='admin'?'Admin':profile?.role==='teacher'?'Guru':'Siswa';
   const next:User={name:profile?.full_name||loginName.trim()||authUser.email.split('@')[0],email:authUser.email,role};
   setUser(next);setShowLogin(false);setNotice(`Berhasil masuk sebagai ${role}. Catatan: progres latihan masih perlu dihubungkan ke tabel Supabase.`);setActiveTab(role==='Siswa'?'Latihan':'Panel');return;
  }
  if(!loginName.trim()){setNotice('Isi nama untuk mode demo siswa.');return;}
  const next:User={name:loginName.trim(),email:loginEmail.trim().toLowerCase(),role:'Siswa'};localStorage.setItem('irab_demo_user',JSON.stringify(next));setUser(next);setShowLogin(false);setNotice('Mode demo siswa aktif. Akun dan progres masih lokal; konfigurasi Supabase untuk autentikasi sungguhan.');setActiveTab('Latihan');
 }
 async function logout(){if(supabase)await supabase.auth.signOut();localStorage.removeItem('irab_demo_user');setUser(null);setCompleted([]);setActiveTab('Latihan');setNotice('Kamu sudah keluar.');}
 return <main className="app-shell">
  <aside className="sidebar"><a className="brand" href="#top"><span className="brand-mark">بِ</span><span><strong>bedah<span className="brand-green">i‘rab</span></strong><small>LABORATORIUM NAHWU</small></span></a>
   <div className="sidebar-label">RUANG BELAJAR</div><nav className="nav-list"><button className={`nav-item ${activeTab==='Latihan'?'active':''}`} onClick={()=>setActiveTab('Latihan')}><Icon>◎</Icon> Bedah kalimat</button><button className={`nav-item ${activeTab==='Materi'?'active':''}`} onClick={()=>setActiveTab('Materi')}><Icon>▤</Icon> Materi Nahwu</button><button className={`nav-item ${activeTab==='Progres'?'active':''}`} onClick={()=>setActiveTab('Progres')}><Icon>▥</Icon> Progres belajar</button>{user&&user.role!=='Siswa'&&<button className={`nav-item ${activeTab==='Panel'?'active':''}`} onClick={()=>setActiveTab('Panel')}><Icon>⚙</Icon> Panel {user.role}</button>}</nav>
   <div className="sidebar-spacer"/><div className="sidebar-note"><div className="note-icon">✦</div><strong>Belajar sampai paham.</strong><p>Setiap kata punya alasan. Temukan kaidahnya, bukan sekadar jawabannya.</p></div><div className="sidebar-footer"><span className="status-dot"/> Prototipe v0.3 <span>•</span> Nahwu interaktif</div>
  </aside>
  <section className="main-area" id="top"><header className="topbar"><div className="breadcrumb">Ruang belajar <span>/</span> <strong>{activeTab==='Latihan'?'Bedah kalimat':activeTab==='Materi'?'Materi Nahwu':activeTab==='Progres'?'Progres belajar':'Panel '+(user?.role||'')}</strong></div><div className="topbar-right">{user?<><span className="user-chip"><span className="avatar">{user.role==='Admin'?'A':user.role==='Guru'?'G':'ط'}</span><span><b>{user.name}</b><small>{user.role} · mode demo</small></span></span><button className="button-secondary small" onClick={logout}>Keluar</button></>:<><span className="guest-pill">PENGUNJUNG</span><button className="button-primary small" onClick={()=>{setShowLogin(true);setNotice('');}}>Masuk / Daftar</button></>}</div></header>
  <div className="page-content">
   <div className="page-heading"><div><div className="eyebrow"><span/> INTERACTIVE NAHWU LAB</div><h1>Bedah <em>i‘rab.</em></h1><p>Kenali setiap kata, temukan kedudukannya, pahami alasannya.</p></div><div className="heading-decoration" aria-hidden="true"><span>ا</span><span>ل</span><span>ن</span><span>ح</span><span>و</span></div></div>
   {notice&&<div className="notice" role="status"><span>ⓘ</span>{notice}<button onClick={()=>setNotice('')} aria-label="Tutup">×</button></div>}
   {!user&&<div className="guest-banner"><div><strong>Belajar sebagai pengunjung</strong><p>Semua latihan dan materi bisa dibuka tanpa login. Progres tidak disimpan sebagai riwayat akun.</p></div><button className="button-secondary" onClick={()=>setShowLogin(true)}>Simpan progres ↗</button></div>}
   {activeTab==='Latihan'&&<>
    <section className="stats-grid"><div className="stat-card"><div className="stat-icon green">▤</div><div><span className="stat-label">BANK LATIHAN</span><strong>{learningQuestions.length} <small>soal</small></strong></div></div><div className="stat-card"><div className="stat-icon cream">◎</div><div><span className="stat-label">TOPIK MATERI</span><strong>{lessonGroups.flatMap(g=>g.topics).length} <small>submateri</small></strong></div></div><div className="stat-card"><div className="stat-icon lavender">✦</div><div><span className="stat-label">STATUS</span><strong>{user?user.role:'Pengunjung'} <small>{user?'mode demo':'akses terbuka'}</small></strong></div></div></section>
    <div className="section-heading"><div><span className="section-kicker">MULAI DARI SINI</span><h2>Ruang bedah kalimat</h2></div><button className="text-button" onClick={()=>{setAnswers({});setCompleted([]);setChecked(false);setHint(false);if(user?.role==='Siswa')localStorage.setItem('irab_demo_progress_'+user.email,'[]');}}>↻ Ulangi latihan</button></div>
    <div className="workspace-grid"><section className="sentence-card"><div className="card-topline"><div className="source-tag"><span className={`source-dot ${exercise.source==='Teks klasik'?'classic':''}`}/>{exercise.source}</div><span className="exercise-number">SOAL {String(available.findIndex(e=>e.id===exercise.id)+1).padStart(2,'0')} / 10</span></div><h3>{exercise.title}</h3><div className="topic-tag">{exercise.topic}</div>
     <div className="arabic-stage" dir="rtl" lang="ar"><div className="arabic-sentence">{exercise.sentence.split(' ').map((token,i)=>{const target=exercise.words.findIndex(w=>w.token===token);return target>=0?<button key={exercise.id+token+i} className={`word-chip ${activeIndex===target?'selected':''} ${checked&&activeIndex===target?(isCorrect?'word-correct':'word-wrong'):''}`} onClick={()=>{setWordIndex(target);setChecked(false);setHint(false);}}>{token}</button>:<span className="sentence-token" key={exercise.id+token+i}>{token}</span>;})}</div><div className="arabic-translation" dir="ltr">“{exercise.translation}”</div></div>
     <div className="sentence-context"><span className="context-icon">i</span><p>{exercise.context} {exercise.reference&&<strong>{exercise.reference}</strong>}</p></div><div className="word-progress"><div className="progress-label"><span>KATA DALAM KALIMAT</span><strong>{activeIndex+1} <small>/ {exercise.words.length}</small></strong></div><div className="progress-track">{exercise.words.map((w,i)=><button key={w.token+i} className={`progress-segment ${i<=activeIndex?'filled':''} ${completed.includes(`${exercise.id}:${i}`)?'done':''}`} onClick={()=>{setWordIndex(i);setChecked(false);}} aria-label={'Pilih '+w.token}/>)}</div></div><div className="word-picker-label">PILIH KATA UNTUK DIBEDAH</div><div className="word-picker" dir="rtl">{exercise.words.map((w,i)=><button key={w.token+i+'p'} onClick={()=>{setWordIndex(i);setChecked(false);setHint(false);}} className={`word-pick ${activeIndex===i?'active':''}`}>{w.token}<span>{i+1}</span></button>)}</div><div className="sentence-actions"><button className="button-secondary" onClick={()=>setHint(!hint)}>✦ {hint?'Sembunyikan petunjuk':'Beri aku petunjuk'}</button><button className="button-primary" onClick={nextQuestion} disabled={!checked}>{available.findIndex(e=>e.id===exercise.id)===9?'Nilai & lanjut materi →':'Soal berikutnya →'}</button></div>{hint&&<div className="hint-box"><strong>Petunjuk kecil</strong><p>{word.explanation.split(';')[0]} Coba pikirkan hubungan kata ini dengan kata lain dalam kalimat.</p></div>}</section>
    <section className="analysis-card"><div className="analysis-heading"><div className="analysis-symbol">ت</div><div><span className="section-kicker">ANALISIS KATA</span><h3>Bedah morfologi & nahwu</h3></div></div><div className="active-word-banner"><div><span>KATA YANG DIPILIH</span><strong dir="rtl" lang="ar">{word.token}</strong></div><span className="word-index-badge">Kata {activeIndex+1}</span></div><div className="form-fields"><label className="field"><span><b>01</b> Jenis kata <i>نوع الكلمة</i></span><select value={answer.kind} onChange={e=>setField('kind',e.target.value as WordKind)}>{wordKinds.map(v=><option key={v}>{v}</option>)}</select></label><label className="field"><span><b>02</b> Kedudukan nahwu <i>المحل الإعرابي</i></span><select value={answer.position} onChange={e=>setField('position',e.target.value)}>{positions.map(v=><option key={v}>{v}</option>)}</select></label><label className="field"><span><b>03</b> Status i‘rab <i>الحالة الإعرابية</i></span><select value={answer.state} onChange={e=>setField('state',e.target.value as CaseState)}>{caseStates.map(v=><option key={v}>{v}</option>)}</select></label><label className="field"><span><b>04</b> Tanda i‘rab <i>علامة الإعراب</i></span><select value={answer.sign} onChange={e=>setField('sign',e.target.value as Sign)}>{signs.map(v=><option key={v}>{v}</option>)}</select></label></div><button className="button-check" onClick={check}>✓ Periksa jawaban <span>→</span></button>{checked&&<div className={`feedback-box ${isCorrect?'success':'error'}`} role="status"><div className="feedback-title"><span>{isCorrect?'✓':'!'}</span><strong>{isCorrect?'Tepat sekali! Jawabanmu benar.':'Belum tepat. Coba periksa lagi.'}</strong></div><p>{isCorrect?word.explanation:'Periksa kembali jenis kata, kedudukan, status i‘rab, dan tandanya. Kamu bisa melihat petunjuk sebelum mencoba lagi.'}</p>{isCorrect&&<div className="full-irab" dir="rtl" lang="ar">{word.fullIrab}</div>}<button className="feedback-link" onClick={()=>setHint(true)}>Lihat petunjuk ↗</button></div>}<div className="analysis-footnote">ⓘ Jawaban diperiksa menggunakan kunci latihan terstruktur, bukan penilaian AI.</div></section></div>
    <section className="content-panel sequential-footer"><div className="section-heading"><div><span className="section-kicker">JALUR BELAJAR</span><h2>{selectedTopic}</h2></div><span className="library-count">{available.filter(e=>completed.includes(`${e.id}:0`)).length}/10 soal benar</span></div><p className="panel-intro">Kerjakan soal sesuai urutan. Materi selanjutnya terbuka setelah minimal 8 dari 10 soal dijawab benar. Tidak bisa melompat ke submateri lain.</p><div className="progress-track large">{available.map((e,i)=><span key={e.id} className={completed.includes(`${e.id}:0`)?'filled':''} title={`Soal ${i+1}`}/>)}</div></section>
   </>}
   {activeTab==='Materi'&&<section className="content-panel"><div className="section-heading"><div><span className="section-kicker">PETA BELAJAR</span><h2>Materi Nahwu bertahap</h2></div><span className="library-count">5 kelompok materi</span></div><p className="panel-intro">Materi disusun berurutan. Setiap submateri berisi 10 soal; nilai minimal 80% diperlukan untuk membuka submateri berikutnya. Contoh ayat Al-Qur’an tidak digunakan dalam bank latihan.</p><div className="lesson-grid">{lessonGroups.map((g,i)=><article className="lesson-card" key={g.title}><span className="lesson-number">MODUL 0{i+1}</span><h3>{g.title}</h3><p>{g.desc}</p><ul className="lesson-topic-list">{g.topics.map(t=><li key={t}><div className={`topic-practice ${t===selectedTopic?'topic-current':''}`}><span>{t}</span><span>{t===selectedTopic?'Sedang dipelajari':'10 soal'}</span></div></li>)}</ul><span className="library-count">10 soal per submateri</span></article>)}</div><div className="notice"><span>ⓘ</span> Materi ringkas dan bank soal adalah fondasi awal, bukan pengganti kitab nahwu atau bimbingan guru. Materi lanjutan perlu ditinjau ahli sebelum dipublikasikan.</div></section>}
   {activeTab==='Progres'&&<section className="content-panel"><div className="section-heading"><div><span className="section-kicker">RIWAYAT BELAJAR</span><h2>Progres belajarmu</h2></div></div>{user?.role==='Siswa'?<><div className="progress-hero"><div><span className="section-kicker">AKUN SISWA · MODE DEMO</span><h3>{user.name}</h3><p>{user.email}</p><p>Jawaban benar tersimpan di browser ini dan terikat pada email demo.</p></div><div className="progress-big"><strong>{completed.length}</strong><span>jawaban benar</span></div></div><div className="progress-track large"><span style={{width:`${Math.min(100,completed.length/Math.max(1,totalWords)*100)}%`}}/></div><p className="panel-intro">{completed.length} jawaban benar dari {totalWords} kesempatan kata dalam bank latihan. Data demo hanya tersimpan di browser/perangkat ini; belum tersinkron ke server.</p></>:<div className="empty-state"><h3>Progres pribadi</h3><p>{user?'Panel ini khusus akun siswa.':'Kamu sedang menjadi pengunjung. Login sebagai siswa untuk mencoba penyimpanan progres demo.'}</p>{!user&&<button className="button-primary" onClick={()=>setShowLogin(true)}>Masuk sebagai siswa</button>}</div>}</section>}
   {activeTab==='Panel'&&user&&<section className="content-panel"><div className="section-heading"><div><span className="section-kicker">RUANG KERJA {user.role.toUpperCase()}</span><h2>{user.role==='Guru'?'Perkembangan siswa':'Pengelolaan website'}</h2></div><span className="demo-pill">MODE DEMO</span></div><div className="notice warning"><span>⚠</span> Panel ini masih mode demo lokal. Pada versi produksi, role ditetapkan melalui undangan backend dan kebijakan RLS Supabase, bukan pilihan pengguna.</div>{user.role==='Guru'?<><div className="stats-grid"><div className="stat-card"><div className="stat-icon green">♙</div><div><span className="stat-label">AKUN SISWA DEMO</span><strong>{studentRecords.length}</strong></div></div><div className="stat-card"><div className="stat-icon cream">✓</div><div><span className="stat-label">JAWABAN BENAR</span><strong>{studentRecords.reduce((n,r)=>n+r.correct,0)}</strong></div></div><div className="stat-card"><div className="stat-icon lavender">▤</div><div><span className="stat-label">BANK LATIHAN</span><strong>{learningQuestions.length}</strong></div></div></div><div className="table-wrap"><table><thead><tr><th>Nama siswa</th><th>Email demo</th><th>Benar</th><th>Pembaruan</th></tr></thead><tbody>{studentRecords.length?studentRecords.map(r=><tr key={r.user.email}><td>{r.user.name}</td><td>{r.user.email}</td><td>{r.correct}</td><td>{new Date(r.updatedAt).toLocaleString('id-ID')}</td></tr>):<tr><td colSpan={4}>Belum ada progres siswa demo di browser ini.</td></tr>}</tbody></table></div></>:<><div className="admin-grid"><article className="admin-card"><span className="section-kicker">KONTEN</span><h3>Bank soal dan materi</h3><p>{learningQuestions.length} soal dalam jalur bertahap tanpa contoh ayat Al-Qur’an. Bank soal lokal berada di <code>data/exercises.ts</code>; kelola bank produksi melalui database setelah Supabase dikonfigurasi.</p><button className="button-secondary" onClick={()=>setActiveTab('Materi')}>Lihat kurikulum ↗</button></article><article className="admin-card"><span className="section-kicker">PENGGUNA</span><h3>Manajemen peran</h3><p>Versi produksi perlu panel untuk membuat akun, menetapkan role, mengelola kelas, dan mengatur izin melalui database.</p><button className="button-secondary" onClick={()=>setShowLogin(true)}>Ganti akun demo ↗</button></article><article className="admin-card"><span className="section-kicker">KUALITAS</span><h3>Review materi</h3><p>Validasi setiap kunci i‘rab dan pembahasan bersama pengajar sebelum dipakai untuk penilaian formal.</p></article></div></>}</section>}
   <footer className="main-footer"><span>بِسْمِ الْعِلْمِ نَبْدَأُ</span><p>Bedah I‘rab · Belajar Nahwu dengan memahami alasan.</p><span className="footer-version">PROTOTIPE 0.3.0</span></footer>
  </div></section>
  {showLogin&&<div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setShowLogin(false);}}><section className="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title"><button className="modal-close" onClick={()=>setShowLogin(false)} aria-label="Tutup">×</button><div className="modal-mark">بِ</div><div className="eyebrow">AKUN BEDAH I‘RAB</div><h2 id="login-title">Masuk ke ruang belajar</h2><p>{supabase?'Login menggunakan Supabase Auth. Pendaftaran publik selalu membuat akun siswa; guru/admin harus memiliki undangan resmi.':'Mode demo aktif karena kredensial Supabase belum dikonfigurasi. Setelah dikonfigurasi, akun publik hanya bisa mendaftar sebagai siswa.'}</p>{authMode==='signup'&&<label className="field"><span>Nama lengkap</span><input value={loginName} onChange={e=>setLoginName(e.target.value)} placeholder="Nama kamu"/></label>}<label className="field"><span>Email</span><input type="email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} placeholder="nama@email.com"/></label><label className="field"><span>Kata sandi</span><input type="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} placeholder="Minimal sesuai aturan Supabase"/></label>{authMode==='signin'&&<label className="field"><span>Kode undangan guru/admin (opsional)</span><input value={inviteCode} onChange={e=>setInviteCode(e.target.value)} placeholder="Kode dari admin"/></label>}<div className="role-note">{authMode==='signup'?'Akun baru otomatis menjadi siswa. Guru/admin tidak dapat memilih role sendiri.':'Jika punya undangan, masuk dengan email yang diundang lalu masukkan kode dari admin.'}</div><button className="button-check" onClick={login}>{authMode==='signup'?'Daftar sebagai siswa →':'Masuk →'}</button><button className="feedback-link" onClick={()=>setAuthMode(authMode==='signin'?'signup':'signin')}>{authMode==='signin'?'Belum punya akun? Daftar sebagai siswa':'Sudah punya akun? Masuk'}</button><small className="modal-warning">{supabase?'Jangan bagikan kata sandi atau kode undangan.':'Mode demo menyimpan data di browser, bukan database online.'}</small></section></div>}
 </main>;
}
