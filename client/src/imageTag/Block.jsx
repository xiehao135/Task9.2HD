import React,{useState} from 'react'

const Block = (props)=>{
    const [inputValue,setInputValue]=useState(props.image.label)

    const handleInputValue = (event)=>{
        const {value} = event.target
        setInputValue(value)
    }

    var link = '1602518620448.png'
    if(props.image.imageUrl){
        link = props.image.imageUrl.slice(20).toString()
    }

    return(
        <div className='block-back'>
            <img src={require('../images/'+link)} alt='' className='block-image'/>
            <div>
                <div className='block-label'>Label:</div>
                <input type='text' onChange={handleInputValue} placeholder={inputValue}/>
            </div>
            <div>
                <button onClick={()=>props.change(props.image._id,inputValue)}>Confirm</button>
            </div>
        </div>
    )
}

export default Block