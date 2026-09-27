/*
  EduSphere - E-Learning Website Management System
  Demo frontend build. Developed by: Angad Singh
  B.Tech CSE, 5th Semester | I.K. Gujral Punjab Technical University (PTU), Jalandhar
*/
/* ===================== DATA LAYER ===================== */
const DB_KEY = 'edusphere_demo_db_v3';
let DB = null;
function loadDB(){ try{ const raw = localStorage.getItem(DB_KEY); if(raw) return JSON.parse(raw); }catch(e){} return seedDB(); }
function saveDB(){ try{ localStorage.setItem(DB_KEY, JSON.stringify(DB)); }catch(e){} }
function uid(prefix){ return prefix + Math.random().toString(36).slice(2,9); }

function seedDB(){
  const now = Date.now();
  const db = {
    settings:{ siteName:'EduSphere', tagline:'Learn Without Limits' },
    categories:['Web Development','Data Science','Mobile Development','Design','Business','Programming Basics'],
    users:[
      {id:'u_admin', role:'admin', name:'Site Admin', email:'admin@demo.com', pass:'admin123'},
      {id:'u_inst1', role:'instructor', name:'Arjun Deshmukh', email:'instructor@demo.com', pass:'pass1234', status:'approved'},
      {id:'u_inst2', role:'instructor', name:'Meera Nair', email:'meera@demo.com', pass:'pass1234', status:'approved'},
      {id:'u_stu1', role:'student', name:'Priya Mehta', email:'student@demo.com', pass:'pass1234'},
      {id:'u_stu2', role:'student', name:'Karan Bedi', email:'karan@demo.com', pass:'pass1234'},
    ],
    courses:[],
    enrollments:[],
    notifications:[],
    feedback:[
      {id:uid('fb'), from:'Priya Mehta', message:'Loving the quiz feature, really helps me revise!', ts: now-1000*60*60*24*3}
    ],
    seq:1
  };

  function mkLessons(topics){
    return topics.map((t,i)=>({id:uid('les'), title:t, type: i%3===2?'notes':'video',
      duration: i%3===2 ? '' : (8+i*2)+' min',
      content: i%3===2 ? `Detailed notes covering: ${t}. Read through the key concepts and examples before attempting the quiz.` : `Video lecture: ${t}. Watch the full lecture, then mark this lesson as completed.` }));
  }
  function mkQuiz(qs){ return qs.map(q=>({id:uid('q'), q:q.q, options:q.options, answer:q.answer})); }

  const c1 = {id:uid('crs'), title:'Complete Web Development Bootcamp', instructorId:'u_inst1', instructorName:'Arjun Deshmukh',
    category:'Web Development', description:'Learn HTML, CSS, JavaScript and build real projects from scratch.',
    level:'Beginner', duration:'8 weeks', thumb:'💻', status:'approved',
    youtubeUrl:'https://youtube.com/playlist?list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w',
    lessons: mkLessons(['Introduction to HTML','Styling with CSS','JavaScript Basics','DOM Manipulation','Building a Project']),
    quiz: mkQuiz([
      {q:'Which tag is used to create a hyperlink in HTML?', options:['<link>','<a>','<href>','<nav>'], answer:1},
      {q:'CSS stands for?', options:['Colorful Style Sheets','Cascading Style Sheets','Creative Style System','Computer Style Sheets'], answer:1},
      {q:'Which keyword declares a block-scoped variable in JS?', options:['var','let','func','global'], answer:1},
      {q:'document.getElementById() returns a?', options:['Array','String','DOM Element','Number'], answer:2},
      {q:'Which tag is used for the largest heading in HTML?', options:['<h6>','<heading>','<h1>','<head>'], answer:2},
      {q:'Which CSS property changes text color?', options:['font-color','text-color','color','fg-color'], answer:2},
      {q:'Which symbol is used for ID selector in CSS?', options:['.','#','*','@'], answer:1},
      {q:'Which JS method converts a string to an integer?', options:['parseInt()','toInt()','Number.string()','int()'], answer:0},
      {q:'Which HTML attribute specifies an image source?', options:['href','src','alt','link'], answer:1},
      {q:'Which operator checks both value and type in JS?', options:['==','=','===','!='], answer:2},
      {q:'Flexbox is enabled using which CSS property value?', options:['display:flex','position:flex','flex:box','layout:flex'], answer:0},
      {q:'Which event fires when a user clicks a button?', options:['onhover','onclick','onchange','onsubmit'], answer:1},
    ])};

  const c2 = {id:uid('crs'), title:'Python for Data Science', instructorId:'u_inst2', instructorName:'Meera Nair',
    category:'Data Science', description:'Master Python, Pandas and NumPy for real-world data analysis.',
    level:'Intermediate', duration:'6 weeks', thumb:'📊', status:'approved',
    youtubeUrl:'https://www.youtube.com/live/nHAPcZRg9VM',
    lessons: mkLessons(['Python Syntax Refresher','NumPy Arrays','Pandas DataFrames','Data Visualization','Mini Project']),
    quiz: mkQuiz([
      {q:'Which library is primarily used for dataframes in Python?', options:['NumPy','Pandas','Matplotlib','Flask'], answer:1},
      {q:'What does len() return for a list?', options:['Sum','Number of elements','Type','Memory size'], answer:1},
      {q:'Which symbol starts a comment in Python?', options:['//','#','--','/*'], answer:1},
      {q:'Which NumPy function creates an array of zeros?', options:['np.zeros()','np.empty()','np.null()','np.blank()'], answer:0},
      {q:'Which method reads a CSV file in Pandas?', options:['pd.load_csv()','pd.read_csv()','pd.open_csv()','pd.import_csv()'], answer:1},
      {q:'Which data type is immutable in Python?', options:['List','Dictionary','Tuple','Set'], answer:2},
      {q:'Which library is commonly used for plotting graphs?', options:['Matplotlib','Requests','Flask','Django'], answer:0},
      {q:'What does df.head() show by default?', options:['Last 5 rows','First 5 rows','All rows','Column names'], answer:1},
      {q:'Which keyword is used to define a function in Python?', options:['func','def','function','define'], answer:1},
      {q:'Which operator is used for exponentiation in Python?', options:['^','**','exp()','pow'], answer:1},
      {q:'Which method removes missing values in Pandas?', options:['dropna()','removena()','clearna()','delna()'], answer:0},
    ])};

  const c3 = {id:uid('crs'), title:'UI/UX Design Fundamentals', instructorId:'u_inst2', instructorName:'Meera Nair',
    category:'Design', description:'Learn the principles of great design and prototyping with real tools.',
    level:'Beginner', duration:'4 weeks', thumb:'🎨', status:'approved',
    youtubeUrl:'https://youtube.com/playlist?list=PLdvOfoe7PXT0ouChAnR1nHlT8BJIo5hP_',
    lessons: mkLessons(['Design Principles','Color Theory','Typography','Wireframing']),
    quiz: mkQuiz([
      {q:'What does UX stand for?', options:['User Experience','User Extension','Unified Xperience','User Exchange'], answer:0},
      {q:'Which is a common wireframing tool?', options:['Figma','Excel','Notepad','Photoshop only'], answer:0},
      {q:'What does UI stand for?', options:['User Interface','Unified Icon','User Index','Universal Interface'], answer:0},
      {q:'Complementary colors sit where on the color wheel?', options:['Next to each other','Opposite each other','Same spot','Random'], answer:1},
      {q:'A low-fidelity mockup is usually called a?', options:['Prototype','Wireframe','Final design','Style guide'], answer:1},
      {q:'Which font category has decorative strokes at letter ends?', options:['Serif','Sans-serif','Monospace','Script'], answer:0},
      {q:'Consistent spacing and alignment in design follows which principle?', options:['Contrast','Proximity/Alignment','Randomness','Saturation'], answer:1},
      {q:'A style guide mainly documents a product\'s?', options:['Server code','Visual design rules','Database schema','Marketing budget'], answer:1},
      {q:'What is the purpose of user personas?', options:['Track bugs','Represent target users','Manage servers','Write code'], answer:1},
      {q:'High contrast between text and background improves?', options:['Load speed','Readability','File size','SEO only'], answer:1},
    ])};

  const c4 = {id:uid('crs'), title:'Android App Development', instructorId:'u_inst1', instructorName:'Arjun Deshmukh',
    category:'Mobile Development', description:'Build native Android apps using Kotlin and Android Studio.',
    level:'Intermediate', duration:'10 weeks', thumb:'📱', status:'pending',
    lessons: mkLessons(['Setting up Android Studio','Kotlin Basics','Activities & Layouts','Building Your First App']),
    quiz: mkQuiz([
      {q:'Android apps are primarily written in?', options:['Kotlin/Java','PHP','Ruby','Swift'], answer:0},
      {q:'Which file defines an Android app\'s permissions and components?', options:['build.gradle','AndroidManifest.xml','res/layout.xml','settings.json'], answer:1},
      {q:'Which component represents a single screen in Android?', options:['Service','Activity','Intent','Provider'], answer:1},
      {q:'XML files for UI layouts live in which folder?', options:['res/layout','src/main','assets/ui','res/values'], answer:0},
      {q:'Which class is used to navigate between screens?', options:['Intent','Fragmentizer','Router','Navigator'], answer:0},
      {q:'Which tool is the official Android IDE?', options:['Xcode','Android Studio','Eclipse','VS Code only'], answer:1},
      {q:'Which Kotlin keyword declares an immutable variable?', options:['var','val','let','const var'], answer:1},
      {q:'Which component runs long tasks in the background?', options:['Activity','Service','Layout','View'], answer:1},
      {q:'The build system used in Android projects is?', options:['Maven only','Gradle','Make','Webpack'], answer:1},
      {q:'Which layout arranges views in rows and columns?', options:['LinearLayout','GridLayout','TextView','ImageView'], answer:1},
    ])};

  const c5 = {id:uid('crs'), title:'Digital Marketing Essentials', instructorId:'u_inst2', instructorName:'Meera Nair',
    category:'Business', description:'Learn SEO, social media marketing and content strategy.',
    level:'Beginner', duration:'5 weeks', thumb:'📈', status:'approved',
    youtubeUrl:'https://youtu.be/qnBhOVH1QQ8',
    lessons: mkLessons(['Intro to Digital Marketing','SEO Basics','Social Media Strategy']),
    quiz: mkQuiz([
      {q:'SEO stands for?', options:['Search Engine Optimization','Site Engine Order','Search Element Order','Server Engine Optimization'], answer:0},
      {q:'PPC advertising means you pay per?', options:['Impression','Click','Hour','Follower'], answer:1},
      {q:'Which metric shows % of visitors who leave after one page?', options:['Bounce rate','CTR','CPC','ROI'], answer:0},
      {q:'Which platform is primarily used for professional B2B marketing?', options:['LinkedIn','Snapchat','TikTok','Pinterest'], answer:0},
      {q:'CTR stands for?', options:['Click Through Rate','Content Traffic Report','Customer Trust Ratio','Cost To Revenue'], answer:0},
      {q:'Backlinks mainly help improve a site\'s?', options:['Server speed','Search ranking','Ad budget','Font size'], answer:1},
      {q:'An email list opt-in form is used to collect?', options:['Passwords','Leads/subscribers','Payments','Reviews'], answer:1},
      {q:'Which is a paid social media ad model?', options:['Organic reach','Sponsored posts','Hashtags','Comments'], answer:1},
      {q:'Keyword research helps identify what users?', options:['Purchase directly','Search for online','Complain about','Unfollow'], answer:1},
      {q:'A/B testing is used to compare two versions of a?', options:['Server','Webpage/ad','Database','Router'], answer:1},
      {q:'ROI stands for?', options:['Return On Investment','Rate Of Interest','Reach Of Impressions','Ratio Of Income'], answer:0},
    ])};

  const c6 = {id:uid('crs'), title:'Programming Fundamentals with C', instructorId:'u_inst1', instructorName:'Arjun Deshmukh',
    category:'Programming Basics', description:'Build a strong foundation in programming logic using C.',
    level:'Beginner', duration:'6 weeks', thumb:'🖥️', status:'approved',
    youtubeUrl:'https://youtube.com/playlist?list=PLu0W_9lII9aiXlHcLx-mDH1Qul38wD3aR',
    lessons: mkLessons(['Variables & Data Types','Loops & Conditions','Functions','Arrays & Pointers']),
    quiz: mkQuiz([
      {q:'Which header file is needed for printf()?', options:['<stdlib.h>','<stdio.h>','<string.h>','<math.h>'], answer:1},
      {q:'Which data type stores decimal numbers in C?', options:['int','float','char','short'], answer:1},
      {q:'Which loop always executes at least once?', options:['for','while','do-while','if'], answer:2},
      {q:'Which operator is used to get a variable\'s memory address?', options:['*','&','#','%'], answer:1},
      {q:'An array index in C starts from?', options:['1','-1','0','depends on compiler'], answer:2},
      {q:'Which keyword is used to exit a loop early?', options:['exit','stop','break','return'], answer:2},
      {q:'Which function is used to allocate memory dynamically?', options:['malloc()','alloc()','new()','create()'], answer:0},
      {q:'A function that calls itself is called?', options:['Recursive function','Inline function','Static function','Virtual function'], answer:0},
      {q:'Which symbol marks the end of a statement in C?', options:[':',';','.',','], answer:1},
      {q:'What does \'char\' data type store?', options:['A single character','A whole number','A decimal','A boolean'], answer:0},
      {q:'Which operator checks equality in C?', options:['=','==','equals','==='], answer:1},
    ])};

  db.courses = [c1,c2,c3,c4,c5,c6];

  // seed enrollment for demo student
  db.enrollments.push({id:uid('enr'), studentId:'u_stu1', courseId:c1.id, enrolledAt: now-1000*60*60*24*10,
    completedLessons:[c1.lessons[0].id, c1.lessons[1].id], lastLesson:c1.lessons[1].id, quizScore:null, certificateIssued:false});
  db.enrollments.push({id:uid('enr'), studentId:'u_stu1', courseId:c2.id, enrolledAt: now-1000*60*60*24*4,
    completedLessons:[], lastLesson:null, quizScore:null, certificateIssued:false});

  db.notifications.push({id:uid('ntf'), userId:'u_stu1', message:'Welcome to EduSphere! Start learning today.', ts: now-1000*60*60*24*10, read:false});

  return db;
}

