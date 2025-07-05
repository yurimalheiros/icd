// Script para páginas de categoria
/**
 * Inicializa a página de categoria quando o DOM estiver carregado
 * Carrega os dados da categoria atual e configura todos os event listeners
 */
document.addEventListener('DOMContentLoaded', function() {
    // Pegar categoria da URL ou atributo data
    const categoryName = document.body.dataset.category;
    const categoryData = projectsData[categoryName];
    
    if (!categoryData) {
        console.error('Categoria não encontrada:', categoryName);
        return;
    }
    
    // Atualizar elementos da página
    updatePageContent(categoryData);
    setupEventListeners();
});

/**
 * Atualiza o conteúdo da página com os dados da categoria selecionada
 * @param {Object} categoryData - Dados da categoria contendo título e tópicos
 */
function updatePageContent(categoryData) {
    // Atualizar título da categoria no header principal
    const categoryTitle = document.getElementById('category-title');
    if (categoryTitle) {
        categoryTitle.textContent = categoryData.title;
    }
    
    // Atualizar breadcrumb de navegação
    const breadcrumbCategory = document.getElementById('breadcrumb-category');
    if (breadcrumbCategory) {
        breadcrumbCategory.textContent = categoryData.title;
    }
    
    // Popular grid de tópicos com os projetos da categoria
    const topicsGrid = document.getElementById('topics-grid');
    if (topicsGrid) {
        topicsGrid.innerHTML = '';
        const categoryName = document.body.dataset.category;
        categoryData.topics.forEach((topic, index) => {
            const topicCard = createTopicCard(topic, index, categoryName);
            topicsGrid.appendChild(topicCard);
        });
    }
}

/**
 * Cria um card HTML para exibir um tópico/projeto da categoria
 * @param {Object} topic - Dados do tópico contendo título, descrição, autor e conteúdo
 * @param {number} topicIndex - Índice do tópico na lista para navegação
 * @param {string} categoryName - Nome da categoria para construir URLs
 * @returns {HTMLElement} Elemento div com o card do tópico formatado
 */
function createTopicCard(topic, topicIndex, categoryName) {
    const card = document.createElement('div');
    card.className = 'bg-white shadow-md rounded-lg p-6 mb-4';

    // Extrair links de dados e análises/apresentações do conteúdo
    const dadosLink = topic.content?.dados || '';
    const analiseLink = topic.content?.analise || topic.content?.apresentacoes || '';

    card.innerHTML = `
        <div class="flex justify-between items-start">
            <div class="flex-1">
                <h4 class="text-lg font-bold mb-2">${topic.title}</h4>
                <p class="text-gray-600 mb-2">${topic.description}</p>
                <p class="text-sm text-gray-800 mb-3">Autor: ${topic.author}</p>
                <div class="flex gap-4 text-sm">
                    ${dadosLink && dadosLink !== 'Aqui fica o arquivo csv ou outro tipo de arquivo com os dados coletados' ? 
                        `<a href="dados.html?category=${categoryName}&topic=${topicIndex}" class="text-blue-600 underline hover:text-blue-800 flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Dados
                         </a>` : ''}
                    ${analiseLink && analiseLink !== 'Aqui fica o link para o repositório com a análise dos dados feita pelos alunos' ? 
                        `<a href="apresentacoes.html?category=${categoryName}&topic=${topicIndex}" class="text-green-600 underline hover:text-green-800 flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                            Apresentações
                         </a>` : ''}
                </div>
            </div>
        </div>
    `;
    return card;
}

/**
 * Configura todos os event listeners da página de categoria
 * Inclui funcionalidades do modal e teclas de atalho
 */
function setupEventListeners() {
    // Configurar modal de projetos
    const modal = document.getElementById('project-modal');
    const closeModal = document.getElementById('close-modal');
    
    // Event listener para botão de fechar modal
    if (closeModal) {
        closeModal.addEventListener('click', hideModal);
    }
    
    // Event listener para fechar modal clicando fora dele
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal();
        });
    }

    // Event listener para fechar modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            hideModal();
        }
    });
}

/**
 * Esconde o modal de projetos adicionando a classe 'hidden'
 * Função auxiliar para fechar o modal em diferentes cenários
 */
function hideModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}