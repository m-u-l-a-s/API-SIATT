/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
//function gerarAta() {
  const spawner = require('child_process').spawn;
  const pathPython = './replaceAta.py';

  var input = '{"titulo":"Teste Reuniao","categoria":"fisica","dataHora":"2024-06-01T04:18:00.000Z","duracao":1099,"pauta":"Pauta Teste","presencial":"d9c6911d-b83c-4ebf-a35d-d9a089f3d4db","virtual":"","solicitanteEmail":"alexandre@gmail.com","participantes":["shadow"]}';

  const data_to_pass_in = input;

  const python_process = spawner('python', [pathPython, data_to_pass_in]);

  python_process.stdout.on('data', (data) => {
    console.log(data.toString());
  });
//}

//export default gerarAta;
