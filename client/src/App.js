import React from 'react';
import './App.css';
import Login from './Login';
import Task from './Task'
import WorkerPage from './WorkerPage'
import LabelImage from './LabelImage'
import ConvertAudio from './ConvertAudio'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import history from './history/History'
import 'semantic-ui-react'
import './taskPage/TaskHeader.css'
import './taskPage/SelectPart.css'
import './taskPage/TaskInput.css'
import './taskPage/TaskSelect.css'
import './taskPage/TaskOption.css'
import './taskPage/TextAreaInput.css'
import './taskPage/RequirementInput.css'
import './taskPage/TaskButton.css'
import './taskPage/PicturesWall.css'
import './workerTask/Header.css'
import './workerTask/TaskCard.css'
import './workerTask/TaskCardList.css'
import './workerTask/FilterInput.css'
import './imageTag/ImageBlock.css'
import './imageTag/Block.css'
import './taskPage/TaskAudio.css'
import './audioTag/AudioBlock.css'
import './audioTag/AudioItem.css'

function App() {
  return (
    <div  history={history} className="App">
      <Router>
          <Route exact path='/' component={Login}/>
          <Route exact path='/LabelImage' component={LabelImage}/>
          <Route exact path='/Task' component={Task}/>
          <Route exact path='/Worker' component={WorkerPage}/>
          <Route exact path='/ConvertAudio' component={ConvertAudio}/>
      </Router>
    </div>
  );
}

export default App;
