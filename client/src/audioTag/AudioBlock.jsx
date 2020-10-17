import React from 'react'
import AudioItem from './AudioItem'

function ImageBlock(props){
    return (
        <div className='audio-block-back'>
            {props.audioArray.map((audio,i)=>
                <AudioItem
                    change={props.changeContext}
                    key={audio.key}
                    audio={audio}/>
            )}
        </div>
    )
}

export default ImageBlock