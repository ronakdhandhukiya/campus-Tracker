const mongoose = require('mongoose')


const complaint = new mongoose.Schema({
    studentName : {type : String , required:[true,"Student name required"],trim: true,},
    email : {type:String ,required:[true,"Email is required"],trim: true, lowercase: true},
    title : {type :String , required:[true,"title required"], trim: true},
    description :  {type :String , required:[true,"description required"]},
    category : {type : String, enum :['Infrastructure','IT','Cleanliness0','Security','Other'],default : 'Other'},
    priority : {type :String,enum :['Low','Medium','High'], default: 'Low'},
    location : {type:String},
    status : {type:String, enum:['Open','In Progress','Resolved','Rejected'],default:'open'},
},{
    timestamps : true
})

const Complaint = mongoose.model('complaint',complaint)

module.exports = Complaint