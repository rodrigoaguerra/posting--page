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