DB = loadDB(); saveDB(); applyTheme();

/* ===================== HELPERS ===================== */
let session = null; // {role, id}
function toast(msg, icon){
  const el = document.createElement('div'); el.className='toast';
  el.innerHTML = `<span>${icon||'🔔'}</span><span>${msg}</span>`;
  document.getElementById('toast-stack').appendChild(el);
  setTimeout(()=>el.remove(), 4200);
}
function getUser(id){ return DB.users.find(u=>u.id===id); }
function getCourse(id){ return DB.courses.find(c=>c.id===id); }
function fmtDate(ts){ const d=new Date(ts); return d.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}); }
function scrollToId(id){ document.getElementById(id).scrollIntoView({behavior:'smooth'}); }
function goHome(){ document.getElementById('app-screen').classList.remove('show'); document.getElementById('public-screen').style.display='block'; renderPublicSite(); }

/* ===================== PUBLIC SITE RENDER ===================== */
function renderPublicSite(){
  document.getElementById('cat-grid').innerHTML = DB.categories.map(c=>`
    <div class="cat-card" onclick="filterHomeCat('${c}')"><span class="ic">${catIcon(c)}</span>${c}</div>`).join('');
  renderCatalog('courses-section-grid');
  const students = DB.users.filter(u=>u.role==='student').length;
  const instructors = DB.users.filter(u=>u.role==='instructor' && u.status==='approved').length;
  const courses = DB.courses.filter(c=>c.status==='approved').length;
  const completions = DB.enrollments.filter(e=>e.certificateIssued).length;
  document.getElementById('home-stats').innerHTML = `
    <div><div class="n">${students}+</div><div class="l">Students</div></div>
    <div><div class="n">${instructors}+</div><div class="l">Instructors</div></div>
    <div><div class="n">${courses}+</div><div class="l">Courses</div></div>
    <div><div class="n">${completions}+</div><div class="l">Completions</div></div>`;
}
function catIcon(c){
  const map={'Web Development':'💻','Data Science':'📊','Mobile Development':'📱','Design':'🎨','Business':'📈','Programming Basics':'🖥️'};
  return map[c]||'📘';
}
function filterHomeCat(cat){ document.getElementById('home-search').value=''; scrollToId('courses-section'); renderCatalog('courses-section-grid', cat); }
function renderCatalog(gridId, forcedCat){
  const q = (document.getElementById('home-search')?.value||'').toLowerCase();
  let list = DB.courses.filter(c=>c.status==='approved');
  if(forcedCat) list = list.filter(c=>c.category===forcedCat);
  if(q) list = list.filter(c=>c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
  document.getElementById(gridId).innerHTML = list.map(c=>courseCardHtml(c)).join('') || '<div class="empty-state">No courses found.</div>';
}
function courseCardHtml(c){
  return `<div class="course-card" onclick="handleCourseClick('${c.id}')">
    <div class="course-thumb">${c.thumb}</div>
    <div class="course-body">
      <h4>${c.title}</h4>
      <div class="course-meta"><span>👤 ${c.instructorName}</span><span>⏱️ ${c.duration}</span></div>
      <div class="course-meta"><span class="badge gray">${c.category}</span><span class="badge amber">${c.level}</span></div>
      <div class="course-foot"><span style="font-size:11.5px;color:var(--muted);">${c.lessons.length} lessons</span>
      <button class="btn btn-primary btn-sm">View</button></div>
    </div></div>`;
}
function handleCourseClick(courseId){
  if(!session){ openAuth('login'); toast('Please login to view and enroll in this course.','🔒'); return; }
  if(session.role!=='student'){ toast('Only students can enroll in courses.','ℹ️'); return; }
  enrollAndOpen(courseId);
}
function enrollAndOpen(courseId){
  let enr = DB.enrollments.find(e=>e.studentId===session.id && e.courseId===courseId);
  if(!enr){
    enr = {id:uid('enr'), studentId:session.id, courseId, enrolledAt:Date.now(), completedLessons:[], lastLesson:null, quizScore:null, certificateIssued:false};
    DB.enrollments.push(enr); saveDB();
    toast('Enrolled successfully!','✅');
  }
  openPlayer(courseId);
}

/* ===================== AUTH ===================== */
let loginRole='student', regRole='student';
function openAuth(tab){ document.getElementById('auth-modal').classList.add('show'); switchAuthTab(tab); }
function closeAuth(){ document.getElementById('auth-modal').classList.remove('show'); hideAuthMsgs(); }
function openForgot(ev){ ev.preventDefault(); switchAuthTab('forgot'); }
function switchAuthTab(t){
  hideAuthMsgs();
  ['login','register','forgot'].forEach(x=>document.getElementById('form-'+x).classList.toggle('hidden', x!==t));
  if(t==='login'||t==='register'){
    document.getElementById('tab-login').classList.toggle('active', t==='login');
    document.getElementById('tab-register').classList.toggle('active', t==='register');
  }
}
function hideAuthMsgs(){ document.getElementById('auth-error').style.display='none'; document.getElementById('auth-ok').style.display='none'; }
function showAuthErr(m){ const e=document.getElementById('auth-error'); e.textContent=m; e.style.display='block'; }
function showAuthOk(m){ const e=document.getElementById('auth-ok'); e.textContent=m; e.style.display='block'; }
function setLoginRole(r){ loginRole=r; document.querySelectorAll('.role-btn').forEach(b=>b.classList.toggle('active', b.dataset.role===r)); }
function setRegRole(r){ regRole=r; document.querySelectorAll('.reg-role-btn').forEach(b=>b.classList.toggle('active', b.dataset.role===r));
  document.getElementById('reg-note').classList.toggle('hidden', r!=='instructor'); }

function handleLogin(ev){
  ev.preventDefault(); hideAuthMsgs();
  const email=document.getElementById('li-email').value.trim().toLowerCase();
  const pass=document.getElementById('li-pass').value;
  const user = DB.users.find(u=>u.email.toLowerCase()===email && u.role===loginRole);
  if(!user){ showAuthErr('No '+loginRole+' account found with this email.'); return false; }
  if(user.pass!==pass){ showAuthErr('Incorrect password.'); return false; }
  if(user.role==='instructor' && user.status!=='approved'){ showAuthErr('Your instructor account is pending admin approval.'); return false; }
  session={role:user.role, id:user.id};
  closeAuth(); enterApp();
  return false;
}
function handleRegister(ev){
  ev.preventDefault(); hideAuthMsgs();
  const name=document.getElementById('r-name').value.trim();
  const email=document.getElementById('r-email').value.trim().toLowerCase();
  const pass=document.getElementById('r-pass').value;
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showAuthErr('Enter a valid email address.'); return false; }
  if(pass.length<6){ showAuthErr('Password must be at least 6 characters.'); return false; }
  if(DB.users.some(u=>u.email.toLowerCase()===email)){ showAuthErr('An account with this email already exists.'); return false; }
  const newUser = {id:uid('u'), role:regRole, name, email, pass};
  if(regRole==='instructor') newUser.status='pending';
  DB.users.push(newUser); saveDB();
  if(regRole==='instructor'){
    showAuthOk('Registered! Your instructor account is pending admin approval.');
  }else{
    showAuthOk('Account created successfully! You can log in now.');
  }
  document.getElementById('form-register').reset();
  setTimeout(()=>{ switchAuthTab('login'); document.getElementById('li-email').value=email; setLoginRole(regRole); }, 900);
  return false;
}
function handleForgot(ev){
  ev.preventDefault();
  const email=document.getElementById('fg-email').value.trim().toLowerCase();
  const user = DB.users.find(u=>u.email.toLowerCase()===email);
  if(!user){ showAuthErr('No account found with this email.'); return false; }
  user.pass='reset1234'; saveDB();
  showAuthOk('Password reset! Your new password is: reset1234');
  return false;
}
function logout(){ session=null; document.getElementById('app-screen').classList.remove('show'); goHome(); }

