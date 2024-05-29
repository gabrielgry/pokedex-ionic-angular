# Pokédex


## Demos

- Live: [gabrielgry.github.io/pokedex-ionic-angular/](https://gabrielgry.github.io/pokedex-ionic-angular/)

- vídeo:

  https://github.com/gabrielgry/pokedex-ionic-angular/assets/22972590/7149dd90-afee-4b93-9dfe-37459f877dba


## Abordagem

- Primeiramente, desenvolvi uma solução básica com as funcionalidades mínimas necessárias.
- Em seguida, meu foco foi o aprimoramento da lógica e do design das telas.
- A terceira etapa foi a reestruturação do projeto para permitir a expansão de forma mais organizada.
- Seguiu-se a implementação de uma nova funcionalidade, a lista de favoritos.
- E por fim, realizei a revisão e formatação do código e a configuração de GitHub Actions para o deploy automático no GitHub Pages
- Em relação à organização do projeto, busquei separar a camada de apresentação da camada de busca de dados e regras de negócio e injetar estes como dependência em outros módulos.
- Para a separação em componentes, procurei manter simples, e fiz quando necessário a separação de lógica ou tinha oportunidade de reutilização.

## Como executar o projeto

1. Clone o repositório

    ```bash
    git clone https://github.com/gabrielgry/pokedex-ionic-angular.git
    ```

2. Instale as dependências

    ```bash
    cd pokeapp
    npm install
    ```

3. Execute o aplicativo

    ```bash
    ionic serve
    ```
