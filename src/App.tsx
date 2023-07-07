import React, { useEffect } from 'react';
import './App.css';
import NotificationAPI from './bagher/index';
// import { PopupPosition } from './bagher/interfaces';
function App() {
  const userId='3';
  const notificationspi=new NotificationAPI({
    clientId: '74763kfj366vdlde4jg20fibj5',
    userId
  });
  const onSubscribe=()=>{
    notificationspi.askForWebPushPermission()
  }


  useEffect(() => {

 

 
  }, [userId]);
  return (
    <div className="App">
<button onClick={()=>{onSubscribe()}}>Subscribe</button>
    </div>
  );
}

export default App;
