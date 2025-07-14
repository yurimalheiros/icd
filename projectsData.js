// Dados dos projetos organizados por categoria
const projectsData = {
    esportes: {
        title: "Esportes",
        topics: [
            {
                title: "Brasileirão",
                description: "Dados e Análise do brasileirão",
                author: "Dennynson Scheydt| Matias Monteiro | Vinícius da Silva | João Matheus ",
                content: {
                    // Múltiplos arquivos de dados - pode ser array ou objeto
                    dados: [
                        {
                            name: "Brasileirão 2006-2024",
                            url: "./esportes/brasileirao/brasileirao_2006_2024.csv",
                            description: "Dados do Brasileirão de 2006-2024"
                        },
                    ],
                    // Múltiplas apresentações
                    apresentacoes: [
                        {
                            name: "Analises brasileirao",
                            url: "./esportes/brasileirao/presentation.ipynb",
                            description: "Análise completa dos dados do Brasileirão"
                        },
                    ]
                }
            },
            {
                title: "NBA",
                description: "Dados e Análise da NBA",
                author: "Vinicius Ferraz | João Pedro | Samuel Victor",
                content: {
                    // Múltiplos arquivos de dados - pode ser array ou objeto
                    dados: [
                        {
                            name: "NBA Temporada 2024",
                            url: "./esportes/nba/NBA_Temporada_2024.xlsx",
                            description: "Dados da temporada 2024 da NBA"
                        }
                    ],
                    // Múltiplas apresentações
                    apresentacoes: [
                        {
                            name: "Análises NBA 2024",
                            url: "./esportes/nba/relatorio.ipynb",
                            description: "Análise completa dos dados da NBA"
                        }
                    ]
                }
            }
        ]
    },

    entretenimento: {
        title: "Entretenimento",
    },

    musica: {
        title: "Música",
        topics: [
            {
                title: "Música populares",
                description: "Dados e Análise sobre músicas e artistas",
                author: "Irlan Miguel | José Victor | Labert Paixão",
                content: {
                    dados: [
                        {
                            name: "Dataset de Músicas youtube",
                            url: "./musica/musicas_populares/top_tracks_youtube.csv",
                            description: "Primeiro conjunto de dados "
                        },
                        {
                            name: "Dataset de Músicas youtube top 100 por ano", 
                            url: "./musica/musicas_populares/kworb_youtube_top100_PerYear.csv",
                            description: "Segundo conjunto de dados"
                        },
                        {
                            name: "Dataset de Músicas spotify",
                            url: "./musica/musicas_populares/top_tracks_spotify.csv", 
                            description: "Terceiro conjunto de dados musicais"
                        }
                    ],
                    apresentacoes: [
                        {
                            name: "Análise musicas populares",
                            url: "./musica/musicas_populares/presentation.ipynb",
                            description: "Análise completa dos dados musicais"
                        }
                    ]
                }
            },
            {
                title: "Guitarra",
                description: "Dados e Análise sobre sons de guitarra",
                author: "Pedro Henrique | Igor de Melo | Erick Batista | João Vitor",
                content: {
                    dados: [
                        {
                            name: "Dataset de Sons de Guitarra",
                            url: "./musica/guitarra/dataset_com_features.csv",
                            description: "Dados de sons de guitarra"
                        }
                    ],
                    apresentacoes: [
                        {
                            name: "Relatório de Guitarra",
                            url: "./musica/guitarra/relatório.ipynb",
                            description: "Análise completa dos dados de sons guitarra"
                        }
                    ]
                }
            }
        ]
    },

    social: {
        
    },

    outros: {
        title: "Outros",
        topics: [
            {
                title: "Dados academicos dos docentes do centro de informática",
                description: "Dados e Análise sobre docentes do centro de informática da UFPB",
                author: "Clarice Lopes, Felipe Medeiros, Vinícius Mangueira",
                content: {
                    dados: [

                        {
                            name: "Dados de Docentes",
                            url: "./outros/docentesCI/dados.zip",
                            description: "Dados de todos os autores do centro de informática"
                        },
                    ],
                    apresentacoes: [
                        {
                            name: "Análise dos Docentes",
                            url: "./outros/docentesCI/relatorio.ipynb",
                            description: "Relatório completo da análise dos docentes"
                        }
                    ]
                }
            },

            {
                title: "Documentos",
                description: "Dados e Análise sobre Documentos",
                author: "Anne Fernandes | Matheus da Silva | Thiago Henrique",
                content: {
                    dados: [
                        {
                            name: "Dataset de Documentos",
                            url: "./outros/documentos/dataset.csv",
                            description: "Dados de documentos"
                        }
                    ],
                    apresentacoes: [
                        {
                            name: "Análise de Documentos",
                            url: "./outros/documentos/relatorio.ipynb",
                            description: "Relatório completo da análise de documentos"
                        }
                    ]
                }
            }

        ]
    },

    educacao: {
        title: "Educação",
        topics: [
            // Adicione aqui projetos relacionados à educação
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
