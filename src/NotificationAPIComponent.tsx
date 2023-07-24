import NotificationAPI from './bagher/index';
import { PopupPosition } from './bagher/interfaces';
import React, { memo, useEffect, useRef } from 'react';

const NotificationAPIComponent = memo((props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const notificationapi = new NotificationAPI({
      clientId: '74763kfj366vdlde4jg20fibj5',
      userId: 'bagher1'
    });
    notificationapi.showInApp({
      root: 'container',
      popupPosition: PopupPosition.BottomRight
    });

    // Store a reference to the container DOM element.
    const container = containerRef.current;
    // This effect can run multiple times due to the `userId` changing
    // or Hot Module Replacement (HMR). Ensure the container is cleared
    // as `showInApp` will append to the container instead of overwriting it.
    return () => {
      if (container) container.innerHTML = '';
    };
  });

  return <div id="container" ref={containerRef}></div>;
});

export default NotificationAPIComponent;
