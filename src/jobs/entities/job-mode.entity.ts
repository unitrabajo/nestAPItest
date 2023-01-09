import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('w_mode')
export class JobMode {

    @PrimaryGeneratedColumn('increment')
    modeid: number

    @Column({type: 'text'})
    name: string

    @Column({type: 'text'})
    description: string

    @Column({type: 'bool'})
    online: boolean


}