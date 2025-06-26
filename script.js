// Dados dos projetos organizados por categoria
const projectsData = {
    esportes: {
        title: "Esportes",
        topics: [
            {
                title: "Futebol",
                description: "Dados e Análise do brasileirão",
                author: "Dennynson Scheydt| Matias Monteiro | Vinícius da Silva | João Matheus ",
                content: {
                    dados: "https://github.com/Matiasply/data-set-brasileirao/blob/master/brasileirao_2006_2024.csv",
                    analise: "https://github.com/Matiasply/data-set-brasileirao/blob/master/relatorio.ipynb",
                }
            },
            {
                title: "NBA",
                description: "Dados e Análise da NBA",
                author: "Vinicius Ferraz | João Pedro | Samuel Victor",
                content: {
                    dados: "https://github.com/Cigilo/Coleta-de-dados-nba/blob/main/NBA_Temporada_2024.xlsx",
                    analise: "https://github.com/Cigilo/Coleta-de-dados-nba/blob/main/relatorio.ipynb",
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
                title: "Música populares",
                description: "Dados e Análise sobre músicas e artistas",
                author: "Irlan Miguel | José Victor | Labert Paixão",
                content: {
                    dados: "https://github.com/laberttt/Music-Data-Analytics/tree/main/dataset",
                    analise: "https://github.com/laberttt/Music-Data-Analytics/blob/main/presentation.ipynb",
                }
            },

            {
                title: "Guitarra",
                description: "Dados e Análise sobre sons de guitarra",
                author: "Pedro Henrique | Igor de Melo | Erick Batista | João Vitor",
                content: {
                    dados: "https://github.com/PKrutaa/MusicData/blob/main/dataset_com_features.csv",
                    analise: "https://github.com/PKrutaa/MusicData/blob/main/relat%C3%B3rio.ipynb",
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
                author: "Eva Maria",
                content: {
                    dados: "https://drive.google.com/drive/folders/1ao_2Pih-YwhrOjCjcVPPZwfiixFk8f_p",
                    analise: "https://github.com/evam4ria/projeto-icd2024/tree/main",
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
                author: "Clarice Lopes, Felipe Medeiros, Vinícius Mangueira",
                content: {
                    dados: "https://github.com/claricelopes/dados_coleta/tree/main/captura_dados",
                    analise: "https://github.com/claricelopes/dados_coleta/blob/main/relatorio.ipynb",
                }
            },

            {
                title: "Documentos",
                description: "Dados e Análise sobre Documentos",
                author: "Anne Fernandes | Matheus da Silva | Thiago Henrique",
                content: {
                    dados: "https://github.com/thiag0bezerra/docai/blob/master/data/processed/dataset.csv",
                    analise: "https://github.com/thiag0bezerra/docai/blob/master/relatorio.ipynb",
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