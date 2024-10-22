const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const {AdminModel, UserModel, ReportModel} = require('./Model/MySchema')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://jagadish:jagadish@cluster0.xkb5tzh.mongodb.net/wpm_server_db?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("DB Connected...")
})
.catch(err => console.log(err))

app.get("/", (req,res) =>{
    res.send(`
        <center>
            <b><h1><i>WPM Server Api Redirect Links</i></h1></b>
            <br/>
            <a href="/admin"><h2>/admin</h2></a>\n\n
            <a href="/user"><h2>/user</h2></a>\n\n
            <a href="/report"><h2>/report</h2></a>
        </center>`
    )
})

app.post("/admin", (req,res) => {
    AdminModel.create(req.body)
    .then(admins => res.json(admins))
    .catch(err => res.json(err))
})
app.get("/admin", (req,res) => {
    AdminModel.find({})
    .then(admins => res.json(admins))
    .catch(err => res.json(err))
})



app.post("/user", (req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.get("/user", (req,res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.get("/user?key=username", (req,res) => {

    const {username} = req.params
    UserModel.find({username})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.post("/report", (req,res) => {
    ReportModel.create(req.body)
    .then(userReport => res.json(userReport))
    .catch(err => res.json(err))
})
app.get("/report", (req,res) => {
    ReportModel.find({})
    .then(CustomersReport => res.json(CustomersReport))
    .catch(err => res.json(err))
})
app.get("/report/:id", (req,res) => {
    const {id} = req.params
    ReportModel.findById({_id:id})
    .then(CustomerReport => res.json(CustomerReport))
    .catch(err => res.json(err))
})
app.put("/report/:id", (req,res) => {
    const {id} = req.params
    ReportModel.findByIdAndUpdate({_id:id},{
        
        CanNo: req.body.CanNo,
        ReturnedCanNo: req.body.ReturnedCanNo,
        DateTime: req.body.DateTime,
        WaterType: req.body.WaterType,
        Name: req.body.Name,
        MobileNo: req.body.MobileNo,
        TotalCans: req.body.TotalCans,
        ReturnedCans: req.body.ReturnedCans,
        Address: req.body.Address,
        Amount: req.body.Amount,
        PaidOrNot: req.body.PaidOrNot
    })
    .then(CustomerReport => res.json(CustomerReport))
    .catch(err => res.json(err))
})
app.delete("/report/:id", (req,res) => {
    const {id}=req.params
    ReportModel.findByIdAndDelete({_id:id})
    .then(CustomerReport => res.json(CustomerReport))
    .catch(err => res.json(err))
})


app.listen(3001, ()=>{
    console.log("Server Running...")
})