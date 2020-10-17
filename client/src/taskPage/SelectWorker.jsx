import React from 'react'
import { Radio } from 'semantic-ui-react'

const SelectWorker = (props)=>{

    return(<div className='select-part-backgroud'>

            <p className='select-part-title'>Require Master Workers: </p>

            <Radio
            className='select-part-items'
            label='Yes'
            name={props.name}
            value='yes'
            checked={props.value === 'yes'}
            onChange={props.onChange}
            />

            <Radio
            className='select-part-items'
            label='No'
            name={props.name}
            value='no'
            checked={props.value === 'no'}
            onChange={props.onChange}
            />

        </div>
    )
}

export default SelectWorker