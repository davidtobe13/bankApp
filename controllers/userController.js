const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) =>{
    try{
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            confirmPassword
    } = req.body
        const userExists = await userModel.findOne({email})

        if(userExists){
            return res.status(400).json({
                message: `User with email: ${userExists.email} already exists`
            })
        }
          
        if(password != confirmPassword){
            return res.status(400).json({
                message: `Password does not match`
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password && confirmPassword, salt)

        const user = await userModel.create({
            firstName:firstName.toLowerCase().charAt(0).toUpperCase() + firstName.slice(1),
            lastName:lastName.toLowerCase().charAt(0).toUpperCase() + lastName.slice(1),
            email:email.toLowerCase(),
            phoneNumber,
            acctNumber:phoneNumber.slice(1, 11),
            password: hash,
            confirmPassword: hash
            
        })
        res.status(201).json({
            message: `Welcome, ${user.firstName} ${user.lastName.slice(0,1).toUpperCase()}. You have created an account successfully`,
            data: user
        })

    }catch(err){
        res.status(500).json({
            message: err.message 
        })
    }

}

//Create a login function for the user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the provided detail is an email or phone number
        const user = await userModel.findOne({email});

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // Check if the provided password is correct
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid password',
            });
        }

        // Create and sign a JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                phoneNumber: user.phoneNumber,
            },
            process.env.secret,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: `Welcome onboard, ${user.firstName} .${user.lastName.slice(0,1).toUpperCase()}. You have successfully logged in`,
            token,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};


exports.logOut = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: 'This user does not exist',
            });
        }
        const token = req.headers.authorization.split(' ')[1];
        user.blacklist.push(token)
        await user.save()

        res.status(200).json({
            message: 'User signed out successfully',
            user
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};


exports.getOne = async (req, res) =>{
    try{
        const userId = req.user.userId

        const user = await userModel.findById(userId)

        if(!user){
            return res.status(404).json({
                message: `User not found`
            })
        }
        res.status(200).json({
            message: `User fetched successfully`,
            data: {
                name:`${user.firstName} ${user.lastName}`,
                email: user.email,
                acctNumber: user.acctNumber
            }
        })

    }catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}