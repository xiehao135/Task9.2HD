import React from 'react'

const PicturWall = (props)=>{

  return(
    <div className='wall-backgroud'>
      <input
        className='select-button'
        onChange={props.onChange}
        type="file"
        name="file"
        accept="image/*"
        multiple='multiple'
      />
      <div className='selected-image-back'>
          <img className='selected-image' src={props.fileList} alt=''></img>
      </div>
    </div>
  )
}

export default PicturWall