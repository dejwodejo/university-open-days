export default interface Lecture {
  id: number;
  type: "interactive" | "traditional";
  description: string;
  title: string;
  start: Date;
  end: Date;
  authors: string;
  roomId: number;
  room: { number: string; id: number; floor: number };
}
