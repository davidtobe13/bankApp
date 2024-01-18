const express = require('express');

const router = express.Router();
const { signUp, login, logOut, getOne, createPin, profileImage } = require('../controllers/userController');
const authorization = require('../middleware/authorization');
const validation = require('../validation/validation');
const upload = require('../utils/multer');


// userRouter.js

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations related to users
 */

  

/**
 * @swagger
 * /api/v1/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/responses'
 *       '400':
 *         description: Invalid request or user already exists
 *         content:
 *           application/json:
 *             example:
 *               message: 'Invalid request or user already exists'
 */
router.post('/signup', validation, signUp);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         schema:
 *           $ref: '#/responses'
 *       '404':
 *         description: User not found
 *       '400':
 *         description: Invalid password
 * 
 * */


router.post('/login', login)


/**
 * @swagger
 * /api/v1/logout:
 *   post:
 *     summary: Log out user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User signed out successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User signed out successfully
 *               user:
 *                 $ref: '#/responses' 
 *       '401':
 *         description: Unauthorized. User not authenticated
 *       '500':
 *         description: Internal Server message
 */
router.post('/logout', authorization, logOut);

/**
 * @swagger
 * /api/v1/getone:
 *   get:
 *     summary: Get user details
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User fetched successfully
 *               data:
 *                 name: John Doe
 *                 email: john.doe@example.com
 *                 acctNumber: 123456789
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: User not found
 */

router.get('/getone', authorization, getOne);


router.put('/createpin', authorization, createPin)


router.put('/profileimage', authorization, upload.single('profileImage'), profileImage)

module.exports = router;   
