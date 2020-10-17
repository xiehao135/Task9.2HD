import React from 'react'

const RequirementInput = (props)=>{
    return <div className='requirement-input-back'>
        <p className='requirement-input-title'>{props.title}</p>
        <input className='requirement-input' name={props.name} type={props.type} onChange={props.onChange} value={props.value}/>
    </div>
}

export default RequirementInput