export type Message = {
  sender: string,
  content: string,
  id: number | string
};

type User = {
  handle: string,
  status: "ONLINE" | "OFFLINE",
  avatar: string
};
