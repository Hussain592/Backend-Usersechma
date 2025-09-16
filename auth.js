import express from "express"
import user from "../Models/user.js"
import bcrypt from "bcrypt"
import Joi from "joi"

const route = express.Router()

const registerschema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  fullname: Joi.string().alphanum().min(3).max(30).required()
})

route.post("/register", async (req, res) => {
  const { error, value } = registerschema.validate(req.body)
  if (error)
    return sendResponse(res, 400, null, true, "please input value file")

  const sser = await user.findOne({ email: value.email })
  if (sser) return sendResponse(res, 200, null, true, "email is already exist")

  const hashpassword = await bcrypt.hash(value.password, 12)
  value.password = hashpassword

  let newuser = new user({ ...value })
  newuser = await newuser.save()

  sendResponse(res, 201, newuser, false, "user successfull")
  console.log(value)
  res.send("working in register api")
})



const loginsechma = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
})





route.post("/login", async (req, res) => {
  const { error, value } = loginsechma.validate(req.body)
  if (error)
    return sendResponse(res, 400, null, true, "please input value file")

  const sser = await user.findOne({ email: value.email })
  if (!sser) return sendResponse(res, 400, null, true, "user not found")

  const validPassword = await bcrypt.compare(value.password, sser.password)
  if (!validPassword) return sendResponse(res, 400, null, true, "invalid password")

  sendResponse(res, 200, sser, false, "login successfull")
  console.log(value)
  res.send("working in login api")
})

route.post("/res-password", (req, res) => {
})

route.post("/forget-password", (req, res) => {
})

export default route
