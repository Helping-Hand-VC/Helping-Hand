
export class User {
    type?: string;
    autoid?: string;
    id?: string;
    firstname?: string;
    surname?: string;
    email?: string;
    cell?: string;
    ChildsID?: [];
    SchoolID?: string;
    Grade?: string;
}

export class school{
    Name?:string;
    id?:string;
}

export class test{
    CorrectAnswer?: string;
    PossibleAnswer?:string[];
    Question?: string;
    TotalMark?: string;  
    userGetCorrect?: boolean; 
}

export class takenTests{
    Difficulty?: string;
    Grade?: string;
    Language?: string;
    Mark?: string;
    Subject?: string;
    TestID?: string;
}




export class Student {
    id:             string;
    firstname:      string;
    surname:        string;
    email:          string;
    cell:           string;
}
export class Parent{
    id: string;
    firstname: string;
    surname: string;
    email: string;
    cell: string;
}

export class Teacher {
    id:         string;
    firstname:  string;
    surname:    string;
}
