export interface Stand {
  id: number;
  type: "faculty" | "student_organization" | "company" | "other";
  name: string;
  description: string;
  location: string;
  imageUrl: string;
}
