import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { JobMode } from "./job-mode.entity"
import { JobPaymode } from "./job-paymode.entity"
import { JobRequirement } from "./job-requirement.entity"


@Entity('w_works')
export class Job {

    @PrimaryGeneratedColumn('increment')
    workid: number

    @Column({type: 'int'})
    productid: number

    @Column({type: 'int'})
    userid: number
    
    @Column({type: 'text'})
    benefit: string

    @Column({type: 'int'})
    requirementid: number

    @Column({type: 'text'})
    contract: string

    @Column({type: 'text'})
    worktime: string

    @Column({type: 'date'})
    contractdate: Date

    @Column({type: 'date'})
    limitdate: Date

    @Column({type: 'datetime'})
    createdate: Date


    @Column({type: 'int'})
    vacancies: number

    
    @Column({type: 'int'})
    modeid: number

    @Column({type: 'bool'})
    urgent: boolean

    @Column({type: 'bool'})
    flash: boolean 

    @Column({type: 'text'})
    dir: string

    @Column({type: 'int'})
    paymodeid: number

    

}
