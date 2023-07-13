export type ClientOptions = {
  authorization?: string;
  url?: string;
  clientKey?: string;
  userId?: string;
};

export class Client {
  private authorization?: string;
  private url: string;

  constructor({ authorization, url }: ClientOptions) {
    this.authorization = authorization;
    this.url = `${url}`;
  }

  private getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: this.authorization as string
    };

    return headers;
  }

  async post<T>(body: T): Promise<void> {
    console.log(this.url, {
      body: JSON.stringify(body),
      headers: this.getHeaders(),
      method: 'POST'
    })
    console.log('body',JSON.stringify(body))
    console.log('headers',this.getHeaders())
    try{
    await fetch(this.url, {
      body: JSON.stringify(body),
      headers: this.getHeaders(),
      method: 'POST'
    });}catch(e){
      console.log(e)
    }
  }
}
