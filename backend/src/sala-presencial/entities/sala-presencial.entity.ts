import { ReuniaoEntity } from "src/reuniao/entities/reuniao.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"sala_presencial"})
export class SalaPresencialEntity {

    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    identificacao : string

    @Column()
    endereco : string

    @Column()
    permissao : number

    @Column()
    ocupacaoMax : number

    @Column()
    local : string

    @OneToMany(() => ReuniaoEntity, reuniao => reuniao.salaPresencial)
    reunioes : ReuniaoEntity[]
}
