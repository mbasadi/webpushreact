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
      'Access-Control-Allow-Origin': '*',
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
    await fetch(this.url, {
      body: JSON.stringify(body),
      headers: this.getHeaders(),
      method: 'POST'
    });
  }
}
