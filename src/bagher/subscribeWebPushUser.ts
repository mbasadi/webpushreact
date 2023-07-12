// subscribeWebPushUser.ts
import { PushSubscription } from './interfaces';
import { Client } from './utils/client';

const defaultRestAPIUrl = 'https://api.notificationapi.com';
export const subscribeWebPushUser = (
  applicationServerKey: string,
  clientId: string,
  userId: string,
  hashUserId?: string
): void => {
  const client = new Client({
    authorization:
    'Bearer ' + btoa(`${clientId}:${userId}:${hashUserId}`)
    ,
    url: `${defaultRestAPIUrl}/${clientId}/users/${userId}`
  });
  if ('serviceWorker' in navigator) {
    // window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('https://swbagher.s3.us-east-1.amazonaws.com/service-worker.js?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLWVhc3QtMSJGMEQCIDDbWMUQ21VLC%2BtCfR7RuRu33UBiDtgd5o2CUP01ZCg8AiBcBzSSAZD1iop6tSfH0bK6HHaafLOoiOgSAUUrgE3zDCr2Agjc%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDgyNzYzNjU5NDk5OSIM6IItPz7%2Bh6LeQRYqKsoChMaYJVDxkkjEKOTjlZcHxpfjz0cxXKmJtO0EnUPipTyP8oIPM5sFdsePVLC5pJDwOLLQ7tXEjqMDEQ5YZhNz%2BFeHclFRt%2BgyXhYFRiXjI4gLOaYwQgdBW5ivsmYPygnC8LABcrrT3occPaC7MirWe2a36EBa8R0UMPAaTCy8dqqMpovZeaE1WyqgySg19rTu84Ug4LDOzZn%2BxhAIGZGc4Tbl2QZMna02djyl2QJOs3%2Fc0SRC1%2FVAtLfG6lFXL7JKcou69PY8RK%2FRHXdR5%2BRbftRMoZGAdRWfRGZxy6ECym%2BDG%2Bn8%2FQbTfict5te%2BnY8MEA8kgMhHjFIRGkxUZ1deEPqW50xXPgVedyzFNMZ5hql9RsnKCWjYynTk%2B7UO8hzC2ktZmphNBG5fxOjImuQu58P8j7pN5ao6Sfc2kuwKYk6ilz1LTCFyxEwMMMz2u6UGOogCP4L6haEcbj0Az95W9b4upbkH1AJvj2wBKdgegSUvjf43vJIwbEnqBWf6U88AcUw36h9hMZhpNlZUyewRBTt6VYOteU1bgRDXqfdBg5L%2BMrU4pr0XHA7uSbLwTDSMitV50iXd1SePzaCCKcSSVQwd%2BwuSwNC7ILvZMwkBkBC77Fp5FLp3zbrZdTf7SoUaz3alu2OMl5hfgAIKxm1a0u8nAa7pC3dt2KS9jeyMfQqLTszsLHWxv%2BljwHoIt11QCzmQrp6xhahHM83VR93KMJ4EJqxQII7BjL4bjrgzAlUYpjvFJpB0hKoK2dYeKDA5xu3T%2BVQLB7qJkcybgjJy7SFbASGiD11eiL1P&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230712T192049Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA4BMX4HE352WARYYC%2F20230712%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e80a38c1dc782f33cb9f226f82d123343da24dd259eb0a502637f465a28b349a')
        .then(async (registration) => {
          Notification.requestPermission().then(async (permission) => {
            if (permission === 'granted') {
              await registration.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey
                })
                .then(async (res) => {
                  await client.post(
                    JSON.stringify({
                      id: userId,
                      webPushTokens: [
                        {
                          sub: {
                            endpoint: res.toJSON().endpoint as string,
                            keys: res.toJSON().keys as PushSubscription['keys']
                          }
                        }
                      ]
                    })
                  );
                });
            }
          });
        }).catch((e)=>{console.log(e)});
    // });
  }
};
