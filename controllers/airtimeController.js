const userModel = require('../models/userModel')
const airtimeModel = require('../models/airtimeModel')

exports.buyAirtime = async (req, res) =>{
    try{
        const userId = req.user.userId
        const user = await userModel.findById(userId)

        if(!userId){
            return res.status(400).json({
                message: `User not found`
            })
        }

        const {phoneNumber, amount, network, pin} = req.body

        if(user.balance < amount ){
            return res.status(400).json({
                message: `Insufficient funds`
            })
        }

        if(pin != user.pin){
            return res.status(400).json({
                message: `invalid pin. Enter your valid pin`
            })
        }

        const airtime = user.balance - amount

        

        const sendAirtime = await airtimeModel.create({
            phoneNumber,
            amount,
            network,
            pin
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}