/* ===================== APP ENTRY / ROUTING ===================== */
const titles = {
  's-dashboard':['Dashboard','Your learning overview'],'s-browse':['Browse Courses','Find your next course'],
  's-mycourses':['My Courses','Courses you are enrolled in'],'course-player':['Course','Lecture & notes'],
  's-certificates':['My Certificates','Courses you have completed'],'cert-detail':['Certificate',''],
  's-notifications':['Notifications',''],'s-profile':['Profile','Manage your account'],
  'i-dashboard':['Dashboard','Your teaching overview'],'i-courses':['My Courses','Create and manage courses'],
  'i-students':['Enrolled Students','Track student progress'],'i-profile':['Profile','Manage your account'],
  'a-dashboard':['Admin Overview','Platform-wide statistics'],'a-students':['Manage Students',''],
  'a-instructors':['Manage Instructors',''],'a-courses':['Manage Courses',''],'a-categories':['Manage Categories',''],
  'a-feedback':['User Feedback',''],'a-settings':['Website Settings',''],
};
function enterApp(){
  document.getElementById('public-screen').style.display='none';
  document.getElementById('app-screen').classList.add('show');
  document.getElementById('nav-student').classList.toggle('hidden', session.role!=='student');
  document.getElementById('nav-instructor').classList.toggle('hidden', session.role!=='instructor');
  document.getElementById('nav-admin').classList.toggle('hidden', session.role!=='admin');
  const u = getUser(session.id);
  document.getElementById('user-chip').textContent = '👤 ' + (u ? u.name.split(' ')[0] : 'Admin');
  if(session.role==='student') showView('s-dashboard');
  if(session.role==='instructor') showView('i-dashboard');
  if(session.role==='admin') showView('a-dashboard');
  toast('Welcome, '+(u?u.name.split(' ')[0]:'Admin')+'!','👋');
}
function showView(name){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  const el = document.getElementById('view-'+name); if(el) el.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active', n.dataset.view===name));
  if(titles[name]){ document.getElementById('page-title').textContent=titles[name][0]; document.getElementById('page-sub').textContent=titles[name][1]; }
  toggleSidebar(false);
  const map = {
    's-dashboard':renderStudentDashboard,'s-browse':renderStudentBrowse,'s-mycourses':renderMyCourses,
    's-certificates':renderCertificates,'s-notifications':renderNotifications,'s-profile':renderStudentProfile,
    'i-dashboard':renderInstructorDashboard,'i-courses':renderInstructorCourses,'i-students':renderInstructorStudents,'i-profile':renderInstructorProfile,
    'a-dashboard':renderAdminDashboard,'a-students':renderAdminStudents,'a-instructors':renderAdminInstructors,
    'a-courses':renderAdminCourses,'a-categories':renderAdminCategories,'a-feedback':renderAdminFeedback,'a-settings':renderAdminSettings,
  };
  if(map[name]) map[name]();
}
function toggleSidebar(open){ document.getElementById('sidebar').classList.toggle('open', !!open); document.getElementById('overlay').classList.toggle('show', !!open); }

