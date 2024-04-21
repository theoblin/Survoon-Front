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

export interface Survey{
    id:number,
    config:string,
    name:string,
    tags:string,
    createdDate:Date,
    lastUpdateDate:Date,
    link:string,
    visibility:string,
    active:boolean
}

export interface CreateSurvey{
    name:string,
    language:string
}

export interface Language{
    id:number,
    code:string,
    data:string,
}

export interface Question{
    id:number,
    name:string,
    type:string
}

export interface CreateQuestion{
    name:string,
    type:string
}