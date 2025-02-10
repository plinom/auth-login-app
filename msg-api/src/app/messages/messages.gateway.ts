import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ObjectId } from 'mongoose';
import { Server, Socket } from 'socket.io';

import { RoomsService } from '../rooms/rooms.service';
import { UsersService } from '../users/users.service';
import { MessagesService } from './messages.service';

@WebSocketGateway({
  cors: {
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: ['http://localhost:3000'],
  },
})
export class MessagesGateway implements OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly roomsService: RoomsService,
    private readonly usersService: UsersService,
  ) {}

  @SubscribeMessage('add-message')
  async addMessage(
    client: Socket,
    data: { roomId: ObjectId; text: string; userId: string },
  ) {
    const user = await this.usersService.findUserByFirebaseid(data.userId);

    const message = await this.messagesService.createMessage(
      new Date(),
      user.id,
      data.roomId,
      data.text,
    );

    const room = await this.roomsService.addNewMessage(data.roomId, message);

    this.server.in(room._id.toString()).emit('message', message);
  }

  @SubscribeMessage('enter-chat-room')
  async enterChatRoom(
    client: Socket,
    data: { roomId: string; userId: string },
  ) {
    const user = await this.usersService.findUserByFirebaseid(data.userId);

    user.clientId = client.id;

    await this.usersService.updateClientId(user._id, user);

    client.join(data.roomId);
    client.broadcast
      .to(data.roomId)
      .emit('users-changed', { event: 'joined', user: user.id });
  }

  async handleDisconnect(client: Socket) {
    const user = await this.usersService.findUserByClientId(client.id);

    if (user) {
      this.server.emit('users-changed', {
        event: 'left',
        user: user.id,
      });
    }
  }

  @SubscribeMessage('leave-chat-room')
  async leaveChatRoom(
    client: Socket,
    data: { roomId: string; userId: string },
  ) {
    const user = await this.usersService.findUserByFirebaseid(data.userId);

    client.broadcast
      .to(data.roomId)
      .emit('users-changed', { event: 'left', user: user.id });

    client.leave(data.roomId);
  }
}
