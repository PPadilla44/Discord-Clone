import React from 'react';
import DMs from './views/DMs';
import Chat from './views/Chat';
import Icons from './views/Icons';
import "./App.css"

function App() {
  return (
    <div className="App">
      <Icons/>
      <DMs/>
      <Chat/>
    </div>
  );
}

export default App;
