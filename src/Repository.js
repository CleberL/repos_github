import api from "./api";

class Repository {
  async search(repositoryName) {
    const {
      data: {
        name,
        description,
        owner: { avatar_url },
        html_url,
        stargazers_count,
        forks_count,
        open_issues,
        pushed_at
      }
    } = await api.get(`${repositoryName}`);
    return {
      name,
      description,
      avatar_url,
      html_url,
      stargazers_count,
      forks_count,
      open_issues,
      pushed_at
    };
  }

  render({
    avatar_url,
    name,
    description,
    stargazers_count,
    forks_count,
    open_issues,
    pushed_at,
    html_url
  }) {
    const repository = document.createElement("li");
    repository.innerHTML = `
    <img src="${avatar_url}" alt="Icone do Repositório">
                      <strong>${name}</strong>
                     <p>${description || "sem descrição"}</p>
                      <div id="details">
                        <p> <i class="material-icons">
                        stars
                        </i> ${stargazers_count || "0"}</p>
                        <p> <i class="material-icons">
                        share
                        </i> ${forks_count || "0"}</p>
                        <p> <i class="material-icons">
                        report_problem
                        </i> ${open_issues || "0"}</p>
                        <p> <i class="material-icons">
                        access_time
                        </i> Last Commit: ${pushed_at}</p>
                        <a href="${html_url}" target="_blank">Acessar</a>
                      </div>
                      <hr/>
        `;

    return repository;
  }
}

export default new Repository();
