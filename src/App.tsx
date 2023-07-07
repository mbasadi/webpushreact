import React, { useEffect } from 'react';
import './App.css';
import NotificationAPI from './bagher/index';
// import { PopupPosition } from './bagher/interfaces';
function App() {
  const notificationspi=new NotificationAPI({
    clientId: '24nojpnrsdc53fkslha0roov05',
    userId: 'sahand'
  });
  const onSubscribe=()=>{
    notificationspi.askForWebPushPermission()
  }
  const userId='1';

  useEffect(() => {

 

 
  }, [userId]);
  return (
    <div className="App">
<button onClick={()=>{onSubscribe()}}>Subscribe</button>
    </div>
  );
}

export default App;
