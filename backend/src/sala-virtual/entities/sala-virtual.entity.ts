import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { ReuniaoEntity } from "src/reuniao/entities/reuniao.entity";

@Entity()
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

    async setSenha(senha : string) : Promise<void> {
        const salt = await bcrypt.genSalt()
        this.senha = await bcrypt.hash(senha, salt)
    }

    async comparePassword( senhaEnviada ) : Promise<boolean>{
        return await bcrypt.compare(senhaEnviada, this.senha)
    }

    @Column()
    permissao : number

    @OneToMany(() => ReuniaoEntity, reuniao => reuniao.salaVirtual)
    reunioes : ReuniaoEntity[]
}