/* ===================== STUDENT ===================== */
function myEnrollments(){ return DB.enrollments.filter(e=>e.studentId===session.id); }
function renderStudentDashboard(){
  const enrs = myEnrollments();
  const completed = enrs.filter(e=>e.certificateIssued).length;
  const avgProg = enrs.length ? Math.round(enrs.reduce((s,e)=>s+courseProgress(e),0)/enrs.length) : 0;
  document.getElementById('s-stat-cards').innerHTML = `
    <div class="card stat-card"><div class="k">Enrolled Courses</div><div class="v">${enrs.length}</div></div>
    <div class="card stat-card"><div class="k">Completed</div><div class="v">${completed}</div></div>
    <div class="card stat-card"><div class="k">Avg. Progress</div><div class="v">${avgProg}%</div></div>
    <div class="card stat-card"><div class="k">Certificates</div><div class="v">${completed}</div></div>`;

  const cont = enrs.filter(e=>courseProgress(e)<100).sort((a,b)=>b.enrolledAt-a.enrolledAt)[0];
  document.getElementById('s-continue').innerHTML = cont ? (()=>{
    const c=getCourse(cont.courseId); const pct=courseProgress(cont);
    return `<div class="row-between"><div><b>${c.title}</b><div style="font-size:11.5px;color:var(--muted);">${pct}% complete</div></div>
      <button class="btn btn-primary btn-sm" onclick="openPlayer('${c.id}')">Continue</button></div>
      <div class="progress-bar" style="margin-top:10px;"><div class="fill" style="width:${pct}%"></div></div>`;
  })() : '<div class="empty-state">No courses in progress. Browse courses to get started!</div>';

  document.getElementById('s-dash-courses').innerHTML = enrs.map(e=>{
    const c=getCourse(e.courseId); const pct=courseProgress(e);
    return `<div class="course-card"><div class="course-thumb">${c.thumb}</div><div class="course-body">
      <h4>${c.title}</h4><div class="progress-bar"><div class="fill" style="width:${pct}%"></div></div>
      <div class="course-foot"><span style="font-size:11.5px;color:var(--muted);">${pct}% done</span>
      <button class="btn btn-outline btn-sm" onclick="openPlayer('${c.id}')">Open</button></div></div></div>`;
  }).join('') || '<div class="empty-state">Nothing here yet — browse courses to enroll.</div>';
}
function courseProgress(enr){
  const c = getCourse(enr.courseId); if(!c || !c.lessons.length) return 0;
  return Math.round((enr.completedLessons.length / c.lessons.length) * 100);
}
function renderStudentBrowse(){
  const catSel = document.getElementById('sb-cat');
  if(catSel.options.length<=1) catSel.innerHTML = '<option value="all">All Categories</option>' + DB.categories.map(c=>`<option>${c}</option>`).join('');
  const q=(document.getElementById('sb-search').value||'').toLowerCase();
  const cat=document.getElementById('sb-cat').value;
  let list = DB.courses.filter(c=>c.status==='approved');
  if(cat!=='all') list=list.filter(c=>c.category===cat);
  if(q) list=list.filter(c=>c.title.toLowerCase().includes(q));
  document.getElementById('sb-grid').innerHTML = list.map(c=>courseCardHtml(c)).join('') || '<div class="empty-state">No courses found.</div>';
}
function renderMyCourses(){
  const enrs = myEnrollments();
  document.getElementById('s-my-grid').innerHTML = enrs.map(e=>{
    const c=getCourse(e.courseId); const pct=courseProgress(e);
    return `<div class="course-card"><div class="course-thumb">${c.thumb}</div><div class="course-body">
      <h4>${c.title}</h4><div class="course-meta"><span>👤 ${c.instructorName}</span></div>
      <div class="progress-bar"><div class="fill" style="width:${pct}%"></div></div>
      <div class="course-foot"><span style="font-size:11.5px;color:var(--muted);">${pct}% complete</span>
      <button class="btn btn-primary btn-sm" onclick="openPlayer('${c.id}')">Continue</button></div></div></div>`;
  }).join('');
  document.getElementById('s-my-empty').classList.toggle('hidden', enrs.length>0);
}

