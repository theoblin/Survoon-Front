export interface LoginUser {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    token: string;
    type: string;
    language: string;
}

export interface DecodedUserFromToken extends User {
    aud: string
    exp: EpochTimeStamp
    iat: EpochTimeStamp
    iss: string
    nbf: EpochTimeStamp
}