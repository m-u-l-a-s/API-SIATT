

# Sprint 3 - Agendamento


<p align="center">
      <img src="/docs/img/Logo_Mulas.png" alt="Logo da Equipe Mulas">



<hr>
<br>
<p align="center">
  <a href ="#backlog"> Backlog da Sprint </a>  | 
  <a href ="#burndown"> Burndown </a>  |
  <a href ="#historia"> Histórias de Usuários </a>  
</p>



</p>


<br>
<br>

:pushpin: Status do Projeto: :white_check_mark: **Concluído**

<br>

Para a primeira Sprint do projeto, adotamos o método ágil de desenvolvimento de produtos, com foco na concepção do MVP (*Minimal Viable Product- Mínimo Produto Viável*). O MVP é a primeira versão do sistema de agendamento de reuniões para a empresa SIATT, já apto para uso, mas ainda com espaço para melhorias futuras. Nesta fase inicial, concentramos nossos esforços em:

- Criação do Wireframe;
- Modelagem e Criação do Banco de dados;
- Agendar reuniões: online, presencial, híbridas;
- Sugestão de salas;
- Visualizar reuniões agendadas;


### Diagrama de Entidade e Relacionamento do Banco de Dados

Um Diagrama de Entidade e Relacionamento (DER) é um recurso fundamental no desenvolvimento de um banco de dados para um Portal de Agendamento de Reuniões que suporta múltiplos formatos de encontros, tais como: reuniões presenciais, online ou híbridas. Abaixo está uma descrição detalhada de como está estruturado o DER para um sistema desse tipo:


- **Usuário:** Esta entidade é central e representa todos os membros da equipe que interagem com o sistema. Inclui atributos como login, e-mail, departamento, nível de acesso e status (ativo, inativo).


- **Reunião:** Representa cada reunião agendada no sistema, contendo detalhes como título, data, duração, categoria, pauta etc.


- **Sala Virtual:** Especificamente para reuniões online, esta entidade descreve as salas virtuais disponíveis, com informações como nome da sala, login, senha e nível de permissão dos participantes (quem pode criar, quem pode entrar).


- **Sala Física:** Quando a reunião é presencial, esta entidade representa as salas físicas do espaço de trabalho, contendo dados como nome da sala, local, capacidade e nível de permissão dos participantes.


O DER é uma representação visual dessas entidades e relacionamentos, ajudando a entender a estrutura do banco de dados do sistema de agendamento de reuniões.

<br>



### Modelo Lógico do Banco de Dados

<p align="center">
      <img src="/docs/img/DER_BD.png" alt="DER do Banco de Dados">

<br>

<br>

<br>



<span id="backlog">

## :date: Backlog da Sprint

<p align="center">
      <img src="/docs/img/Backlog_Sprint01.jpg" alt="Backlog do Produto">

<br>


<span id="burndown">

## :fire: Burndown

<p align="center">
      <img src="/docs/img/Burndown_Sprint01.png" alt="Burndown">

<br>


<span id="historia">

## :key: Histórias de Usuário

<p align="center">
      <img src="/docs/img/Historia_Usuario_Sprint01.png" alt="Histórias de Usuário">

<br>
