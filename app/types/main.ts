export type User={
  id:number,
  name:string|null,
  organisation:string | null,
  role:string | null,
  department:string| null
}
export type OrganisationSchema = {
  name: string;
  designation: string;
  dept: string;
  sections: number;
  teachers: number;
  students: number;
  depts_list: string[];
};
export type Room={
  name: string,
  organisation: string|null,
  department:string|null,
  lab:boolean|null,
  timetable:string|null
}

export type Teacher={
  name: string
  initials: string|null
  email: string|null
  department:string|null
  alternateDepartments:string|null
  timetable: string|null
  labtable: string|null
  organisation: string|null
}

export interface Course {
  name: string;
  code: string;
  department: string|null;
  organisation: string|null;
  semester: number|null;
}

export interface Lab {
  name: string;
  department: string | null;
  organisation: string | null;
  semester: number | null;
  batches: string | null;
  teachers: string | null;
  rooms: string | null;
  timetable: string | null;
}

export interface RoomDetails {
  name: string;
  dept: string;
  lab: number;
  timetable: (string | null)[][];
}

export interface TeacherDetails {
  name: string;
  initials: string;
  email: string;
  dept: string;
  timetable: (string | null)[][];
}

export interface SubjectDetails {
  name: string;
  code: string;
  credits: number;
  specialRooms: string[];
  semester: number;
  dept: string;
}
