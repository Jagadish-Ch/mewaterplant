const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
    "id": String,
    "username": String,
    "password": String
})

const UserSchema = mongoose.Schema({
    "id": String,
    "username": String,
    "password": String
})

const ReportSchema = mongoose.Schema({
    "CanNo": [
        String
    ],
    "ReturnedCanNo": [
        String
    ],
    "DateTime": [
        String
    ],
    "WaterType": String,
    "Name": String,
    "MobileNo": String,
    "TotalCans": Number,
    "ReturnedCans": Number,
    "Address": String,
    "EachCanAmount": Number,
    "Amount": Number,
    "PaidOrNot": String
})

const AdminModel = mongoose.model("admin", AdminSchema)
const UserModel = mongoose.model("user", UserSchema)
const ReportModel = mongoose.model("report", ReportSchema)

module.exports = {AdminModel,UserModel,ReportModel}