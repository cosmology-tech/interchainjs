export interface RequestClient {
  broadcast(message: any): Promise<any>;
}
