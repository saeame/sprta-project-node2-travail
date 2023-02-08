const UserController = require('../controllers/user.controller');
const { authMiddleware, authAdmin, loginCheck } = require('../middleware/auth.middleware');
const router = require('express').Router();

const userController = new UserController();

// 회원가입
router.post('/', loginCheck, userController.signup);
// 유저 전체 조회 - 회원관리 시 필요
router.get('/', authMiddleware, authAdmin, userController.getUser);
// userId 사용자 조회
router.get('/:userId', authMiddleware, userController.getUserDetail);
// userId 사용자 수정
router.patch('/:userId', authMiddleware, userController.updateUser);
// userId 사용자 삭제
router.delete('/:userId', authMiddleware, userController.deleteUser);

// 로그인
router.post('/login', loginCheck, userController.login);
// 로그아웃
router.post('/logout', authMiddleware, userController.logout);

module.exports = router;
