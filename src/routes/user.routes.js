const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = require('express').Router();

const userController = new UserController();

// 회원가입
router.post('/', userController.signup);
// 로그인
router.post('/login', userController.login);
// 유저 전체 조회
router.get('/', userController.getUser);
// userId 사용자 조회
router.get('/:userId', userController.getUserDetail);
// userId 사용자 수정
router.patch('/:userId', authMiddleware, userController.updateUser);
// userId 사용자 삭제
router.delete('/:userId', authMiddleware, userController.deleteUser);

module.exports = router;
