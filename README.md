# Projeto de certificação 2 – Postagem de blog

### Resumo do projeto

Crie uma página web que contenha um input para titulo e outro para escrever um conteúdo. Vamos simular a criação de um post semelhante ao facebook, linkedIn... Onde daremos um título, e escreveremos um texto qualquer e postamos. E o mais legal deste projeto, é que estaremos fazendo uma comunicação com uma API aberta. Simulando um pouco do mundo real.

### Introdução

Este desafio é interessante, pois estaremos utilizando a família completa do front-end. A base para se fazer qualquer App que consome API's. Relaxe pequeno gafanhoto, que não será o bixo de 7 cabeças; Mas, te levará ao próximo nível, com certeza!

Os requisitos mínimos para avaliar a sua página dinâmica seriam:

1 Basicamente no html, precisaremos de algum lugar para entrada de dados (input). E, outro para saída (output) 1.1 Para a entrada, teremos form, dois inputs de texto e um botão para requisição post; 1.2 Para saída de renderização, teremos alguma tag de título para receber o título; e outro de parágrafo para receber o conteúdo.

2 No js, precisaremos de seletores. 2.1 Um, para aplicar evento de submit. 2.2 Outros dois, para retirar título e conteúdo que quero enviar em meu post 2.3 Outros dois, para renderizar o retorno do post, também titulo-renderizar e conteudo-renderizar.

### Resolução
Primeiramente foi criado um formulário para receber as entradas do usuário.
```html
<form id="postForm">
  <input type="text" id="titulo" placeholder="Título" required>
  <textarea id="conteudo" placeholder="Conteúdo" required></textarea>
  <button type="submit">Postar</button>
</form>
```

Em seguida, foi criada uma div para receber o retorno da requisição para a API.
```html
<div class="post-container">
  <h2 id="renderizador-titulo"></h2>
  <p id="renderizador-conteudo"></p>
</div>
```

Depois disso, foi criada a classe PacoteBuscador, responsável por executar requisições HTTP nos métodos GET, POST, PUT e DELETE em uma API.
```javascript
class PacoteBuscador {
  constructor(baseURL) {
      this.baseURL = baseURL;
  }

  get(endpoint) {
      return fetch(this.baseURL + endpoint)
          .then(response => response.json());
  }

  put(endpoint, body) {
      return this._send("put", endpoint, body);
  }

  post(endpoint, body) {
      return this._send("post", endpoint, body);
  }

  delete(endpoint, body) {
      return this._send("delete", endpoint, body);
  }

  _send(method, endpoint, body) {
      return fetch(this.baseURL + endpoint, {
          method,
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
      }).then(response => response.json());
  }
}
```

Após a criação da classe, foi implementado o código para acionar a requisição à API sempre que o formulário HTML for submetido.
```javascript
document.getElementById("postForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const titulo = document.getElementById("titulo").value;
  const conteudo = document.getElementById("conteudo").value;
  
  const data = {
      title: titulo,
      body: conteudo,
      userId: 1
  };

  const API = new PacoteBuscador("https://jsonplaceholder.typicode.com");
  
  API.post("/posts", data)
  .then(data => {
    document.getElementById("renderizador-titulo").innerText = data.title;
    document.getElementById("renderizador-conteudo").innerText = data.body;
  })
  .catch(error => console.error("Erro ao postar:", error));
});
```

O código foi organizado em arquivos separados — **index.html**, **style.css** e **main.js** — para melhorar a estrutura e a legibilidade.

### Execução do código

Baixe o repositório para sua máquina, acesse o diretório **"posting--page"** e abra o arquivo **"index.html"** em seu navegador de preferência..

