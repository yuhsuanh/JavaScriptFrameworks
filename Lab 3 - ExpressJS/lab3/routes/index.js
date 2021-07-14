var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'home' });
});

/* GET Family member pages */
router.get('/shen', (req, res, next) => {
  var member = {
    name: 'Shen Huang',
    title: '(Grandpa)',
    img: '/images/46630021.JPG',
    location: 'Taoyuan, Taiwan',
    occupation: '',
    description: 'My favorite grandpa. Shen likes winetasting. He has his own wine cellar, which contains 200-300 bottles of wine. He also likes to buy us the food we like to eat. He is ninety-four years old and still in good health.'
  }

  res.render('members/shen', { title: 'Shen', member: member });
});

router.get('/hsiang', (req, res, next) => {
  var member = {
    name: 'Hsiang Huang',
    title: '(Dad)',
    img: '/images/46630036.JPG',
    location: 'Taoyuan, Taiwan',
    occupation: 'Labor Worker',
    description: 'Hsiang likes to try many new things. He used to enjoy many leisure activities such as painting, pottery, cycling, camping, vinyl records, and playing guitar. His current interests are fishing and chatting with friends.'
  }

  res.render('members/hsiang', { title: 'Hsiang', member: member });
});

router.get('/ping', (req, res, next) => {
  var member = {
    name: 'Ping Lee',
    title: '(Mom)',
    img: '/images/68840021.JPG',
    location: 'Taoyuan, Taiwan',
    occupation: 'Accounting',
    description: 'Ping likes to communicate with people. She establish a rapport with the neighbors. Ping\'s interests are planting flowers and walking. He planted many succulent plants and orchids. She likes to take a walk in the nearby park after dinner.'
  }

  res.render('members/ping', { title: 'Ping', member: member });
});

router.get('/yurou', (req, res, next) => {
  var member = {
    name: 'YuRou Huang',
    title: '',
    img: '/images/69970035.JPG',
    location: 'Taoyuan, Taiwan',
    occupation: 'Quality Assurance Assistant',
    description: 'YuRou likes outdoor activities, such as biking, climbing, traveling, etc. She likes to explore mountains that she has never climbed with her friends during holidays, or go to places that she has never visited. She also likes to travel abroad every year, and he likes the culture of Thailand and Japan very much.'
  }

  res.render('members/yurou', { title: 'YuRou', member: member });
});

router.get('/yuhsuan', (req, res, next) => {
  var member = {
    name: 'YuHsuan Huang',
    title: '',
    img: '/images/46620035.JPG',
    location: 'Toronto, Canada',
    occupation: 'Software Engineer',
    description: 'I currently live in Canada. I like all kinds of outdoor activities, such as skiing, cycling, and boating. I like to appreciate the beauty of various places and I like to record these beautiful moments through photography.'
  }

  res.render('members/yuhsuan', { title: 'YuHsuan', member: member });
});

router.get('/yutzu', (req, res, next) => {
  var member = {
    name: 'YuTzu Huang',
    title: '',
    img: '/images/36590022.JPG',
    location: 'TaiChung, Taiwan',
    occupation: 'Supervisor of the Design Department',
    description: 'YuTzu likes art and architecture. She has been learning to paint since elementary school. High school and university studying in art-related departments. She went to China for a short study and worked in the production of leather products in China. Returned to work in a Taiwan company due to the epidemic.'
  }

  res.render('members/yutzu', { title: 'YuTzu', member: member });
});


module.exports = router;
