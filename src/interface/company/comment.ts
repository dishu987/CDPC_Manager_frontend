export interface Comment {
  id: number;
  company: number;
  user: { id: number; name: string };
  text: string;
  reply_to: number;
  created_at: string;
  replies?: Comment[];
}
