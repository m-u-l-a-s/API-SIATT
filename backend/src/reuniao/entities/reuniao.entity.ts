import { SalaPresencialEntity } from "src/sala-presencial/entities/sala-presencial.entity";
import { SalaVirtualEntity } from "src/sala-virtual/entities/sala-virtual.entity";
import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, OneToMany } from "typeorm";
import { ParticipantesEntity } from "./participantes.entity";

export enum Categoria {
    VIRTUAL = "virtual",
    FISICA = "fisica",
    HIBRIDA = "hibrida"
}

@Entity()
export class ReuniaoEntity {

    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({nullable:false})
    titulo : string

    @Column({enum : Categoria, type : 'enum', default : Categoria.FISICA})
    categoria : Categoria

    @Column({type : "datetime"})
    dataHora : Date

    @Column()
    duracao : number

    @Column()
    pauta : string

    @ManyToOne(() => UsuarioEntity, usuario => usuario.reunioes)
    solicitante : UsuarioEntity

    @OneToMany(() => ParticipantesEntity, (participantes) => participantes.reuniaoId)
    participantes : ParticipantesEntity[]

    @ManyToOne(() => SalaPresencialEntity , salaPresencial => salaPresencial.reunioes)
    salaPresencial : SalaPresencialEntity

    @ManyToOne(() => SalaVirtualEntity, salaVirtual => salaVirtual.reunioes)
    salaVirtual : SalaVirtualEntity
  reuniao: Promise<UsuarioEntity>;
}
