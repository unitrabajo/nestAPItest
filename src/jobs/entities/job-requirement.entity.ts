import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('w_requirement')
export class JobRequirement {

    @PrimaryGeneratedColumn('increment')
    requirementid: number

    // TODO: Cambiar a tipo user
    @Column({type: 'int'})
    userid: number

    @Column({type: 'int'})
    expyear: number

    @Column({type: 'int'})
    minyear: number

    @Column({type: 'int'})
    maxyear: number

    @Column({type: 'text'})
    minstudy: string
    
    @Column({type: 'text'})
    language: string

    @Column({type: 'int'})
    lanlevel: number

    @Column({type: 'text'})
    knowledges: string

    @Column({type: 'int'})
    travel: number

    @Column({type: 'int'})
    chg_address: number

    @Column({type: 'int'})
    disability: number



}