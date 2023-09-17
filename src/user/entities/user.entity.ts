import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export interface ICredentials{
    auth_token:string,
    refresh_token:string
    scopes:any
}
@Entity({ schema: 'User' })
export class User{
    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    googleId:string;

    @Column()
    name?:string;

    @Column()
    email?:string;

    @Column()
    location:string

    @Column()
    photo?:string;

    @Column({default:"google"})
    provider?:string;

}
