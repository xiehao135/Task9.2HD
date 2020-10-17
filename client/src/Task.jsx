import React,{useState} from 'react'
import TaskHeader from './taskPage/TaskHeader'
import SelectPart from './taskPage/SelectPart'
import TaskInput from './taskPage/TaskInput'
import TaskSelect from './taskPage/TaskSelect'
import TaskOption from './taskPage/TaskOption'
import TextAreaInput from './taskPage/TextAreaInput'
import SelectWorker from './taskPage/SelectWorker'
import RequirementInput from './taskPage/RequirementInput'
import TaskButton from './taskPage/TaskButton'
import PicturesWall from './taskPage/PicturesWall'
import TaskAudio from './taskPage/TaskAudio'

const Task = (props) =>{
    const [taskType,setTaskType] = useState('audio')

    const [fileList,setFileList] = useState()

    const [audiofile,setAudioFile] = useState()

    const [upAudio,setUpAudio] = useState()

    const [taskInfo,setTaskInfo] = useState({
        title:'',
        description:'',
        expiry:''
    })

    const [choiceTask,setChoiceTask] = useState({
        title:'',
        number:'1',
        content1:'',
        content2:'',
        content3:'',
        content4:'',
    })

    const [decisionTask,setDecisionTask] = useState('')

    const [sentenceTask,setSentenceTask] = useState('')

    const [workerRequirement,setWorkerRequirement] = useState({
        require:'yes',
        reward:'',
        number:''
    })

    const handleInputChange = (event)=>{
        const {name,value} = event.target
        setTaskInfo((preValue)=>{
            return{
                ...preValue,
                [name]:value
            }
        })
    }

    const handleTaskSelect = (event)=>{
        const {value} = event.target
        setTaskType(value)
    }

    const handleChoiceTask = (event)=>{
        const {name,value} = event.target
        setChoiceTask((preValue)=>{
            return{
                ...preValue,
                [name]:value
            }
        })
    }

    const handleDecisionTask = (event)=>{
        const {value} = event.target
        setDecisionTask(value)
    }

    const handleSentenceTask = (event)=>{
        const {value} = event.target
        setSentenceTask(value)
    }

    const handleWorkerRequirement = (event)=>{
        const {name,value} = event.target
        setWorkerRequirement((preValue)=>{
            return{
                ...preValue,
                [name]:value
            }
        })
    }

    const handleFileListChange = (e)=>{
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onload = function(e){
            console.log('Upload success!')
            setFileList(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleAuidoFileUpload = (e)=>{
        parseAudito2Base64(e)
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onload = function(e){
            let arrBuffer = e.target.result;
            let blob = new Blob([arrBuffer],{type:'autio/wave'})
            setAudioFile(URL.createObjectURL(blob))
        }
        reader.readAsArrayBuffer(file)
    } 

    const parseAudito2Base64 = (e)=>{
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onload = function(e){
            console.log('Audio upload success!')
            setUpAudio(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleUpload = ()=>{
        fetch('http://localhost:5000/upload',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                type:taskType,
                title:taskInfo.title,
                description:taskInfo.description,
                date:taskInfo.expiry,
                choicetask:choiceTask.title,
                decisiontask:decisionTask,
                sentencetask:sentenceTask,
                options:choiceTask.content1 + ';' + choiceTask.content2 + ';' + choiceTask.content3 + ';' +choiceTask.content4,
                masterWorkers:workerRequirement.require,
                reward:workerRequirement.reward,
                workerNumber:workerRequirement.number,
                imageFile:fileList,
                audio:upAudio
            })
        })
        .then(response=>response.json())
        .then(data => console.log(data))
        .catch(err => {console.log('Errors:'+err)})
    }

    return (<div className='header-div'>
        <TaskHeader
            title='New Requester Task'
            description='Worker Task'
        />

        <SelectPart
            value={taskType}
            onChange={handleTaskSelect}
        />

        <TaskHeader
            title='Describe your work to Workers'
            description=''
        />

        <TaskInput
            title='Title'
            name='title'
            type='text'
            placeholder='Enter task title'
            onChange={handleInputChange}
            value={taskInfo.title}
        />

        <TaskInput
            title='Description'
            name='description'
            type='text'
            placeholder='Enter task description'
            onChange={handleInputChange}
            value={taskInfo.description}
        />

        <TaskInput
            title='Expiry Date'
            name='expiry'
            type='text'
            placeholder='dd/mm/yyyy'
            onChange={handleInputChange}
            value={taskInfo.expiry}
        />

        <TaskHeader
            title='Setting up your Task'
            description=''
        />

        <div style={{display:taskType==='choice'?'block':'none'}}>
            <TaskInput
                title='Task'
                name='title'
                type='text'
                placeholder=''
                onChange={handleChoiceTask}
                value={choiceTask.title}
            />

            <TaskSelect
                title="Options' number"
                name='number'
                value={choiceTask.number}
                onChange={handleChoiceTask}
            />

            <TaskOption
                title="Options"
                number={choiceTask.number}
                content1={choiceTask.content1}
                content2={choiceTask.content2}
                content3={choiceTask.content3}
                content4={choiceTask.content4}
                type='text'
                onChange={handleChoiceTask}
            />
        </div>

        <div style={{display:taskType==='decision'?'block':'none'}}>
            <TextAreaInput
                title='Task'
                placeholder='Decision-Making Task...'
                value={decisionTask}
                onChange={handleDecisionTask}
            />
        </div>

        <div style={{display:taskType==='sentence'?'block':'none'}}>
            <TextAreaInput
                title='Task'
                placeholder='Sentence-Level Task...'
                value={sentenceTask}
                onChange={handleSentenceTask}
            />
        </div>

        <div style={{display:taskType==='image'?'block':'none'}}>
            <PicturesWall 
                onChange={handleFileListChange}
                fileList={fileList}/>
        </div>

        <div style={{display:taskType==='audio'?'block':'none'}}>
            <TaskAudio
                onChange={handleAuidoFileUpload}
                audiofile={audiofile}/>
        </div>

        <TaskHeader
            title='Worker Requirement'
            description=''
        />

        <SelectWorker
            name='require'
            value={workerRequirement.require}
            onChange={handleWorkerRequirement}
        />

        <RequirementInput
            title='Reward per response'
            name='reward'
            type='text'
            placeholder=''
            onChange={handleWorkerRequirement}
            value={workerRequirement.reward}
        />

        <RequirementInput
            title='Number of workers'
            name='number'
            type='text'
            placeholder=''
            onChange={handleWorkerRequirement}
            value={workerRequirement.number}
        />

        <TaskButton
            type ='submit'
            text='Save'
            onClick = {handleUpload}
        />
    </div>)
}

export default Task