const mongoose = require("mongoose")

const TaskSchema = mongoose.Schema({
    type:{
        type:String,
        required:[true]
    },
    title:{
        type:String,
        required:[true,'Please input task title']
    },
    description:{
        type:String,
        required:[true,'Please input task description']
    },
    date:{
        type:String,
        required:[true,'Please input expiry date']
    },
    task:{
        type:String
    },
    options:{
        type:String
    },
    imageUrl:{
        type:String
    },
    audioUrl:{
        type:String
    },
    label:{
        type:String
    },
    context:{
        type:String
    },
    masterWorkers:{
        type:String,
        required:[true]
    },
    reward:{
        type:String,
        required:[true,'Please input reward per response']
    },
    workerNumber:{
        type:String,
        required:[true,'Please input number of workers']
    }
})

module.exports = mongoose.model('Task',TaskSchema)