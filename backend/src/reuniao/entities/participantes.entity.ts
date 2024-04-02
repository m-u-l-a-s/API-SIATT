import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReuniaoEntity } from "./reuniao.entity";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

@Entity({name : 'Participantes'})
export class ParticipantesEntity {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    nome : string

    @Column()
    email : string

    @ManyToOne(() => ReuniaoEntity, (reuniao) => reuniao.participantes)
    @JoinColumn({name : 'reuniao_id'})
    reuniaoId : ReuniaoEntity
}