import { ReuniaoAnexo } from "src/reuniao-anexos/entities/reuniao-anexo.entity";
import { SalaPresencialEntity } from "src/sala-presencial/entities/sala-presencial.entity";
import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, OneToMany, OneToOne } from "typeorm";

export enum Categoria {
    VIRTUAL = "virtual",
    FISICA = "fisica",
    HIBRIDA = "hibrida"
}

@Entity({name:"reuniao"})
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
    
    @Column()
    joinUrl : string

    @ManyToOne(() => UsuarioEntity, usuario => usuario.reunioes)
    solicitante : UsuarioEntity

    @Column({type : 'json'})
    participantes : JSON

    @OneToMany(() => ReuniaoAnexo, anexos => anexos)
    anexos : ReuniaoAnexo[];

    @ManyToOne(() => SalaPresencialEntity , salaPresencial => salaPresencial.reunioes)
    salaPresencial : SalaPresencialEntity

    @Column()
    AtaUrl ?: string
}
