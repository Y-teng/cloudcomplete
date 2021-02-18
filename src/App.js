import './App.css';

// 引入路由的相关组件
import {Switch,Route,Redirect} from "react-router-dom"


// 引入一级路由
import Index from './pages/index'
import List from './pages/list'
import Play from './pages/play'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/index" component={Index}></Route>
        <Route path="/list" component={List}></Route>
        <Route path="/play" component={Play}></Route>
        {/* 路由重定向 */}
        <Redirect to='/index'></Redirect>
      </Switch>
    </div>
  );
}

export default App;
