export type OrganisationSchema = {
  name: string;
  designation: string;
  dept: string;
  sections: number;
  teachers: number;
  students: number;
  depts_list: string[];
};

export interface Room {
  name: string;
  department: string;
  labornot: boolean;
}

export interface Teacher {
  name: string;
  initials: string;
  email: string;
  dept: string;
}
export interface Subject {
  name: string;
  code: string;
  semester: number;
  dept: string;
}

export interface Lab {
  name: string;
  sem: number;
  batches: string[];
  dept: string;
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