/* ---- Course Player ---- */
let currentCourseId=null, currentLessonId=null;
function openPlayer(courseId){
  currentCourseId=courseId;
  const c=getCourse(courseId);
  const enr = DB.enrollments.find(e=>e.studentId===session.id && e.courseId===courseId);
  currentLessonId = enr.lastLesson || (c.lessons[0] && c.lessons[0].id);
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-course-player').classList.add('active');
  document.getElementById('page-title').textContent=c.title;
  document.getElementById('page-sub').textContent='by '+c.instructorName;
  setPlayerTab('video');
  renderPlayer();
}
function renderPlayer(){
  const c=getCourse(currentCourseId);
  const enr = DB.enrollments.find(e=>e.studentId===session.id && e.courseId===currentCourseId);
  const pct = courseProgress(enr);
  document.getElementById('cp-title').textContent=c.title;
  document.getElementById('cp-progress-txt').textContent=pct+'% complete';
  document.getElementById('cp-progress-fill').style.width=pct+'%';
  document.getElementById('cp-yt-banner').innerHTML = c.youtubeUrl ? `<a href="${c.youtubeUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="margin-bottom:12px;display:inline-flex;align-items:center;gap:6px;">▶️ Watch Real Lectures on YouTube ↗</a>` : '';

  document.getElementById('cp-lesson-list').innerHTML = c.lessons.map(l=>{
    const done = enr.completedLessons.includes(l.id);
    return `<div class="lesson-list-item ${done?'done':''} ${l.id===currentLessonId?'active':''}" onclick="selectLesson('${l.id}')">
      <span class="chk">${done?'✓':''}</span><span>${l.type==='video'?'🎥':'📄'} ${l.title}</span></div>`;
  }).join('');

  const lesson = c.lessons.find(l=>l.id===currentLessonId) || c.lessons[0];
  if(lesson){
    document.getElementById('cp-lesson-desc').textContent = lesson.content;
    loadLessonVideo(lesson, c);
    document.getElementById('cp-notes-content').innerHTML = `<h4 style="margin-bottom:8px;color:var(--text);">${lesson.title}</h4><p>${lesson.content}</p>`;
    const done = enr.completedLessons.includes(lesson.id);
    const btn = document.getElementById('cp-complete-btn');
    btn.textContent = done ? '✓ Completed — tap to undo' : 'Mark Lesson as Completed';
    btn.disabled = false;
    btn.style.opacity = 1;
  }
  renderQuizArea(enr, c);
}
function loadLessonVideo(lesson, c){
  const ph = document.getElementById('cp-video-placeholder');
  if(lesson.type==='video' && c.youtubeUrl){
    ph.innerHTML = `<a href="${c.youtubeUrl}" target="_blank" rel="noopener" style="display:flex;flex-direction:column;align-items:center;gap:10px;text-decoration:none;color:#fff;">
      <span style="width:64px;height:64px;border-radius:50%;background:#ff0000;display:flex;align-items:center;justify-content:center;font-size:26px;">▶</span>
      <span style="font-weight:700;">${lesson.title}</span>
      <span style="font-size:12px;color:rgba(255,255,255,.7);">Tap to watch on YouTube ↗</span>
    </a>`;
  } else if(lesson.type==='video'){
    ph.innerHTML = `<span class="play-ic">🎥</span><span style="font-weight:700;">${lesson.title}</span><span style="font-size:12px;color:rgba(255,255,255,.6);">Video coming soon for this course</span>`;
  } else {
    ph.innerHTML = `<span class="play-ic">📄</span><span style="font-weight:700;">${lesson.title}</span><span style="font-size:12px;color:rgba(255,255,255,.6);">This lesson is text-based — see the Notes tab</span>`;
  }
}
document.addEventListener('ended', function(e){
  if(e.target && e.target.id==='cp-video-el') toast('Lecture finished — mark it completed!','🎬');
}, true);
function selectLesson(lessonId){
  currentLessonId=lessonId;
  const enr = DB.enrollments.find(e=>e.studentId===session.id && e.courseId===currentCourseId);
  enr.lastLesson=lessonId; saveDB();
  renderPlayer();
}
function setPlayerTab(tab){
  ['video','notes','quiz'].forEach(t=>{
    document.getElementById('cp-tab-'+t).classList.toggle('active', t===tab);
    document.getElementById('cp-pane-'+t).classList.toggle('hidden', t!==tab);
  });
}
function markLessonComplete(){
  const enr = DB.enrollments.find(e=>e.studentId===session.id && e.courseId===currentCourseId);
  const idx = enr.completedLessons.indexOf(currentLessonId);
  if(idx===-1){
    enr.completedLessons.push(currentLessonId);
    toast('Lesson marked as completed!','✅');
  } else {
    enr.completedLessons.splice(idx,1);
    toast('Lesson marked as not completed','↩️');
  }
  saveDB();
  renderPlayer();
}
let currentQuizSet=null, currentQuizForCourse=null, lastQuizReview=null;
function shuffleArr(arr){
  const a=arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
function pickRandomQuestions(c, n){
  const pool = shuffleArr(c.quiz);
  const picked = pool.slice(0, Math.min(n, pool.length));
  return picked.map(q=>{
    const opts = shuffleArr(q.options.map((o,idx)=>({o,idx})));
    const newAnswer = opts.findIndex(x=>x.idx===q.answer);
    return {id:q.id, q:q.q, options:opts.map(x=>x.o), answer:newAnswer};
  });
}
function renderQuizArea(enr, c){
  const allDone = enr.completedLessons.length >= c.lessons.length;
  const area = document.getElementById('cp-quiz-area');
  if(!allDone){ area.innerHTML = '<div class="empty-state">Complete all lessons to unlock the quiz.</div>'; return; }
  if(enr.quizScore!==null && enr.quizScore!==undefined){
    let reviewHtml = '';
    if(lastQuizReview && lastQuizReview.courseId===c.id){
      reviewHtml = `<div style="text-align:left;margin-top:18px;">${lastQuizReview.set.map((q,i)=>{
        const picked = lastQuizReview.answers[i];
        return `<div class="quiz-q"><b>${i+1}. ${q.q}</b>
          ${q.options.map((o,oi)=>{
            let cls='quiz-opt';
            if(oi===q.answer) cls+=' correct';
            else if(oi===picked) cls+=' wrong';
            return `<div class="${cls}" style="cursor:default;"><span class="opt-circle"></span><span>${o}</span></div>`;
          }).join('')}</div>`;
      }).join('')}</div>`;
    }
    area.innerHTML = `<div class="panel" style="text-align:center;">
      <h3>Quiz Result</h3><div style="font-size:32px;font-weight:900;color:var(--p);">${enr.quizScore}%</div>
      <p style="color:var(--muted);font-size:13px;margin:8px 0 16px;">${enr.quizScore>=60?'Great job! You passed the quiz.':'Keep practicing — you can retake the quiz.'}</p>
      <p style="color:var(--muted);font-size:11.5px;margin:-8px 0 16px;">Each attempt has 10 random questions from the question bank. Green = correct answer, Red = your wrong pick.</p>
      <button class="btn btn-outline btn-sm" onclick="retakeQuiz()">Retake Quiz</button>
      ${enr.certificateIssued ? `<button class="btn btn-primary btn-sm" onclick="viewCertificate('${c.id}')">View Certificate 🎓</button>` : ''}
      ${reviewHtml}
      </div>`;
    return;
  }
  if(!currentQuizSet || currentQuizForCourse!==c.id){ currentQuizSet = pickRandomQuestions(c,10); currentQuizForCourse=c.id; window._quizAnswers = {}; }
  area.innerHTML = `<div id="quiz-form">${currentQuizSet.map((q,i)=>`
    <div class="quiz-q"><b>${i+1}. ${q.q}</b>
      ${q.options.map((o,oi)=>`<div class="quiz-opt${window._quizAnswers[i]===oi?' selected':''}" data-q="${i}" data-o="${oi}" onclick="selectOpt(${i},${oi})"><span class="opt-circle"></span><span>${o}</span></div>`).join('')}
    </div>`).join('')}
    <button class="btn btn-primary" style="margin-top:10px;" onclick="submitQuiz()">Submit Quiz</button></div>`;
}
function selectOpt(qi,oi){
  window._quizAnswers[qi]=oi;
  document.querySelectorAll(`.quiz-opt[data-q="${qi}"]`).forEach(el=>el.classList.toggle('selected', +el.dataset.o===oi));
}
function submitQuiz(){
  const enr = DB.enrollments.find(e=>e.studentId===session.id && e.courseId===currentCourseId);
  let correct=0;
  (currentQuizSet||[]).forEach((q,i)=>{ if(window._quizAnswers[i]===q.answer) correct++; });
  const total = (currentQuizSet||[]).length || 1;
  const score = Math.round((correct/total)*100);
  enr.quizScore=score;
  const c=getCourse(currentCourseId);
  if(score>=60 && !enr.certificateIssued){ enr.certificateIssued=true; addNotification(session.id, `Certificate earned for "${c.title}"!`); }
  saveDB();
  toast(`Quiz submitted — score: ${score}%`, score>=60?'🎉':'📝');
  lastQuizReview = {courseId: currentCourseId, set: currentQuizSet, answers: {...window._quizAnswers}};
  currentQuizSet=null; currentQuizForCourse=null;
  renderPlayer();
}
function retakeQuiz(){
  const enr = DB.enrollments.find(e=>e.studentId===session.id && e.courseId===currentCourseId);
  enr.quizScore=null; currentQuizSet=null; currentQuizForCourse=null; lastQuizReview=null; saveDB(); renderPlayer();
}
function addNotification(userId, message){ DB.notifications.push({id:uid('ntf'), userId, message, ts:Date.now(), read:false}); }

/* ---- Certificates ---- */
function renderCertificates(){
  const enrs = myEnrollments().filter(e=>e.certificateIssued);
  document.getElementById('s-cert-grid').innerHTML = enrs.map(e=>{
    const c=getCourse(e.courseId);
    return `<div class="course-card"><div class="course-thumb">🎓</div><div class="course-body">
      <h4>${c.title}</h4><div class="course-foot"><span></span><button class="btn btn-primary btn-sm" onclick="viewCertificate('${c.id}')">View</button></div></div></div>`;
  }).join('');
  document.getElementById('s-cert-empty').classList.toggle('hidden', enrs.length>0);
}
function viewCertificate(courseId){
  const c=getCourse(courseId); const u=getUser(session.id);
  const enr = DB.enrollments.find(e=>e.studentId===session.id && e.courseId===courseId);
  const certId = 'EDU-'+c.id.slice(-5).toUpperCase()+'-'+u.id.slice(-4).toUpperCase();
  document.getElementById('cert-frame-content').innerHTML = `
    <div class="seal">🎓</div>
    <div class="title">Certificate of Completion</div>
    <p style="color:var(--muted);margin-top:14px;">This certifies that</p>
    <div class="name">${u.name}</div>
    <p style="color:var(--muted);">has successfully completed the course</p>
    <div class="course">"${c.title}"</div>
    <p style="font-size:12px;color:var(--muted);">Instructor: ${c.instructorName} &nbsp;|&nbsp; Quiz Score: ${enr.quizScore}% &nbsp;|&nbsp; Issued: ${fmtDate(Date.now())}</p>
    <p style="margin-top:16px;font-weight:800;color:var(--p);">EduSphere</p>
    <p class="cert-id">Certificate ID: ${certId}</p>`;
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-cert-detail').classList.add('active');
  document.getElementById('page-title').textContent='Certificate'; document.getElementById('page-sub').textContent=c.title;
}

/* ---- Notifications / Profile ---- */
function renderNotifications(){
  const list = DB.notifications.filter(n=>n.userId===session.id).sort((a,b)=>b.ts-a.ts);
  document.getElementById('s-notif-list').innerHTML = list.map(n=>`
    <div class="row-between" style="padding:10px 0;border-bottom:1px solid var(--border);">
      <div><div style="font-size:13px;">${n.message}</div><div style="font-size:11px;color:var(--muted);">${fmtDate(n.ts)}</div></div>
    </div>`).join('');
  document.getElementById('s-notif-empty').classList.toggle('hidden', list.length>0);
}
function renderStudentProfile(){
  const u=getUser(session.id);
  document.getElementById('sp-name').value=u.name; document.getElementById('sp-email').value=u.email;
  document.getElementById('sp-ok').style.display='none';
}
function saveStudentProfile(){
  const u=getUser(session.id); u.name=document.getElementById('sp-name').value.trim()||u.name; saveDB();
  document.getElementById('user-chip').textContent='👤 '+u.name.split(' ')[0];
  const ok=document.getElementById('sp-ok'); ok.textContent='Profile updated.'; ok.style.display='block';
  toast('Profile updated.','✅');
}

/* ===================== INSTRUCTOR ===================== */
function myCourses(){ return DB.courses.filter(c=>c.instructorId===session.id); }
function renderInstructorDashboard(){
  const courses = myCourses();
  const totalStudents = new Set(DB.enrollments.filter(e=>courses.some(c=>c.id===e.courseId)).map(e=>e.studentId)).size;
  const totalEnrollments = DB.enrollments.filter(e=>courses.some(c=>c.id===e.courseId)).length;
  const approved = courses.filter(c=>c.status==='approved').length;
  document.getElementById('i-stat-cards').innerHTML = `
    <div class="card stat-card"><div class="k">My Courses</div><div class="v">${courses.length}</div></div>
    <div class="card stat-card"><div class="k">Approved</div><div class="v">${approved}</div></div>
    <div class="card stat-card"><div class="k">Total Students</div><div class="v">${totalStudents}</div></div>
    <div class="card stat-card"><div class="k">Total Enrollments</div><div class="v">${totalEnrollments}</div></div>`;
  document.getElementById('i-dash-courses').innerHTML = courses.map(c=>instructorCourseCard(c)).join('') || '<div class="empty-state">No courses yet — create your first course!</div>';
}
function instructorCourseCard(c){
  const enrCount = DB.enrollments.filter(e=>e.courseId===c.id).length;
  const statusBadge = c.status==='approved'?'green':c.status==='pending'?'amber':'red';
  return `<div class="course-card"><div class="course-thumb">${c.thumb}</div><div class="course-body">
    <h4>${c.title}</h4><div class="course-meta"><span class="badge ${statusBadge}">${c.status}</span><span>${enrCount} students</span></div>
    <div class="course-foot"><button class="btn btn-outline btn-sm" onclick="openCourseForm('${c.id}')">Edit</button>
    <button class="btn btn-danger btn-sm" onclick="deleteCourse('${c.id}')">Delete</button></div></div></div>`;
}
function renderInstructorCourses(){ document.getElementById('i-courses-grid').innerHTML = myCourses().map(c=>instructorCourseCard(c)).join('') || '<div class="empty-state">No courses yet.</div>'; }
function deleteCourse(courseId){
  if(!confirm('Delete this course? This cannot be undone.')) return;
  DB.courses = DB.courses.filter(c=>c.id!==courseId);
  DB.enrollments = DB.enrollments.filter(e=>e.courseId!==courseId);
  saveDB(); renderInstructorCourses(); renderInstructorDashboard();
  toast('Course deleted.','🗑️');
}
function renderInstructorStudents(){
  const courses = myCourses();
  const sel = document.getElementById('is-course');
  if(sel.options.length===0 || sel.dataset.count!=courses.length){
    sel.innerHTML = courses.map(c=>`<option value="${c.id}">${c.title}</option>`).join('');
    sel.dataset.count = courses.length;
  }
  const courseId = sel.value || (courses[0] && courses[0].id);
  const enrs = DB.enrollments.filter(e=>e.courseId===courseId);
  document.getElementById('is-body').innerHTML = enrs.map(e=>{
    const s=getUser(e.studentId); const pct=courseProgress(e);
    return `<tr><td>${s.name}</td><td><div class="progress-bar" style="width:100px;"><div class="fill" style="width:${pct}%"></div></div></td>
      <td>${e.quizScore!==null && e.quizScore!==undefined ? e.quizScore+'%' : '—'}</td>
      <td><span class="badge ${e.certificateIssued?'green':'gray'}">${e.certificateIssued?'Completed':'In Progress'}</span></td></tr>`;
  }).join('');
  document.getElementById('is-empty').classList.toggle('hidden', enrs.length>0);
}
function renderInstructorProfile(){
  const u=getUser(session.id);
  document.getElementById('ip-name').value=u.name; document.getElementById('ip-email').value=u.email;
  document.getElementById('ip-ok').style.display='none';
}
function saveInstructorProfile(){
  const u=getUser(session.id); u.name=document.getElementById('ip-name').value.trim()||u.name; saveDB();
  document.getElementById('user-chip').textContent='👤 '+u.name.split(' ')[0];
  const ok=document.getElementById('ip-ok'); ok.textContent='Profile updated.'; ok.style.display='block';
  toast('Profile updated.','✅');
}

/* ---- Course Create/Edit Form ---- */
let editingCourseId=null, formLessons=[], formQuestions=[];
function openCourseForm(courseId){
  editingCourseId=courseId||null;
  document.getElementById('cf-error').style.display='none';
  const catSel=document.getElementById('cf-cat'); catSel.innerHTML = DB.categories.map(c=>`<option>${c}</option>`).join('');
  if(courseId){
    const c=getCourse(courseId);
    document.getElementById('cf-title').textContent='Edit Course';
    document.getElementById('cf-title-input').value=c.title;
    catSel.value=c.category;
    document.getElementById('cf-desc').value=c.description;
    document.getElementById('cf-level').value=c.level;
    document.getElementById('cf-duration').value=c.duration;
    document.getElementById('cf-thumb').value=c.thumb;
    formLessons = JSON.parse(JSON.stringify(c.lessons));
    formQuestions = JSON.parse(JSON.stringify(c.quiz));
  }else{
    document.getElementById('cf-title').textContent='Create Course';
    document.getElementById('cf-title-input').value=''; document.getElementById('cf-desc').value='';
    document.getElementById('cf-level').value='Beginner'; document.getElementById('cf-duration').value='';
    document.getElementById('cf-thumb').value='📘';
    formLessons=[]; formQuestions=[];
  }
  renderLessonFields(); renderQuestionFields();
  document.getElementById('course-modal').classList.add('show');
}
function closeCourseModal(){ document.getElementById('course-modal').classList.remove('show'); }
function addLessonField(){ formLessons.push({id:uid('les'), title:'', type:'video', duration:'', content:''}); renderLessonFields(); }
function renderLessonFields(){
  document.getElementById('cf-lessons').innerHTML = formLessons.map((l,i)=>`
    <div class="lesson-form-item">
      <input style="flex:1;padding:7px 9px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--text);" placeholder="Lesson title" value="${l.title}" oninput="formLessons[${i}].title=this.value">
      <select style="padding:7px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--text);" onchange="formLessons[${i}].type=this.value">
        <option value="video" ${l.type==='video'?'selected':''}>Video</option><option value="notes" ${l.type==='notes'?'selected':''}>Notes</option>
      </select>
      <button class="btn btn-danger btn-sm" onclick="formLessons.splice(${i},1);renderLessonFields()">✕</button>
    </div>`).join('') || '<div style="font-size:12px;color:var(--muted);">No lessons added yet.</div>';
}
function addQuestionField(){ formQuestions.push({id:uid('q'), q:'', options:['','','',''], answer:0}); renderQuestionFields(); }
function renderQuestionFields(){
  document.getElementById('cf-questions').innerHTML = formQuestions.map((q,i)=>`
    <div class="q-form-item">
      <div style="display:flex;gap:6px;margin-bottom:6px;">
        <input style="flex:1;padding:7px 9px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--text);" placeholder="Question" value="${q.q}" oninput="formQuestions[${i}].q=this.value">
        <button class="btn btn-danger btn-sm" onclick="formQuestions.splice(${i},1);renderQuestionFields()">✕</button>
      </div>
      <div class="grid2">
        ${q.options.map((o,oi)=>`<input style="padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--text);font-size:11.5px;" placeholder="Option ${oi+1}" value="${o}" oninput="formQuestions[${i}].options[${oi}]=this.value">`).join('')}
      </div>
      <div style="margin-top:6px;font-size:11.5px;">Correct answer:
        <select onchange="formQuestions[${i}].answer=+this.value">
          ${q.options.map((o,oi)=>`<option value="${oi}" ${q.answer===oi?'selected':''}>Option ${oi+1}</option>`).join('')}
        </select></div>
    </div>`).join('') || '<div style="font-size:12px;color:var(--muted);">No questions added yet.</div>';
}
function saveCourse(){
  const title=document.getElementById('cf-title-input').value.trim();
  const err=document.getElementById('cf-error');
  if(!title){ err.textContent='Course title is required.'; err.style.display='block'; return; }
  if(formLessons.some(l=>!l.title.trim())){ err.textContent='All lessons need a title.'; err.style.display='block'; return; }
  const payload = {
    title, category: document.getElementById('cf-cat').value, description: document.getElementById('cf-desc').value.trim(),
    level: document.getElementById('cf-level').value, duration: document.getElementById('cf-duration').value.trim() || '4 weeks',
    thumb: document.getElementById('cf-thumb').value.trim() || '📘',
    lessons: formLessons.map(l=>({...l, content: l.content || `Content for ${l.title}.`, duration: l.type==='video' ? (l.duration||'10 min') : ''})),
    quiz: formQuestions.filter(q=>q.q.trim()),
  };
  if(editingCourseId){
    const c=getCourse(editingCourseId); Object.assign(c, payload);
    toast('Course updated.','✅');
  }else{
    const u=getUser(session.id);
    DB.courses.push({id:uid('crs'), instructorId:session.id, instructorName:u.name, status:'pending', ...payload});
    toast('Course created — pending admin approval.','📚');
  }
  saveDB(); closeCourseModal(); renderInstructorCourses(); renderInstructorDashboard();
}

/* ===================== ADMIN ===================== */
function renderAdminDashboard(){
  const students = DB.users.filter(u=>u.role==='student').length;
  const instructors = DB.users.filter(u=>u.role==='instructor').length;
  const courses = DB.courses.length;
  const enrollments = DB.enrollments.length;
  const completed = DB.enrollments.filter(e=>e.certificateIssued).length;
  document.getElementById('a-stat-cards').innerHTML = `
    <div class="card stat-card"><div class="k">Total Students</div><div class="v">${students}</div></div>
    <div class="card stat-card"><div class="k">Total Instructors</div><div class="v">${instructors}</div></div>
    <div class="card stat-card"><div class="k">Total Courses</div><div class="v">${courses}</div></div>
    <div class="card stat-card"><div class="k">Total Enrollments</div><div class="v">${enrollments}</div></div>
    <div class="card stat-card"><div class="k">Completed Courses</div><div class="v">${completed}</div></div>
    <div class="card stat-card"><div class="k">Active Users</div><div class="v">${DB.users.length}</div></div>`;
  const perCourse = DB.courses.map(c=>({title:c.title, n: DB.enrollments.filter(e=>e.courseId===c.id).length})).sort((a,b)=>b.n-a.n).slice(0,6);
  const max = Math.max(1,...perCourse.map(x=>x.n));
  document.getElementById('a-chart').innerHTML = perCourse.map(x=>`<div class="bar" style="height:${Math.max(6,(x.n/max)*100)}%"><span>${x.n}</span></div>`).join('') || '<div class="empty-state">No enrollment data yet.</div>';
}
function renderAdminStudents(){
  const q=(document.getElementById('as-search').value||'').toLowerCase();
  const list = DB.users.filter(u=>u.role==='student' && (u.name.toLowerCase().includes(q)||u.email.toLowerCase().includes(q)));
  document.getElementById('as-body').innerHTML = list.map(u=>{
    const n = DB.enrollments.filter(e=>e.studentId===u.id).length;
    return `<tr><td>${u.name}</td><td>${u.email}</td><td>${n}</td>
      <td><button class="btn btn-danger btn-sm" onclick="deleteUser('${u.id}')">Delete</button></td></tr>`;
  }).join('');
}
function renderAdminInstructors(){
  const q=(document.getElementById('ai-search').value||'').toLowerCase();
  const list = DB.users.filter(u=>u.role==='instructor' && (u.name.toLowerCase().includes(q)||u.email.toLowerCase().includes(q)));
  document.getElementById('ai-body').innerHTML = list.map(u=>{
    const n = DB.courses.filter(c=>c.instructorId===u.id).length;
    return `<tr><td>${u.name}</td><td>${u.email}</td><td>${n}</td>
      <td><span class="badge ${u.status==='approved'?'green':'amber'}">${u.status}</span></td>
      <td>${u.status==='pending' ? `<button class="btn btn-primary btn-sm" onclick="setInstructorStatus('${u.id}','approved')">Approve</button>
        <button class="btn btn-danger btn-sm" onclick="setInstructorStatus('${u.id}','rejected')">Reject</button>`
        : `<button class="btn btn-outline btn-sm" onclick="setInstructorStatus('${u.id}','${u.status==='approved'?'suspended':'approved'}')">${u.status==='approved'?'Suspend':'Reinstate'}</button>`}</td></tr>`;
  }).join('');
}
function setInstructorStatus(userId,status){ const u=getUser(userId); u.status=status; saveDB(); renderAdminInstructors(); toast('Instructor status updated.','✅'); }
function deleteUser(userId){
  if(!confirm('Delete this user?')) return;
  DB.users = DB.users.filter(u=>u.id!==userId);
  DB.enrollments = DB.enrollments.filter(e=>e.studentId!==userId);
  saveDB(); renderAdminStudents(); toast('User deleted.','🗑️');
}
function renderAdminCourses(){
  const q=(document.getElementById('ac-search').value||'').toLowerCase();
  const list = DB.courses.filter(c=>c.title.toLowerCase().includes(q));
  document.getElementById('ac-body').innerHTML = list.map(c=>{
    const n = DB.enrollments.filter(e=>e.courseId===c.id).length;
    const badge = c.status==='approved'?'green':c.status==='pending'?'amber':'red';
    return `<tr><td>${c.title}</td><td>${c.instructorName}</td><td>${c.category}</td><td>${n}</td>
      <td><span class="badge ${badge}">${c.status}</span></td>
      <td>${c.status==='pending' ? `<button class="btn btn-primary btn-sm" onclick="setCourseStatus('${c.id}','approved')">Approve</button>
        <button class="btn btn-danger btn-sm" onclick="setCourseStatus('${c.id}','rejected')">Reject</button>`
        : `<button class="btn btn-outline btn-sm" onclick="setCourseStatus('${c.id}','${c.status==='approved'?'rejected':'approved'}')">${c.status==='approved'?'Unpublish':'Approve'}</button>`}</td></tr>`;
  }).join('');
}
function setCourseStatus(courseId,status){ const c=getCourse(courseId); c.status=status; saveDB(); renderAdminCourses(); toast('Course status updated.','✅'); }
function renderAdminCategories(){
  document.getElementById('cat-manage-list').innerHTML = DB.categories.map(c=>`
    <span class="badge gray" style="font-size:12px;padding:7px 12px;">${c} <a href="#" style="color:var(--red);margin-left:6px;" onclick="removeCategory('${c}');return false;">✕</a></span>`).join('');
}
function addCategory(){
  const val=document.getElementById('new-cat').value.trim();
  if(!val) return;
  if(DB.categories.includes(val)){ toast('Category already exists.','⚠️'); return; }
  DB.categories.push(val); saveDB(); document.getElementById('new-cat').value=''; renderAdminCategories(); toast('Category added.','✅');
}
function removeCategory(cat){ DB.categories = DB.categories.filter(c=>c!==cat); saveDB(); renderAdminCategories(); }
function renderAdminFeedback(){
  document.getElementById('af-body').innerHTML = DB.feedback.map(f=>`<tr><td>${f.from}</td><td>${f.message}</td><td>${fmtDate(f.ts)}</td></tr>`).join('');
  document.getElementById('af-empty').classList.toggle('hidden', DB.feedback.length>0);
}
function renderAdminSettings(){
  document.getElementById('set-name').value=DB.settings.siteName;
  document.getElementById('set-tagline').value=DB.settings.tagline;
  document.getElementById('set-ok').style.display='none';
}
function saveSettings(){
  DB.settings.siteName=document.getElementById('set-name').value.trim()||DB.settings.siteName;
  DB.settings.tagline=document.getElementById('set-tagline').value.trim()||DB.settings.tagline;
  saveDB();
  const ok=document.getElementById('set-ok'); ok.textContent='Settings saved.'; ok.style.display='block';
  toast('Settings saved.','✅');
}

/* ===================== THEME ===================== */
function applyTheme(){
  let saved=null; try{ saved=localStorage.getItem('edusphere_theme'); }catch(e){}
  if(saved) document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('theme-btn').textContent = (document.documentElement.getAttribute('data-theme')==='dark') ? '☀️' : '🌙';
}
function toggleTheme(){
  const cur=document.documentElement.getAttribute('data-theme');
  const next = cur==='dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try{ localStorage.setItem('edusphere_theme', next); }catch(e){}
  document.getElementById('theme-btn').textContent = next==='dark' ? '☀️' : '🌙';
}

/* ===================== INIT ===================== */
renderPublicSite();
setLoginRole('student'); setRegRole('student');
