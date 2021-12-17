import React from 'react';
import {HashRouter} from 'react-router-dom'
import routes from './routes'
import Header from './Components/Header';



function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header/>
        {routes}
        <footer></footer>
      </div>
    </HashRouter>

  );
}

export default App;