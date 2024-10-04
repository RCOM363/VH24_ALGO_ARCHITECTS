import asyncHandler from 'express-async-handler'
import {Donor} from '../../models/donor.model.js'
import {ApiError} from '../../utils/ApiError.js'
import {ApiResponse} from '../../utils/ApiResponse.js'
import bcryptjs from 'bcryptjs'
import { generateToken } from '../../utils/generateToken.js'
import { Supplier } from '../../models/supplier.model.js'
import { Institute } from '../../models/institute.model.js'

export const login = asyncHandler(async (req, res) => {
    const { email, password,role } = req.body;
    console.log("Req.body", req.body, req.user);
    const { id, type } = req.user;
  
    let user;
    if (role === 'donor') {
      user = await Donor.findOne({ email });
    } else if (role === 'institute') {
      user = await Institute.findOne({ email });
    } else if (role === 'supplier') {
      user = await Supplier.findOne({ email });
    }
  
    if (!user) {
      return res.status(404).json({ msg: "User Does Not Exist" });
    }
  
    console.log("User", user);
  
    if (!email || !password) {
      return res.status(400).json({ msg: "Some fields are missing" });
    }
  
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
  
    const token = generateToken(user._id, type);
    return res
      .status(200)
      .cookie('token', token, { httpOnly: true, secure: true })
      .json({ msg: "Login Successful" });
  });

