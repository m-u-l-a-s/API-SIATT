import api from "./api"
import { anexo } from "../interfaces/anexo"

export const getAnexos = async (idReuniao: string, e : any) => {
    e.preventDefault()
    await api.get(`reuniao-anexos/reuniao/${idReuniao}`)
        .then(async resp => {
            const anexos: anexo[] = resp.data
            console.log(anexos)

            for (let anexo of anexos) {
                const response = await fetch(anexo.url);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                const link = document.createElement('a')
                link.href = url
                let fileName = `${anexo.nomeArquivo.split("-")[0]}.${anexo.nomeArquivo.split(".")[1]}`
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        })
}