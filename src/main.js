import api from "./api";

class App {
  constructor() {
    this.repositories = [];

    this.formEl = document.getElementById("repo-form");
    this.inputEl = document.querySelector("input[name=repository]");
    this.listEl = document.getElementById("repo-list");

    this.registerHandlers();
  }

  registerHandlers() {
    this.formEl.onsubmit = event => this.addRepository(event);
  }

  async addRepository(event) {
    event.preventDefault();

    const repoInput = this.inputEl.value;

    if (repoInput.length === 0) return;

    const response = await api.get(`/${repoInput}`);

    const {
      name,
      description,
      html_url,
      owner: { avatar_url },
      stargazers_count,
      forks_count,
      open_issues,
      pushed_at
    } = response.data;

    this.repositories.push({
      name,
      description,
      avatar_url,
      html_url,
      stargazers_count,
      forks_count,
      open_issues,
      pushed_at
    });

    this.inputEl.value = "";

    this.render();
  }

  render() {
    this.listEl.innerHTML = "";

    this.repositories.forEach(repo => {
      let imgEl = document.createElement("img");
      imgEl.setAttribute("src", repo.avatar_url);

      let titleEl = document.createElement("strong");
      titleEl.appendChild(document.createTextNode(repo.name));

      let descriptionEl = document.createElement("p");
      descriptionEl.appendChild(
        document.createTextNode(`${repo.description || "sem descrição"}`)
      );

      let starsEl = document.createElement("p");
      starsEl.appendChild(
        document.createTextNode(`Stars: ${repo.stargazers_count || "0"}`)
      );

      let forksEl = document.createElement("p");
      forksEl.appendChild(
        document.createTextNode(`Forks: ${repo.forks_count || "0"}`)
      );

      let issuesEl = document.createElement("p");
      issuesEl.appendChild(
        document.createTextNode(`Issues: ${repo.open_issues || "0"}`)
      );

      let lastCommitEl = document.createElement("p");
      lastCommitEl.appendChild(
        document.createTextNode(`Last Commit: ${repo.pushed_at}`)
      );

      let linkEl = document.createElement("a");
      linkEl.setAttribute("target", "_blank");
      linkEl.setAttribute("href", repo.html_url);
      linkEl.appendChild(document.createTextNode("Acessar"));

      let listItemEl = document.createElement("li");
      listItemEl.appendChild(imgEl);
      listItemEl.appendChild(titleEl);
      listItemEl.appendChild(descriptionEl);
      listItemEl.appendChild(starsEl);
      listItemEl.appendChild(forksEl);
      listItemEl.appendChild(issuesEl);
      listItemEl.appendChild(lastCommitEl);
      listItemEl.appendChild(linkEl);

      this.listEl.appendChild(listItemEl);
    });
  }
}

new App();
