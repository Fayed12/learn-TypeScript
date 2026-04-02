// ===========================================================================

// project 10 ====> real-time chat system

// ===========================================================================

type UserId = string & { readonly __brand: "UserId" }
type RoomId = string & { readonly __brand: "RoomId" }
type MessageId = string & { readonly __brand: "MessageId" }

enum UserRole {
  Admin = "Admin",
  Moderator = "Moderator",
  Member = "Member",
  Guest = "Guest"
}

type MessageStatus = "sending" | "sent" | "delivered" | "read" | "failed"

type MessageHistory = [MessageId, UserId, string, Date]

type User = {
  readonly id: UserId
  name: string
  role: UserRole
  isOnline: boolean
}

type Room = {
  readonly id: RoomId
  name: string
  members: UserId[]
  createdAt: Date
}

type Message = {
  readonly id: MessageId
  readonly roomId: RoomId
  readonly authorId: UserId
  content: string
  status: MessageStatus
  sentAt: Date
}

type ChatEvent =
  | { kind: "user_joined"; roomId: RoomId; userId: UserId }
  | { kind: "user_left"; roomId: RoomId; userId: UserId }
  | { kind: "message_sent"; message: Message; }
  | { kind: "message_deleted"; message: Message; }
  | { kind: "room_created"; roomId: RoomId; userId: UserId }

function handleEvent(event: ChatEvent): void {
  switch (event.kind) {
    case "user_joined":
      console.log(`user ${event.userId} joined room ${event.roomId}`)
      return

    case "user_left":
      console.log(`user ${event.userId} left from room ${event.roomId}`)
      return

    case "message_deleted":
      console.log(`message deleted by ${event.message.authorId} in ${event.message.roomId}`)
      return

    case "message_sent":
      console.log(`message_sent from ${event.message.authorId} in ${event.message.roomId}`)
      return

    case "room_created":
      console.log(`room ${event.roomId} created by ${event.userId}`)
      return

    default:
      const _exhaustive: never = event
      return _exhaustive
  }
}

function createNewUser(user: User): User {
  return { id: user.id, name: user.name, role: user.role, isOnline: user.isOnline }
}

function createNewRoom(room: Room): Room {
  return { id: room.id, name: room.name, members: room.members, createdAt: new Date() }
}

// TODO: parse raw socket data with type assertion
function parseSocketEvent(raw: unknown): ChatEvent {
  return raw as ChatEvent
}

// check the code

const userId = "u_001" as UserId
const roomId = "r_001" as RoomId
const msgId = "m_001" as MessageId


const history: MessageHistory = [msgId, userId, "Hello!", new Date()]

const event: ChatEvent = { kind: "message_sent", message: { id: msgId, roomId, authorId: userId, content: "Hello!", status: "sent", sentAt: new Date() } }

handleEvent(event)
// logs: "message_sent from u_001 in r_001"

handleEvent({ kind: "user_joined", roomId, userId })
// logs: "user u_001 joined room r_001"