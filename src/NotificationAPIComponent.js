
import React, { memo, useEffect, useRef } from 'react';

const NotificationAPIComponent = memo((props) => {
  const containerRef = useRef();
  const onSubscribe=()=>{
    console.log('subscribe')
  }


  return <button onClick={()=>{
    onSubscribe()
  }}></button>
});

export default NotificationAPIComponent;
