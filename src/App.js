import React from 'react';
import {HashRouter} from 'react-router-dom'
import routes from './routes'
import logo from './assets/code_logo_300w.png'


function App() {
  return (
    <HashRouter>
      <div className="App">
      <header>
        <img src={logo} alt='code logo'/>
      </header>
        {routes}
      </div>
    </HashRouter>

  );
}

export default App;
