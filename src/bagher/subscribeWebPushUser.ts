// subscribeWebPushUser.ts
import axios from "axios";
import { PushSubscription } from './interfaces';
// import { Client } from './utils/client';

const defaultRestAPIUrl = 'https://api.notificationapi.com';
export const subscribeWebPushUser = (
  applicationServerKey: string,
  clientId: string,
  userId: string,
  hashUserId?: string
): void => {
  if ('serviceWorker' in navigator) {
    // window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(async (registration) => {
          Notification.requestPermission().then(async (permission) => {
            if (permission === 'granted') {
              await registration.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey
                })
                .then(async (res) => {
                  console.log({
                    url: `${defaultRestAPIUrl}/${clientId}/users/${userId}`,
                    method: 'post',
                    data: {
                      webPushTokens: [
                        {
                          sub: {
                            endpoint: res.toJSON().endpoint as string,
                            keys: res.toJSON().keys as PushSubscription['keys']
                          }
                        }
                      ]
                    },
                    headers: {
                      'content-type': 'application/json',
                      Authorization: 'Basic ' + btoa(`${clientId}:${userId}:${hashUserId}`)
                    }
                  })
                  try{
                    await fetch(`${defaultRestAPIUrl}/${clientId}/users/${userId}`, {
                      body: JSON.stringify({
                        webPushTokens: [
                          {
                            sub: {
                              endpoint: res.toJSON().endpoint as string,
                              keys: res.toJSON().keys as PushSubscription['keys']
                            }
                          }
                        ]
                      }),
                      headers:  {
                        'content-type': 'application/json',
                        Authorization: 'Basic ' + btoa(`${clientId}:${userId}:${hashUserId}`)
                      },
                      method: 'POST'
                    });}catch(e){
                      console.log(e)
                    }
                  await axios(    {
                    url: `${defaultRestAPIUrl}/${clientId}/users/${userId}`,
                    method: 'post',
                    data: {
                      webPushTokens: [
                        {
                          sub: {
                            endpoint: res.toJSON().endpoint as string,
                            keys: res.toJSON().keys as PushSubscription['keys']
                          }
                        }
                      ]
                    },
                    headers: {
                      'content-type': 'application/json',
                      Authorization: 'Basic ' + btoa(`${clientId}:${userId}:${hashUserId}`)
                    }
                  })
                });
            }
          });
        }).catch((e)=>{console.log(e)});
    // });
  }
};
