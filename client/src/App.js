import React from 'react';
import DMs from './components/DMs';
import Chat from './components/Chat';
import Icons from './components/Icons';
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
