import React,{useState} from 'react'

const AudioItem  = (props)=>{
    const [context,setContext] = useState(props.audio.context)

    const handleInput = (event)=>{
        const {value} = event.target
        setContext(value)
    }

    var link = '1602863541140.mp3'
    if(props.audio.audioUrl){
        link = props.audio.audioUrl.slice(20).toString()
    }

    return(
        <div className='item-back'>
            <audio id='audio' controls="controls" src={require('../audios/'+link)} className='item-audio-player'/>
            <div>
                <div className='block-label'>Text:</div>
                <textarea onChange={handleInput} rows="3" cols="30" placeholder={context}/>
            </div>
            <div>
                <button onClick={()=>props.change(props.audio._id,context)}>Confirm</button>
            </div>
        </div>
    )
}

export default AudioItem