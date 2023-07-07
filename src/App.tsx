import React from 'react';
import './App.css';

function App() {
  const onSubscribe=()=>{
    console.log('subscribe')
  }
  return (
    <div className="App">
<button onClick={()=>{onSubscribe()}}>Subscribe</button>
    </div>
  );
}

export default App;
