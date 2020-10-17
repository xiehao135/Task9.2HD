import React from 'react'
import Header from './workerTask/Header'
import AudioBlock from './audioTag/AudioBlock'

class ConvertAudio extends React.Component{
    constructor(props){
        super(props)
        this.state={
            audioArray:[]
        }
    }

    componentDidMount=()=>{
        let t = this
        fetch('http://localhost:5000/worker',{method:'GET'}).then(
            function (res){
                console.log(res)
                res.json().then(function(data){
                    data = data.filter(function(item){
                        return item.type === 'audio'
                    })
                    for(let i=0;i<data.length;i++){
                        data[i]['key'] = i
                    }
                    console.log(data)
                    t.setState({
                        audioArray:data
                    })
                })
            }
        )
    }

    changeContext=(e1,e2)=>{
        fetch('http://localhost:5000/updatecontext',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                taskId:e1,
                context:e2
            })
        })
        .then(response=>response.json())
        .then(data => console.log(data))
        .catch(err => {console.log('Errors:'+err)})
    }

    render(){
        return(
            <div>
                <Header title='Audio Task'/>
                <AudioBlock
                    audioArray={this.state.audioArray}
                    changeContext={this.changeContext}/>
            </div>
        )
    }
}

export default ConvertAudio