import { OnConnect, SocketController, ConnectedSocket, OnDisconnect, MessageBody, OnMessage } from 'socket-controllers';

@SocketController()
export class MessageController {
  @OnConnect()
  public connection(@ConnectedSocket() socket: any) {
    socket.handshake.user = { id: 1 };
    console.info('client connected');
  }

  @OnDisconnect()
  public disconnect(@ConnectedSocket() socket: any) {
    console.info('client disconnected');
  }

  @OnMessage('save')
  public save(@ConnectedSocket() socket: any, @MessageBody() message: any) {
    console.info('received message:', message);
    console.info('setting id to the message and sending it back to the client');
    message.id = 1;
    socket.emit('message', { type: 'message_saved', message });
  }
}
