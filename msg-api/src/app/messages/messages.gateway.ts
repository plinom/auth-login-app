import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Types } from 'mongoose';
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
    data: { firebaseId: string; roomId: Types.ObjectId; text: string },
  ) {
    try {
      const { firebaseId, roomId, text } = data;
      const user = await this.usersService.findByFirebaseId(firebaseId);
      if (!user) throw new Error('User not found');

      const message = await this.messagesService.createMessage(
        user.firebaseId,
        roomId,
        text,
      );
      await this.usersService.updateMessages(firebaseId, message._id);

      const room = await this.roomsService.addNewMessage(roomId, message._id);

      this.server.to(room._id.toString()).emit('message', message);
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('add-room')
  async addRoom(client: Socket, data: { firebaseId: string; name: string }) {
    try {
      const { firebaseId, name } = data;
      await this.usersService.findByFirebaseId(firebaseId);

      await this.roomsService.createRoom(data.firebaseId, {
        name,
      });

      const rooms = await this.roomsService.getAll();

      this.server.emit('rooms-list', rooms);
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('enter-chat-room')
  async enterChatRoom(
    client: Socket,
    data: { firebaseId: string; roomId: Types.ObjectId },
  ) {
    try {
      const { firebaseId, roomId } = data;
      const user = await this.usersService.findByFirebaseId(firebaseId);
      if (!user) throw new Error('User not found');

      await this.usersService.updateClientId(firebaseId, client.id);

      const roomIdString = roomId.toString();

      client.join(roomIdString);

      const messages = await this.messagesService.getAllByRoomId(roomId);

      client.emit('existing-messages', messages);

      client
        .to(roomIdString)
        .emit('users-changed', { event: 'joined', user: user.firebaseId });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('fetch-rooms')
  async fetchRooms(client: Socket) {
    try {
      const rooms = await this.roomsService.getAll();
      client.emit('rooms-list', rooms);
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const user = await this.usersService.findByClientId(client.id);

      if (user) {
        this.server.emit('users-changed', {
          event: 'left',
          user: user.firebaseId,
        });
      }
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('leave-chat-room')
  async leaveChatRoom(
    client: Socket,
    data: { firebaseId: string; roomId: Types.ObjectId },
  ) {
    try {
      const user = await this.usersService.findByFirebaseId(data.firebaseId);

      const roomIdString = data.roomId.toString();

      client
        .to(roomIdString)
        .emit('users-changed', { event: 'left', user: user.firebaseId });

      client.leave(roomIdString);
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }
}
