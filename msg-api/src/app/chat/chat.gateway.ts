import { InjectModel } from '@nestjs/mongoose';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { Chat } from 'src/common/schemas/chat.schema';

interface Message {
  message: string;
  room: string;
  sender: string;
}

@WebSocketGateway({
  cors: {
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: ['http://localhost:3000'],
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(@InjectModel('Chat') private chatModel: Model<Chat>) {}

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const { room } = data;

    client.join(room);

    this.server.to(room).emit('message', {
      message: `${client.id} joined ${room}`,
      sender: 'System',
    });
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const { room } = data;

    client.leave(room);

    this.server.to(room).emit('message', {
      message: `${client.id} left ${room}`,
      sender: 'System',
    });
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: Message): Promise<void> {
    const { message, room, sender } = data;

    const newMessage = new this.chatModel({ message, room, sender });

    await newMessage.save();

    this.server.to(room).emit('message', newMessage);
  }
}
