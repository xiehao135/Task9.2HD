import React from 'react'
import { Radio } from 'semantic-ui-react'

const SelectPart = (props)=>{

    return(<div className='select-part-backgroud'>

            <p className='select-part-title'>Select Task Type: </p>

            <Radio
            className='select-part-items'
            label='Choice Task'
            name='radioGroup'
            value='choice'
            checked={props.value === 'choice'}
            onChange={props.onChange}
            />

            <Radio
            className='select-part-items'
            label='Decision-Making Task'
            name='radioGroup'
            value='decision'
            checked={props.value === 'decision'}
            onChange={props.onChange}
            />

            <Radio
            className='select-part-items'
            label='Sentence-level Task'
            name='radioGroup'
            value='sentence'
            checked={props.value === 'sentence'}
            onChange={props.onChange}
            />

            <Radio
            className='select-part-items'
            label='Image-processing Task'
            name='radioGroup'
            value='image'
            checked={props.value === 'image'}
            onChange={props.onChange}
            />

            <Radio
            className='select-part-items'
            label='Audio-processing Task'
            name='radioGroup'
            value='audio'
            checked={props.value === 'audio'}
            onChange={props.onChange}
            />

        </div>
    )
}

export default SelectPart