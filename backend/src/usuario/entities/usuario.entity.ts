import { ReuniaoEntity } from 'src/reuniao/entities/reuniao.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Entity({name: "usuario"})
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    login : string;

    @Column()
    email : string;

    @Column()
    senha : string

    @Column()
    diretoria: boolean;

    @Column()
    permissao: number

    @Column()
    status : number

    @OneToMany(() => ReuniaoEntity, reunioes => reunioes.solicitante)
    reunioes : ReuniaoEntity[]

    async setSenha(senha : string): Promise<void>{
        const salt = await bcrypt.genSalt()
        this.senha = await bcrypt.hash(senha, salt)
    }

    async compararSenha(senha : string): Promise<boolean>{
        return await bcrypt.compare(senha, this.senha)
    }
}
