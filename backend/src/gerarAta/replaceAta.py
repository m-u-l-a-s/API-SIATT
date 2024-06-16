#pip install pywin32
from datetime import datetime
from pathlib import Path
import win32com.client
import sys
import json

#Converte JSON em no objeto RPC
dados = json.loads(sys.argv[1])

jsonRPC = '{"RPC_ASSUNTO":"","RPC_DATA":"","RPC_HORARIO":"","RPC_PARTICIPANTES":"", "RPC_RELATOR":""}'
rpc = json.loads(jsonRPC)

rpc['RPC_ASSUNTO'] = dados['titulo']
rpc['RPC_RELATOR'] = dados['solicitanteEmail']

DataHora = datetime.fromisoformat(dados['dataHora'][:-1] + '+00:00')
rpc['RPC_DATA'] =  f"{str(DataHora.day)}/{str(DataHora.month)}/{str(DataHora.year)}"
rpc['RPC_HORARIO'] =  f"{str(DataHora.hour)}:{str(DataHora.minute)}"

auxStr = ''
for item in dados['participantes']:
    rpc['RPC_PARTICIPANTES'] += (auxStr + item)
    auxStr = ', '

#Abre diretorio output
current_dir = Path.cwd()

input_dir = current_dir

output_dir = current_dir / "output"

output_dir.mkdir(parents = True, exist_ok = True)

doc = "ATA_DE_REUNIAO.docx"

#Começa as operações de replace

wd_replace = 2 #2 = Replace all, 1 = Replace once, 0 = dont replace
wd_find_wrap = 1 #2 = ask to continue, 1 = continue search

word_app = win32com.client.DispatchEx("Word.Application")
word_app.Visible = False
word_app.DisplayAlerts = False

for item in rpc:
    if rpc[item] != '':
        find_str = item

        replace_with = rpc[item]

        for doc_file in Path(input_dir).rglob(doc):
            word_app.Documents.Open(str(doc_file))

            word_app.Selection.Find.Execute(
                FindText=find_str,
                ReplaceWith=replace_with,
                Replace=wd_replace,
                Forward=True,
                MatchCase=True,
                MatchWholeWord=False,
                MatchWildcards=True,
                MatchSoundsLike=False,
                MatchAllWordForms=False,
                Wrap=wd_find_wrap,
                Format=True,
            )

            for i in range(word_app.ActiveDocument.Shapes.Count):
                if word_app.ActiveDocument.Shapes(i + 1).TextFrame.HasText:
                    words = word_app.ActiveDocument.Shapes(i + 1).TextFrame.TextRange.Words
                    # Loop through each word. This method preserves formatting.
                    for j in range(words.Count):
                        # If a word exists, replace the text of it, but keep the formatting.
                        if word_app.ActiveDocument.Shapes(i + 1).TextFrame.TextRange.Words.Item(j + 1).Text == find_str:
                            word_app.ActiveDocument.Shapes(i + 1).TextFrame.TextRange.Words.Item(j + 1).Text = replace_with

#Fim do for q passa pelo word

output_path = output_dir / f"{doc_file.stem}_replaced{doc_file.suffix}"
word_app.ActiveDocument.SaveAs(str(output_path))
word_app.ActiveDocument.Close(SaveChanges=False)
word_app.Application.Quit()

sys.stdout.flush()

