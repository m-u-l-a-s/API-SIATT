import { Injectable } from '@nestjs/common';
import { ReuniaoAnexo } from './entities/reuniao-anexo.entity';
import { bodyFile } from './dto/anexo.dto';
import { Request, query } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs'
import { join } from 'path';
import { Query } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';


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
        anexo.url = `${req.protocol}://${req.get("host")}/reuniao-anexos/${req.params.email}/${arquivo.filename}`

        return await this.anexosRepository.save(anexo)
    }

    async getAnexos(idReuniao : string) {
        const query : string = `SELECT * FROM anexos a WHERE a.reuniaoIdId = "${idReuniao}"`
        return await this.anexosRepository.query(query);
    }
}
