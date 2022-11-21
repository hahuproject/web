import { User, UserFromJSON, UserToJSON } from "./User";

export type Message = {
  ID?: string;
  To: User;
  From?: User;
  Content: string;
  Date?: Date;
  Read?: boolean;
};

export const MessageFromJSON = (message: JSON): Message => {
  return {
    ID: message["messageId"],
    To: UserFromJSON(message["to"]),
    From: UserFromJSON(message["from"]),
    Content: message["content"],
    Date: message["createdAt"],
    Read: !!message["read"],
  };
};

export const MessageToJSON = (message: Message): string => {
  return JSON.stringify({
    messageId: message.ID,
    to: !!message.To ? UserToJSON(message.To) : {},
    from: !!message.From ? UserToJSON(message.From) : {},
    content: message.Content,
    createdAt: message.Date,
    read: message.Read,
  });
};

export type MessagesByUser = {
  user: User;
  messages: Message[];
};
