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

                    dados: [
                        {
                            name: "Brasileirão 2006-2024",
                            url: "./esportes/brasileirao/brasileirao_2006_2024.csv",
                            description: "Dados do Brasileirão de 2006-2024"
                        },
                    ],

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
                title: "Formula-1",
                description: "Dados e Análise da Formula-1",
                author: "Renan Sinesio | Vynicios Daniel | Yosef Joseph",
                content: {

                    dados: [
                        {
                            name: "formula 1",
                            url: "./esportes/formula1/csvs.zip",
                            description: "Dados da formula 1"
                        }
                    ],

                    apresentacoes: [
                        {
                            name: "Análises Formula 1",
                            url: "./esportes/formula1/relatorio.ipynb",
                            description: "Análise de dados da formula 1"
                        }
                    ]
                }
            },
            {
                title: "NBA",
                description: "Dados e Análise da NBA",
                author: "Vinicius Ferraz | João Pedro | Samuel Victor",
                content: {

                    dados: [
                        {
                            name: "NBA Temporada 2024",
                            url: "./esportes/nba/NBA_Temporada_2024.xlsx",
                            description: "Dados da temporada 2024 da NBA"
                        }
                    ],

                    apresentacoes: [
                        {
                            name: "Análises NBA 2024",
                            url: "./esportes/nba/relatorio.ipynb",
                            description: "Análise completa dos dados da NBA"
                        }
                    ]
                }
            },
            {
                title: "UFC",
                description: "Dados e Análise do UFC",
                author: "Diego de Sousa | João Rafael | João Vitor Chaves | Nathan David",
                content: {

                    dados: [
                        {
                            name: "UFC",
                            url: "./esportes/ufc/lutadores.csv",
                            description: "Dados dos lutadores do UFC"
                        }
                    ],

                    apresentacoes: [
                        {
                            name: "Análises UFC",
                            url: "./esportes/ufc/relatorio.ipynb",
                            description: "Análise dos dados do UFC"
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
        title: "Social",
        topics: [
            {
                title: "Dados da criminalidade em João Pessoa",
                description: "Dados e Análise sobre a criminalidade em João Pessoa",
                author: "Jonatas Miguel, Ana Beatriz, João Victor, Thiago Marques",
                content: {
                    dados: [

                        {
                            name: "Dados de Criminalidade em João Pessoa",
                            url: "./social/criminalidade/dados.zip",
                            description: "Dados de todos os autores do centro de informática"
                        },
                    ],
                    apresentacoes: [
                        {
                            name: "Análise dos Dados",
                            url: "./social/criminalidade/relatorio.ipynb",
                            description: "Relatório completo da análise da criminalidade em João Pessoa"
                        }
                    ]
                }
            },
        ]
    },

    outros: {
        title: "Outros",
        topics: [
            {
                title: "Dados academicos dos docentes do centro de informática",
                description: "Dados e Análise sobre docentes do centro de informática da UFPB",
                author: `Clarice Lopes, Felipe Medeiros, Vinícius Mangueira | 2024.2<br>
                         Sarah Fernanda, Luiz Carlos Veloso, Sofia Pontes, Cauã Henrique | 2025.2`,
                content: {
                    dados: [

                        {
                            name: "Dados de Docentes",
                            url: "./outros/docentesCI/dados_2024.2.zip",
                            description: "Dados de todos os autores do centro de informática |periodo 2024.2"
                        },
                        {
                            name: "Dados do lattes dos docentes do Ci",
                            url: "./outros/docentesCI/data_2025.1.zip",
                            description: "Dados do Lattes dos docentes do centro de informática |periodo 2025.1"
                        },
                    ],
                    apresentacoes: [
                        {
                            name: "Análise dos Docentes",
                            url: "./outros/docentesCI/relatorio_2024.2.ipynb",
                            description: "Relatório completo da análise dos docentes"
                        },
                        {
                            name: "Análise do Lattes dos Docentes",
                            url: "./outros/docentesCI/notebook_relatorio_2025.1.ipynb",
                            description: "Relatório da análise do Lattes dos Docentes do Centro de Informática"
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
            },
            {
                title: "Steam",
                description: "Dados e Análise sobre os jogos mais populares da Steam",
                author: "Samuel Santos | Pedro Henrique | Leonardo Filho | Sean Lucas",
                content: {
                    dados: [
                        {
                            name: "Dataset dos jogos da Steam",
                            url: "./outros/steam/data.zip",
                            description: "Dados dos jogos da Steam"
                        }
                    ],
                    apresentacoes: [
                        {
                            name: "Analise sobre os jogos populares da steam(2019-2024)",
                            url: "./outros/steam/relatorio.ipynb",
                            description: "Relatório da análise dos jogos mais populares da steam"
                        }
                    ]
                }
            }

        ]
    },

    educacao: {
        title: "Educação",
        topics: [
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
