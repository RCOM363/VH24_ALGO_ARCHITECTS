import asyncHandler from 'express-async-handler'
import {Supplier} from '../../models/supplier.model.js'
import bcryptjs from 'bcryptjs'
import { generateToken } from '../../utils/generateToken.js'
import { Location } from '../../models/location.model.js'

export const supplierSignUp = asyncHandler(async(req,res)=>{
    try {
        const {name,type,email,password,phNo,location} = req.body;
        console.log(req.body);
        const existingUser =  await Supplier.findOne({email})
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
    
        const user = await Supplier.create({
            name,
            type,
            email,
            password:hashedPassword,
            phNo,
            location: newLocation._id
        })
        if(!user){
            return res.status(500).json({msg:"Error in creating an account"})
        }
        const token =  generateToken(user._id,"supplier")
        return res.status(201).json({msg:"Signup successfull",token:token})

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error ")
    }
})