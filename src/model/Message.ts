import { User } from './User';

export interface Message{
  room: string,
  Receiver: User,
  Sender: User,
  content: string,
  createdAt: Date,
}