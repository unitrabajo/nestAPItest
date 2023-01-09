import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('w_paymode')
export class JobPaymode {

    @PrimaryGeneratedColumn('increment')
    paymodeid: number

    @Column({type: 'text'})
    name: string

    @Column({type: 'text'})
    description: string

    @Column({type: 'int'})
    dias: number

    @Column({type: 'bool'})
    online: boolean


}