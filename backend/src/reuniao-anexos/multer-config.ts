import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const multerConfig : MulterOptions = {
    storage: diskStorage({
        destination: (req, res , callback) => {
            const solicitanteEmail : string = req.params.email

            //Diretório onde o arquivo será salvo
            const diretorioAnexo = path.join('./anexos', solicitanteEmail)

            if (!fs.existsSync(diretorioAnexo)) {
                fs.mkdirSync(diretorioAnexo, {recursive : true})
            }

            callback(null, diretorioAnexo)
        },
        filename: (req, arquivo, callback) => {
            const nomeArquivo = path.parse(arquivo.originalname).name.replace(/\s/g, '') + '-' + uuidv4();

            const tipoArquivo = path.parse(arquivo.originalname).ext;
            callback(null, `${nomeArquivo}${tipoArquivo}`);
        }
    })
}

export default multerConfig