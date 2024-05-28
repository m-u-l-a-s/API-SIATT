import { ReuniaoEntity } from "src/reuniao/entities/reuniao.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity({name : "anexos"})
export class ReuniaoAnexo {

    @PrimaryGeneratedColumn("uuid")
    id : number
    
    @Column()
    nomeArquivo : string

    @Column()
    tipoArquivo : string

    @Column()
    tamanhoArquivo : number

    @Column()
    url : string

    @ManyToOne(() => ReuniaoEntity, (reuniao) => reuniao.anexos)
    reuniaoId : string
}
