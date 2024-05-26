
// - User

export interface LoginUser {
    email: string;
    password: string;
}

export interface RegisterUser {
    email: string;
    emailConfirm:string;
    password: string;
    passwordConfirm: string;
}

export interface UpdateUser {
    email: string;
    password: string;
    passwordOld:string;
    passwordConfirm: string;
    type: string;
    language: string;
}

export interface User {
    id: number;
    email: string;
    token: string;
    type: string;
    createdDate:Date;
    language: string;
}

export interface DecodedUserFromToken extends User {
    aud: string
    exp: EpochTimeStamp
    iat: EpochTimeStamp
    iss: string
    nbf: EpochTimeStamp
}

// - Survey

export interface Survey{
    id:number,
    config:string,
    name:string,
    tags:string,
    createdDate:Date,
    lastUpdateDate:Date,
    link:string,
    visibility:string,
    active:boolean,
    entry:string
}

export interface CreateSurvey{
    name:string,
    entry:string,
    language:string
}

export interface UpdateSurvey{
    name:string,
    entry:string,
}

// - Language

export interface Language{
    id:number,
    code:string,
    data:string,
}

// - Question


export interface Question{
    id:number,
    name:string,
    code:string,
    title:string,
    config:Object,
    style:Object,
    questionType:QuestionType
}

export interface CreateQuestion{
    name:string,
    type:number,
    position:number
}

export interface UpdateQuestion{
    id:number,
    name:string,
    type:number,
    position:number
}

export interface QuestionType{
    id:number,
    name:string,
    config:string
}

export interface Reco extends QuestionType{
    title:string,
}

// - Answer

export interface Answer{
    id:number,
    body:object,
    valid:boolean,
    language:string,
    token:string,
    ended:boolean,
    position:number,
    code:string,
    createdDate:Date,
    lastUpdateDate:Date
}

export interface CreateAnswer{
    position:number,
    ended:boolean,
    body:string,
    code?:string
}
export interface UpdateAnswer{
    code:string,
    position:number,
    ended:boolean,
    body:string,
}

export interface AnswerBody{
    id:number,
    name:string,
    type:string,
    value:string,
}

export interface AnswerText{
    id:number,
    name:string,
    type:string,
    value:string,
    createdDate:string,
}

// - Notification

export interface Notification{
    id:string
    type:string
    message:string
}

//- Errors

export interface Error{
    name:string
    message:string
    type:string
}