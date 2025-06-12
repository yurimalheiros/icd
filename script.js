// Dados dos projetos organizados por categoria
const projectsData = {
    esportes: {
        title: "Esportes",
        topics: [
            {
                title: "Futebol",
                description: "Dados e Análise do brasileirão",
                author: "nome do autor",
                content: {
                    dados: "Aqui fica o arquivo csv ou outro tipo de arquivo com os dados coletados",
                    analise: "Aqui fica o link para o repositório com a análise dos dados feita pelos alunos",
                }
            },
            {
                title: "NBA",
                description: "Dados e Análise da NBA",
                author: "nome do autor",
                content: {
                    dados: "Aqui fica o arquivo csv ou outro tipo de arquivo com os dados coletados",
                    analise: "Aqui fica o link para o repositório com a análise dos dados feita pelos alunos",
                }
            },
        ]
    },
    entretenimento: {
        title: "Entretenimento",
        topics: [
            {
                title: "Oscar",
                description: "Dados e Análise do Oscar",
                author: "nome do autor",
                content: {
                    dados: "Aqui fica o arquivo csv ou outro tipo de arquivo com os dados coletados",
                    analise: "Aqui fica o link para o repositório com a análise dos dados feita pelos alunos",
                }
            },  
        ]
    },
    musica: {
        title: "Música",
        topics: [
            {
                title: "Música",
                description: "Dados e Análise sobre músicas e artistas",
                author: "nome do autor",
                content: {
                    dados: "Aqui fica o arquivo csv ou outro tipo de arquivo com os dados coletados",
                    analise: "Aqui fica o link para o repositório com a análise dos dados feita pelos alunos",
                }
            },

            {
                title: "Guitarra",
                description: "Dados e Análise sobre sons de guitarra",
                author: "nome do autor",
                content: {
                    dados: "Aqui fica o arquivo csv ou outro tipo de arquivo com os dados coletados",
                    analise: "Aqui fica o link para o repositório com a análise dos dados feita pelos alunos",
                }

            }

        ]
    },

    social: {
        title: "Social",
        topics: [
            {
                title: "comunidade trans na paraíba",
                description: "Dados e Análise sobre a comunidade trans na Paraíba",
                author: "nome do autor",
                content: {
                    dados: "Aqui fica o arquivo csv ou outro tipo de arquivo com os dados coletados",
                    analise: "Aqui fica o link para o repositório com a análise dos dados feita pelos alunos",
                }
            }
        ]
    },

    outros: {
        title: "Outros",
        topics: [
            {
                title: "Dados academicos dos docentes do centro de informática",
                description: "Dados e Análise sobre docentes do centro de informática da UFPB",
                author: "nome do autor",
                content: {
                    dados: "Aqui fica o arquivo csv ou outro tipo de arquivo com os dados coletados",
                    analise: "Aqui fica o link para o repositório com a análise dos dados feita pelos alunos",
                }
            },

            {
                title: "Documentos",
                description: "Dados e Análise sobre Documentos",
                author: "nome do autor",
                content: {
                    dados: "Aqui fica o arquivo csv ou outro tipo de arquivo com os dados coletados",
                    analise: "Aqui fica o link para o repositório com a análise dos dados feita pelos alunos",
                }
            }

        ]
    },

    educacao: {
        title: "Educação",
        topics: [
            {
            }
        ]
    }
};

// Script para página principal (index.html)
if (document.getElementById('categories-section')) {
    document.addEventListener('DOMContentLoaded', function() {
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                // Redirecionar para página da categoria
                window.location.href = `${category}.html`;
            });
        });
    });
}