import Repository from "./Repository";

class App {
  constructor() {
    this.repositories = [];

    this.formEl = document.getElementById("repo-form");
    this.inputEl = document.querySelector("input[name=repository]");
    this.listRepositories = document.getElementById("repo-list");

    this.repository = Repository;

    this.registerHandlers();
  }

  registerHandlers() {
    this.formEl.onsubmit = event => this.handleAddRepository(event);
  }

  async handleAddRepository(event) {
    event.preventDefault();
    const repoInput = this.inputEl.value;

    if (repoInput.length === 0) return alert("Digite algum repositório valído");

    this.inputEl.value = "";

    this.repositories.push(await this.repository.search(repoInput));
    this.render();
  }

  render() {
    this.listRepositories.innerHTML = "";
    this.exclude = this.exclude.bind(this);
    this.repositories.forEach(repository => {
      this.listRepositories.appendChild(close);
      this.listRepositories.appendChild(this.repository.render(repository));
    });
  }
  exclude(index) {
    console.log("ok");
    //this.render();
  }
}

new App();
