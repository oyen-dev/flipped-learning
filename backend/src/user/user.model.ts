import { ObjectId } from "mongodb";

export class User {
    public fullname: string;
    public email: string;
    public gender: number
    public dateOfBirth: string;
    public placeOfBirth: string;
    public address: string;
    public password: string;
    id: ObjectId
}