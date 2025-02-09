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
import { User } from 'src/common/schemas/user.schema';

interface Message {
  message: string;
  receiver?: string;
  room?: string;
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

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const { room } = data;

    client.join(room);

    this.server.to(room).emit('message', {
      message: `${client.id} joined ${room}`,
      sender: 'System',
    });
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const { room } = data;

    client.leave(room);

    this.server.to(room).emit('message', {
      message: `${client.id} left ${room}`,
      sender: 'System',
    });
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: Message): Promise<void> {
    const { message, receiver, room, sender } = data;
  }
}
