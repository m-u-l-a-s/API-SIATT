import { ReuniaoEntity } from 'src/reuniao/entities/reuniao.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({name: "usuarios"})
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    login : string;

    @Column()
    email : string;

    @Column()
    diretoria: boolean;

    @Column()
    permissao: number

    @Column()
    status : number

    @OneToMany(() => ReuniaoEntity, reunioes => reunioes.solicitante)
    reunioes : ReuniaoEntity[]
}
