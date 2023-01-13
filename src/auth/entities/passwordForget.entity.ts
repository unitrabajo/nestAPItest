
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'g_passwordForget' })
export class PasswordForget {

    @PrimaryGeneratedColumn('increment')
    idForget?: number;

    @Column('text')
    url: string

    @Column('int')
    userid: number

    @Column('bool')
    online: boolean
}
