const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');

// const authMiddleware  -> 로그인여부 확인해서 페이지 렌더링 또는 리다이렉트 여부 결정
// ejs는 우리가 구성한 화면마다 파일을 생성했습니다~
// ejs 쓰는 장점은 코드구성이 조금 더 간편하고,
// 웹소켓 쓸때 화면이 그대로 유지되면서 소켓으로 주고받은 정보만 바꿀수있다 합니다!
// router uri를 통일해야할 것 같은데 제가 그대로 결정하기엔 모르는것도 있어서 아래 정보는 임의로 작성해뒀습니다!

// main페이지
router.get('/products', (req, res) => {
  res.render('index.ejs', { components: 'main' });
});

// 상품 상세페이지

router.get('/products/:productId', (req, res) => {
  res.render('index.ejs', { components: 'currentProduct' });
})

//로그인페이지
router.get('/login', authMiddleware, (req, res) => {
  res.render('login.ejs', { components: 'login' });
});


router.get('/register', (req, res, next) => {
  res.render('register.ejs', { components: 'register' });
});

// mypage
router.get('/mypage', authMiddleware, (req, res) => {
  // 로그인이 안됐을 경우?
  if (!res.locals.user) {
    return res.render('login.ejs', {
      components: 'login',
      user: res.locals.user,
    });
  }
  // 근데 그 로그인이 또 고객이 아니고 어드민이야?
  if (res.locals.user.type === 'admin') {
    return res.render('admin.ejs', {
      components: 'admin',
      user: res.locals.user,
    });
  }
  res.render('index.ejs', { components: 'mypage', user: res.locals.user });
});

// 장바구니

router.get('/order/cart', (req, res) => {

  // 로그인이 안됐을 경우?
  if (!res.locals.user) {
    return res.render('login.ejs', {
      components: 'login',
      user: res.locals.user,
    });
  }
  // 근데 그 로그인이 또 고객이 아니고 어드민이야?
  if (res.locals.user.type === 'admin') {
    return res.render('admin.ejs', {
      components: 'admin',
      user: res.locals.user,
    });
  }
});

// 상품관리 (admin only)
router.get('/product/admin', authMiddleware, (req, res) => {
  // 로그인이 안됐을 경우?
  if (!res.locals.user) {
    return res.render('login.ejs', {
      components: 'login',
      user: res.locals.user,
    });
  }
  // admin 여부 확인코드인데,, 아직 미들웨어 코드를 못봐서 임의로 작성해둡니다
  //로그인됐는데 어드민이 아닌경우
  if (!res.locals.user.type === 'admin') {
    return res.render('admin.ejs', {
      components: 'admin',
      user: res.locals.user,
    });
  }
});

module.exports = router;
