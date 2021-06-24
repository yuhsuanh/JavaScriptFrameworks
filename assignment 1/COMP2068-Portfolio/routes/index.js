var express = require('express');
var router = express.Router();

/* GET method: home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET method: about page */
router.get('/about', (req, res, next) => {
  //profile object
  let profile = {
    name: 'YuHsuan Huang',
    introduction: 'I am well organized and self-motivated. I enjoy being challenged and engaging with projects that require me to work outside my comfort and knowledge set, as continuing to learn new development techniques are important to me and the success of your organization.',
    address: 'Toronto, Ontario Canada',
    phone: '(+1) 647-000-0000',
    email: 'Yu-Hsuan.Huang@MyGeorgian.ca'
  };
  //work experience objects array
  let works = [
    {company: 'Price Group Corp.', duration: 'Aug 2020 - Jan 2021', position: 'Web Development Intern', description: [ {text:'Modify the web pages UI to let customers know more information about the company, product categories, and products'}, {text:'Getting statistical data from web browsing to understand the number of website users and the parts that need to be improved'} ]},
    {company: 'Mirle Automation Corp.', duration: 'Sep 2016 - May 2018', position: 'Software Engineer', description: [ {text:'Develop new functions on the website, so that risk managers can faster modify the data before running the batch'}, {text:'Write shell scripts let staffs can re-run batches or restart the IBM risk management analysis system through the web'}, {text:'Coding SQL to obtain risk data generated from the IBM Algo system, and staff can quickly use the website to generate relevant reports'} ]},
  ];
  //edication objects array
  let educations = [
    {school: 'Georgian College', duration: 'Jan 2019 - Dec 2021', location: 'Barrie, Ontario Canada', major: 'Computer Programming', degree: 'Diploma', description: [ {text:'Develop applications for window (C#), mobile (Android, iOS)'}, {text:'Manage Linux or Windows server system and Virtual environment'}, {text:'Proficient in programing language (Java) and web programming language (HTML, JavaScript, PHP, CSS, Angular, Node.js)'} ]},
    {school: 'Tzu Chi University', duration: 'Sep 2016 - Jul 2018', location: 'Hualien, Taiwan', major: 'Medical Informatics', degree: 'Master of Science', description: [ {text:'Due to this department is to help improve the information system needed by the hospital, or to make software to help doctors perform simulation tools. Therefore, the project I had studied is "A Comics Generation System for Healthcare Contents by Analyzing Emotion in Text", hoping to quickly convert text into pictures and reduce the workload of health educators.'}, {text:'During my studies, I also took courses related to big data, such as parallel computing, neural network, machine learning, etc'} ]},
    {school: 'Tzu Chi University', duration: 'Sep 2011 - Jun 2015', location: 'Hualien, Taiwan', major: 'Medical Informatics', degree: 'Bachlor of Science', description: [ {text:'The mainly learning courses include C programming language, data structure, biological algorithm, ASP.NET web programming, c# windows form, Java, relational database system, mobile programming, etc.'}, {text:'And learn the basic knowledge of medicine, such as biology, Physiology, Genetics, Proteomics, etc.'}, {text:'I also learn about mathematics, such as calculus, linear algebra, probability, biostatistics, Computation biology, etc.'} ]},
  ];

  res.render('about', { title: 'About Me', profile: profile, works: works, educations: educations});
});

/* GET method: projects page */
router.get('/projects', (req, res, next) => {
  //project objects array
  let projects = [
    {textOrder: 1, imageOrder: 2, title: 'Countdown Date APP', link: 'https://github.com/yuhsuanhuang-tw/Countdown-Date-APP', description: 'You can try to use this APP to countdown your coming days or calculate how long after the special days. I used Ionic, Angular and Cordova to wrote this hybrid application. This application can build on iOS, Android, windows, or browser.', image: '/images/countdown-date-app.jpg', tags: [ {tag:'APP'}, {tag:'iOS'}, {tag:'Android'} ]},
    {textOrder: 2, imageOrder: 1, title: 'Telegram BOT', link: 'https://github.com/yuhsuanhuang-tw/Telegram-ChatBot-COVID-19/tree/master/TelegramBot-COVID-19', description: 'Using Java crawler package to get the COVID-19 cases from region and county. You can add my Telegram BOT @Covid_19_report_bot.', image: '/images/telegram-bot.jpg', tags: [ {tag:'Java'}, {tag:'Telegram'} ]},
    {textOrder: 1, imageOrder: 2, title: 'Trip Management System', link: 'https://github.com/yuhsuanhuang-tw/WebProgUsingPHP', description: 'Web Programming using PHP Course Project at Georgian College. This website use HTML, JavaScript, Bootstrap and PHP.', image: '/images/trip-management.jpg', tags: [ {tag:'PHP'}, {tag:'Website'} ]},
    {textOrder: 2, imageOrder: 1, title: 'Arduino Projects', link: 'https://github.com/yuhsuanhuang-tw/InternetOfThings', description: 'Internet of Things course projects at Georgian College. I develop many different sensors or buttons to make some simple tool.', image: '/images/arduino.jpg', tags: [ {tag:'Arduino'}, {tag:'C'} ]},
    {textOrder: 1, imageOrder: 2, title: 'Used Vehicle System', link: 'https://github.com/yuhsuanhuang-tw/DotNetProgrammingUsingCSharp/tree/master/final%20project', description: 'My final project in .NET Programming Using C# course in Georgian College.', image: '/images/used-vehicle.jpg', tags: [ {tag:'.NET'}, {tag:'C#'}, {tag:'Website'} ]},
    {textOrder: 2, imageOrder: 1, title: 'Real Estate Website', link: 'https://github.com/yuhsuanhuang-tw/HTML-CSS-JavaScriptFundamentals/tree/master/final%20project/estate_agent', description: 'This real estate website sample is for my web front end course project. This just use HTML, CSS and JavaScript to do this project no any back end service in this project.', image: '/images/real-estate.jpg', tags: [ {tag:'HTML'}, {tag:'CSS'}, {tag:'JavaScript'}, {tag:'Website'} ]},
  ];

  res.render('projects', { title: 'Projects', projects: projects });
});

/* GET method: contacts page */
router.get('/contacts', (req, res, next) => {
  res.render('contacts', { title: 'Contacts'});
});

/* POST method: contacts form */
router.post('/contacts', (req, res, next) => {
  let message = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  }

  res.redirect('/contacts');
});


module.exports = router;
