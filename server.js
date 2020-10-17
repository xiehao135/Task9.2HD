const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const https = require('https')
const User = require('./models/User')
const Task = require('./models/Task')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(bodyParser.json());

//mongoose
mongoose.connect('mongodb://localhost:27017/iCrowdTaskDB',{useNewUrlParser:true,useUnifiedTopology:true})

//home route
app.get('/',(req,res)=>{
    const user = {
        username:'deakin',
        password:'sit313'
    }
    res.send(user)
})

//worker route
app.get('/worker',(req,res)=>{
    const task = Task

    var taskArray = task.find({},(err,docs)=>{
        if(err){
            console.log(err)
        }else{
            res.send(docs)
        }
    })
})

//delete task route
app.post('/deletetask',(req,res)=>{
    const task = Task
    task.deleteOne({ _id: req.body.taskId }, function (err) {});
})

//update label of image
app.post('/updatelabel',(req,res)=>{
    const task = Task
    task.updateOne({_id:req.body.taskId},{label:req.body.label},function(err,raw){
        console.log(raw)
    })
})

//update context of audio
app.post('/updatecontext',(req,res)=>{
    const task = Task
    task.updateOne({_id:req.body.taskId},{context:req.body.context},function(err,raw){
        console.log(raw)
    })
})

//register route
app.post('/register',(req,res)=>{
    const user = new User({
        username:req.body.username,
        password:req.body.password
    });
    user.save()
    .catch((err)=>console.log(err));
    res.json(('saved to db:' + user))
})

//login route
app.post('/login',(req,res)=>{
    User.findOne({username:req.body.username},(error,user)=>{
        if(user!=null){
            if(!user.password.localeCompare(req.body.password)){
                res.json('success')
            }else{
                res.json('Password is wrong!')
            }
        }else{
            res.json('Username not registered!')
        }
    })
});

//upload route
app.post('/upload',(req,res)=>{
    if(req.body.type === 'choice'){
        const task = new Task({
            type:req.body.type,
            title:req.body.title,
            description:req.body.description,
            date:req.body.date,
            task:req.body.choicetask,
            options:req.body.options,
            masterWorkers:req.body.masterWorkers,
            reward:req.body.reward,
            workerNumber:req.body.workerNumber
        });
        task.save()
        .catch((err)=>console.log(err));
        res.json(('saved to db:' + task))
    }else if(req.body.type === 'decision'){
        const task = new Task({
            type:req.body.type,
            title:req.body.title,
            description:req.body.description,
            date:req.body.date,
            task:req.body.decisiontask,
            masterWorkers:req.body.masterWorkers,
            reward:req.body.reward,
            workerNumber:req.body.workerNumber
        })
        task.save()
        .catch((err)=>console.log(err));
        res.json(('saved to db:' + task))
    }else if(req.body.type === 'sentence'){
        const task = new Task({
            type:req.body.type,
            title:req.body.title,
            description:req.body.description,
            date:req.body.date,
            task:req.body.sentencetask,
            masterWorkers:req.body.masterWorkers,
            reward:req.body.reward,
            workerNumber:req.body.workerNumber
        })
        task.save()
        .catch((err)=>console.log(err));
        res.json(('saved to db:' + task))
    }else if(req.body.type === 'image'){
        //Get base 64 from post
        let imgData = req.body.imageFile
        if(imgData){
            //filter data:URL
            let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
            let dataBuffer = new Buffer.from(base64Data,'base64')
            //Add time to file name to avoid repetion
            let saveUrl = "./client/src/images/"+(new Date()).getTime()+".png";
            fs.writeFile(saveUrl,dataBuffer,function(err){
                if(err){
                    res.send(err);
                }else{
                    console.log('Uploading success')
                }
            })
            const task = new Task({
                type:req.body.type,
                title:req.body.title,
                description:req.body.description,
                date:req.body.date,
                imageUrl:saveUrl,
                label:'',
                masterWorkers:req.body.masterWorkers,
                reward:req.body.reward,
                workerNumber:req.body.workerNumber
            })
            task.save()
            .catch((err)=>console.log(err));
            res.json(('saved to db:' + task))
        } 
    }else{
        //Get base 64 from post
        let audioData = req.body.audio
        if(audioData){
            let base64Data = audioData.replace('data:audio/mpeg;base64,', "");
            let dataBuffer = new Buffer.from(base64Data,'base64')
            //Add time to file name to avoid repetion
            let saveUrl = "./client/src/audios/"+(new Date()).getTime()+".mp3";
            fs.writeFile(saveUrl,dataBuffer,function(err){
                if(err){
                    res.send(err);
                }else{
                    console.log('Uploading success')
                }
            })
            const task = new Task({
                type:req.body.type,
                title:req.body.title,
                description:req.body.description,
                date:req.body.date,
                audioUrl:saveUrl,
                context:'',
                masterWorkers:req.body.masterWorkers,
                reward:req.body.reward,
                workerNumber:req.body.workerNumber
            })
            task.save()
            .catch((err)=>console.log(err));
            res.json(('saved to db:' + task))
        }
    }
})

let port = process.env.PORT;
if(port == null || port == ''){
    port = 5000
}

app.listen(port, (req,res)=>{
    console.log('Server is running successfully on ' + port +'!')
})