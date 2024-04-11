import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { ReuniaoEntity } from "src/reuniao/entities/reuniao.entity";

@Entity({name:"sala_virtual"})
export class SalaVirtualEntity 
{
    @PrimaryGeneratedColumn("uuid")
    id : string 

    @Column()
    identificacao : string

    @Column()
    login : string

    @Column()
    senha : string

    @Column()
    permissao : number

    @OneToMany(() => ReuniaoEntity, reuniao => reuniao.salaVirtual)
    reunioes : ReuniaoEntity[]
}
