import React from 'react'
import Header from './workerTask/Header'
import ImageBlock from './imageTag/ImageBlock'

class LabelImage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            imageArray:[]
        }
    }

    componentDidMount=()=>{
        let t = this
        fetch('http://localhost:5000/worker',{method:'GET'}).then(
            function (res){
                console.log(res)
                res.json().then(function(data){
                    data = data.filter(function(item){
                        return item.type === 'image'
                    })
                    for(let i=0;i<data.length;i++){
                        data[i]['key'] = i
                    }
                    console.log(data)
                    t.setState({
                        imageArray:data
                    })
                })
            }
        )
    }

    changeLabel=(e1,e2)=>{
        fetch('http://localhost:5000/updatelabel',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                taskId:e1,
                label:e2
            })
        })
        .then(response=>response.json())
        .then(data => console.log(data))
        .catch(err => {console.log('Errors:'+err)})
    }

    render(){
        return(
            <div className='header-div'>
                <Header
                    title='Image Task'/>
                <ImageBlock
                    imagearray={this.state.imageArray}
                    changeLabel={this.changeLabel}/>
            </div>
        )
    }
}

export default LabelImage