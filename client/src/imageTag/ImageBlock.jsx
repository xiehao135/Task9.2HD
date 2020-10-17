import React from 'react'
import Block from './Block'

function ImageBlock(props){
    return (
        <div className='image-block-back'>
            {props.imagearray.map((image,i)=>
                <Block
                    change={props.changeLabel}
                    key={image.key}
                    image={image}/>
            )}
        </div>
    )
}

export default ImageBlock