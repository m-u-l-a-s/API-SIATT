import { Injectable } from '@nestjs/common';
import { ReuniaoAnexo } from './entities/reuniao-anexo.entity';
import { bodyFile } from './dto/anexo.dto';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReuniaoAnexosService {
    constructor(
        @InjectRepository(ReuniaoAnexo)
        private readonly anexosRepository : Repository<ReuniaoAnexo>
    ){}

    async salvarArquivo( req : Request, reuniaoId : string,arquivo : Express.Multer.File){
        const anexo : ReuniaoAnexo = new ReuniaoAnexo();
        anexo.nomeArquivo = arquivo.filename;
        anexo.tamanhoArquivo = arquivo.size;
        anexo.tipoArquivo = arquivo.mimetype;
        anexo.reuniaoId = reuniaoId;
        anexo.url = `${req.protocol}://${req.get("host")}/anexos/${req.params.email}/${arquivo.filename}`

        return await this.anexosRepository.save(anexo)
    }
}
