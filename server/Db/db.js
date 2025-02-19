const mongoose=require("mongoose")
require("dotenv").config()
const DBURI=process.env.DBURI

const dbConnection =()=>{

    mongoose.connect(DBURI).then(()=>{
        console.log("DB connnected successfull.")
    }).catch((err)=>{
        console.log("DB not connected to the srver" , err)
    })

}
module.exports=dbConnection