import asyncHandler from 'express-async-handler'
import {Donor} from '../../models/donor.model.js'
import { Location } from '../../models/location.model.js'
import bcryptjs from 'bcryptjs'
import { generateToken } from '../../utils/generateToken.js'

export const donorSignUp = asyncHandler(async(req,res)=>{
    try {
        const {fullName,email,password,phNo, location} = req.body;
        console.log(req.body);
        const existingUser =  await Donor.findOne({email})
        if(existingUser){
            return res.status(400).json({msg:"user Already Exists"})
        }
        const hashedPassword = await bcryptjs.hash(password,10)
      
        const newLocation = await Location.create({
            address:location.address,
            pincode:location.pincode,
            longitude:location.longitude,
            latitude:location.latitude
        })
        const user = await Donor.create({
            fullName,
            email,
            password:hashedPassword,
            phNo,
            location: newLocation._id
        })
        if(!user){
            return res.status(500).json({msg:"Error in creating an account"})
        }
        const token =  generateToken(user._id,"donor")
        return res.status(201).json({msg:"Signup successfull",token:token})

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error ")
    }
})





// export const donorLogin = asyncHandler(async(req,res)=>{
//     const {email, password} = req.body;
//     if(!email || !password) {
//         res.status(400).json({msg:"some fields are missing"})
//     }
//     const user = await Donor.findOne({email})
//     if(bcryptjs.compare(user.password,password)){
//         const token = generateToken(user._id)
//         return res.status(200).cookie('token',token,{httpOnly:true, secure:true}).json({msg:"LogIn Successful"})
//     }
//     return res.status(500).json({msg:"Something went wrong"})
// })

