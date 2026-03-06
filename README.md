# Portal ICD — Introdução à Ciência de Dados (UFPB)

Portal estático de divulgação dos trabalhos desenvolvidos pelos alunos da disciplina **Introdução à Ciência de Dados**, do Departamento de Computação Científica da Universidade Federal da Paraíba, sob orientação do **Prof. Dr. Yuri Malheiros**.

---

## Sumário

- [Portal ICD — Introdução à Ciência de Dados (UFPB)](#portal-icd--introdução-à-ciência-de-dados-ufpb)
  - [Sumário](#sumário)
  - [Visão Geral](#visão-geral)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Estrutura de Arquivos](#estrutura-de-arquivos)
  - [Arquitetura e Fluxo de Navegação](#arquitetura-e-fluxo-de-navegação)
    - [1. `index.html` + `projectsData.js`](#1-indexhtml--projectsdatajs)
    - [2. Páginas de Categoria (ex.: `esportes.html`)](#2-páginas-de-categoria-ex-esporteshtml)
    - [3. `dados.html` + `dados.js`](#3-dadoshtml--dadosjs)
    - [4. `apresentacoes.html` + `apresentacoes.js`](#4-apresentacoeshtml--apresentacoesjs)
  - [Como Adicionar um Novo Projeto](#como-adicionar-um-novo-projeto)
  - [Como Adicionar uma Nova Categoria](#como-adicionar-uma-nova-categoria)
    - [Passo 1 — `projectsData.js`](#passo-1--projectsdatajs)
    - [Passo 2 — Criar `tecnologia.html`](#passo-2--criar-tecnologiahtml)
    - [Passo 3 — Adicionar card em `index.html`](#passo-3--adicionar-card-em-indexhtml)
  - [Formato dos Dados (`projectsData.js`)](#formato-dos-dados-projectsdatajs)
  - [Descrição Detalhada dos Arquivos](#descrição-detalhada-dos-arquivos)
    - [`projectsData.js`](#projectsdatajs)
    - [`category.js`](#categoryjs)
    - [`dados.js`](#dadosjs)
    - [`apresentacoes.js`](#apresentacoesjs)
    - [`styles.css`](#stylescss)
  - [Como Rodar Localmente](#como-rodar-localmente)
  - [Convenções e Boas Práticas](#convenções-e-boas-práticas)
    - [Boa sorte e aproveite a oportunidade e trajetoria sendo monitor da disciplina,](#boa-sorte-e-aproveite-a-oportunidade-e-trajetoria-sendo-monitor-da-disciplina)
    - [ass: antigo monitor](#ass-antigo-monitor)

---

## Visão Geral

O portal é um **site estático** (sem back-end, sem banco de dados) cujo objetivo é centralizar e exibir os projetos de análise de dados desenvolvidos pelos alunos ao longo do semestre. Cada projeto possui:

- **Dados**: arquivos CSV, XLSX, ZIP etc. utilizados nas análises.
- **Apresentações**: Notebooks Jupyter (`.ipynb`), PDFs ou relatórios HTML gerados a partir das análises.

A navegação segue o fluxo:

```
Página Inicial (index.html)
    └── Página de Categoria (esportes.html, musica.html, ...)
            ├── Página de Dados (dados.html?category=X&topic=N)
            └── Página de Apresentações (apresentacoes.html?category=X&topic=N)
```

---

## Tecnologias Utilizadas

| Tecnologia | Versão / Origem | Finalidade |
|---|---|---|
| HTML5 | — | Estrutura das páginas |
| CSS3 + Tailwind CSS | CDN (sem build step) | Estilização e layout responsivo |
| JavaScript (ES6+) | Vanilla JS | Lógica de navegação, geração de cards e download |
| Jupyter Notebook | `.ipynb` | Relatórios e análises dos projetos |

> **Sem frameworks JS, sem Node.js, sem bundler.** O projeto roda direto no navegador sem nenhum passo de compilação.

---

## Estrutura de Arquivos

```
icd/
│
├── index.html            # Página inicial — lista as categorias
├── styles.css            # Estilos globais customizados (complementa Tailwind)
├── projectsData.js       # Fonte de verdade: todos os projetos e metadados
│
├── # Páginas de categoria (uma por categoria)
├── esportes.html
├── musica.html
├── social.html
├── outros.html
├── educacao.html
├── entretenimento.html
│
├── # Páginas compartilhadas (recebem parâmetros via query string)
├── dados.html            # Exibe e disponibiliza para download os dados de um projeto
├── apresentacoes.html    # Exibe e disponibiliza para download os notebooks/relatórios
│
├── # Scripts JS
├── category.js           # Lógica comum a todas as páginas de categoria
├── dados.js              # Lógica da página dados.html
├── apresentacoes.js      # Lógica da página apresentacoes.html
│
├── logo-ci.jpg           # Logo do Centro de Informática (exibido no header)
│
├── # Pastas com os arquivos dos projetos (dados + notebooks)
├── esportes/
│   ├── brasileirao/      brasileirao_2006_2024.csv, relatorio.ipynb
│   ├── formula1/         csvs.zip, relatorio.ipynb
│   ├── nba/              NBA_Temporada_2024.xlsx, relatorio.ipynb
│   └── ufc/              lutadores.csv, relatorio.ipynb
│
├── musica/
│   ├── musicas_populares/ top_tracks_youtube.csv, kworb_*.csv, top_tracks_spotify.csv, presentation.ipynb
│   └── guitarra/         dataset_com_features.csv, relatório.ipynb
│
├── social/
│   └── criminalidade/    dados.zip, relatorio.ipynb
│
└── outros/
    ├── docentesCI/       dados_2024.2.zip, data_2025.1.zip, relatorio_2024.2.ipynb, notebook_relatorio_2025.1.ipynb
    ├── documentos/       dataset.csv, relatorio.ipynb
    └── steam/            data.zip, relatorio.ipynb
```

---

## Arquitetura e Fluxo de Navegação

### 1. `index.html` + `projectsData.js`

- A página inicial lista os cards de categoria.
- No final de `projectsData.js` há um bloco que detecta se estamos na `index.html` e adiciona listeners de clique nos cards, redirecionando para `<categoria>.html`.

### 2. Páginas de Categoria (ex.: `esportes.html`)

- Cada arquivo HTML de categoria define `data-category="<chave>"` no elemento `<body>`.
- O script `category.js` lê esse atributo, busca os dados correspondentes em `projectsData`, e renderiza dinamicamente os cards de tópicos via `createTopicCard()`.
- Cada card exibe título, descrição, autor e dois links:
  - **Dados** → `dados.html?category=<cat>&topic=<index>`
  - **Apresentações** → `apresentacoes.html?category=<cat>&topic=<index>`
- Os links só aparecem se os respectivos campos de conteúdo estiverem preenchidos (e não forem os textos de placeholder padrão).

### 3. `dados.html` + `dados.js`

- Lê os query params `category` e `topic` da URL.
- Busca o tópico em `projectsData` e renderiza cards de arquivo via `createDataFileCard()`.
- Suporta `dados` como **string** (URL única) ou **array de objetos** `{ name, url, description }`.
- Cada card tem um link `<a download>` para baixar o arquivo diretamente.

### 4. `apresentacoes.html` + `apresentacoes.js`

- Mesma lógica de `dados.js`, mas lida com o campo `apresentacoes` (ou `analise`).
- Suporta o campo como **string** ou **array de objetos**.
- Os cards gerados têm ícones por extensão (`.ipynb`, `.pdf`, `.html`, `.pptx`, `.md`) e um botão "Baixar".

---

## Como Adicionar um Novo Projeto

Edite **somente o arquivo `projectsData.js`**. Nenhuma página HTML precisa ser alterada para adicionar projetos a categorias existentes.

Localize a categoria desejada e acrescente um novo objeto ao array `topics`:

```js
// projectsData.js

musica: {
    title: "Música",
    topics: [

        {
            title: "Título do Projeto",
            description: "Breve descrição do que foi analisado.",
            author: "Nome do Aluno 1 | Nome do Aluno 2",
            content: {
                dados: [
                    {
                        name: "Nome amigável do arquivo",
                        url: "./musica/meu-projeto/meu-arquivo.csv",
                        description: "Descrição do arquivo"
                    }
                ],
                apresentacoes: [
                    {
                        name: "Nome do relatório",
                        url: "./musica/meu-projeto/relatorio.ipynb",
                        description: "Descrição do notebook"
                    }
                ]
            }
        }
    ]
}
```

Depois, coloque os arquivos referenciados nas URLs dentro da pasta correspondente (ex.: `musica/meu-projeto/`).

> **Campos `dados` e `apresentacoes`** aceitam tanto um **array de objetos** (recomendado) quanto uma **string simples** com a URL (para um único arquivo sem metadados adicionais).

---

## Como Adicionar uma Nova Categoria

### Passo 1 — `projectsData.js`

```js
const projectsData = {


    tecnologia: {
        title: "Tecnologia",
        topics: [

        ]
    }
};
```

### Passo 2 — Criar `tecnologia.html`

Copie qualquer arquivo de categoria existente (ex.: `esportes.html`) e altere:

- `<title>` da página
- `data-category="tecnologia"` no `<body>`
- Texto do breadcrumb e do `<h2>` estático (são apenas fallbacks visuais; o JS preenche dinamicamente)

### Passo 3 — Adicionar card em `index.html`

Dentro da div `#categories-section`, adicione:

```html
<div class="category-card bg-white shadow-md rounded-lg p-6" data-category="tecnologia">
    <div class="text-center mb-4">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span class="text-2xl">💻</span>
        </div>
    </div>
    <h3 class="text-xl font-bold mb-2 text-center">Tecnologia</h3>
    <p class="text-gray-600 text-center">Descrição da nova categoria.</p>
</div>
```

> O clique no card já é tratado automaticamente pelo bloco no final de `projectsData.js` — desde que `data-category` corresponda à chave em `projectsData` e ao nome do arquivo HTML.

---

## Formato dos Dados (`projectsData.js`)

```
projectsData
└── <categoriaKey>: string           — chave usada nas URLs e no data-category do <body>
    ├── title: string                 — nome exibido na UI
    └── topics: Array<Topic>

Topic
├── title: string                    — título do projeto
├── description: string              — descrição curta
├── author: string                   — nome(s) do(s) autor(es), separados por |
└── content: Object
    ├── dados: string | Array<FileEntry>
    └── apresentacoes: string | Array<FileEntry>   (também aceita a chave "analise")

FileEntry
├── name: string                     — nome amigável exibido no card
├── url: string                      — caminho relativo ao arquivo (ex.: "./esportes/ufc/lutadores.csv")
└── description: string              — descrição curta do arquivo
```

---

## Descrição Detalhada dos Arquivos

### `projectsData.js`
Fonte de verdade do site. Contém todos os metadados dos projetos. É carregado como script em **todas** as páginas antes dos demais scripts, pois todos dependem do objeto global `projectsData`. Também contém o listener de clique nos cards da página inicial.

### `category.js`
Script compartilhado por todas as páginas de categoria. Responsável por:
- Ler `document.body.dataset.category` para saber qual categoria renderizar.
- Chamar `updatePageContent()` para preencher título, breadcrumb e grid de tópicos.
- Criar cards de tópico via `createTopicCard()`, incluindo os links condicionais para Dados e Apresentações.
- Configurar event listeners do modal (estrutura de modal existe no HTML como scaffolding opcional).

### `dados.js`
Script exclusivo de `dados.html`. Responsável por:
- Ler os query params `category` e `topic`.
- Renderizar cards de arquivo com link de download para cada entrada do campo `dados`.
- Detectar extensão do arquivo para exibir ícone e tipo correto.
- Exibir mensagem de "nenhum dado disponível" quando o campo está vazio ou é o placeholder padrão.

### `apresentacoes.js`
Script exclusivo de `apresentacoes.html`. Lógica análoga à de `dados.js`, mas para o campo `apresentacoes`. Inclui funções auxiliares `downloadFile()`, `showToast()` e `copyToClipboard()`.

### `styles.css`
Estilos customizados que complementam o Tailwind CSS: animações de hover nos cards, backdrop blur do modal, ajustes de responsividade para mobile.

---

## Como Rodar Localmente

O projeto é 100% estático. Basta servir a pasta com qualquer servidor HTTP local:


Acesse `http://localhost:8080` no navegador.

> **Não abra os arquivos diretamente pelo sistema de arquivos** (`file://`). Alguns navegadores bloqueiam scripts e downloads nesse modo. Use sempre um servidor local.

---

## Convenções e Boas Práticas

- **Nomes de chaves em `projectsData.js`** devem ser minúsculos, sem espaços e iguais ao `data-category` do `<body>` e ao nome do arquivo `.html` (ex.: chave `musica` → `musica.html` → `data-category="musica"`).
- **URLs de arquivos** devem ser caminhos relativos à raiz do projeto, começando com `./` (ex.: `./esportes/nba/relatorio.ipynb`).
- **Múltiplos autores** são separados por `|` na string `author`.
- **Placeholders não devem ir para produção.** Os campos com textos como `"Aqui fica o arquivo csv..."` são ignorados pelo JS — nenhum botão é gerado.
- Para projetos com **múltiplos semestres**, adicione múltiplos objetos no array `dados`/`apresentacoes`, um por período.
- **Não há autenticação nem servidor** — todo o conteúdo é público e servido estaticamente.

### Boa sorte e aproveite a oportunidade e trajetoria sendo monitor da disciplina, 
### ass: antigo monitor