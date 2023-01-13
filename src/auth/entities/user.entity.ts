// import { Product } from "../../products/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'g_users' })
export class User {


    @PrimaryGeneratedColumn('increment')
    userid?: string;

    @Column('text')
    name: string

    @Column('text')
    lastname: string

    @Column('text')
    email: string

    @Column('text')
    password: string

    @Column('text')
    secret: string

    @Column('text')
    pass: string

    @Column('bool')
    isGoogle: boolean

    @Column('text')
    imagesperfil: string


    // @Column('int', {
    //     select: false
    // })

    // @BeforeInsert()
    // checkFieldsBeforeInsert() {
    //     this.userName = this.userName.trim().toLowerCase();
    // }

    // @BeforeUpdate()
    // checkFieldsBeforeUpdate() {
    //     this.userName = this.userName.trim().toLowerCase();
    // }

}
