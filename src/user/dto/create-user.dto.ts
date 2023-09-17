import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    name?: string;
    email?: string;
    photo?: string;
    location?:string;
    @IsNotEmpty({message:"google id should not be empty"})
    googleId:string;
}
