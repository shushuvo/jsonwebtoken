const express = require('express');
const app = express()
const jwt = require('jsonwebtoken') 

const cookieParser = require('cookie-parser')
app.use(cookieParser())

let payload = {id: 00}
const token = jwt.sign(payload, 'ahsdiuahsfisgfwerahoi23y958327958235');

app.get('/', (req, res) => {
  res.sendFile('register.html',{root:__dirname})
  res.cookie('jesonwalker', token)
  console.log(req.cookies.c_user)
})


const auth = async (req, res, next)=>{
  try{
    const token = req.cookies.jesonwalker;
    const verifyUser = jwt.verify(token, 'ahsdiuahsfisgfwerahoi23y958327958235');
    console.log(verifyUser)
    next()
  }catch (error){
    res.send(error)
  }
}

app.get('/home', auth, (req, res) => {
  res.sendFile('home.html',{root:__dirname})
  let tokenc = req.cookies.jesonwalker
  console.log(tokenc)
})




app.listen(4000)


