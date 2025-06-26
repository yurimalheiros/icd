// Script para páginas de categoria
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

function updatePageContent(categoryData) {
    // Atualizar título da categoria
    const categoryTitle = document.getElementById('category-title');
    if (categoryTitle) {
        categoryTitle.textContent = categoryData.title;
    }
    
    // Atualizar breadcrumb
    const breadcrumbCategory = document.getElementById('breadcrumb-category');
    if (breadcrumbCategory) {
        breadcrumbCategory.textContent = categoryData.title;
    }
    
    // Popular tópicos
    const topicsGrid = document.getElementById('topics-grid');
    if (topicsGrid) {
        topicsGrid.innerHTML = '';
        categoryData.topics.forEach(topic => {
            const topicCard = createTopicCard(topic);
            topicsGrid.appendChild(topicCard);
        });
    }
}

function createTopicCard(topic) {
    const card = document.createElement('div');
    card.className = 'bg-white shadow-md rounded-lg p-6 mb-4';

    const dadosLink = topic.content?.dados || '';
    const analiseLink = topic.content?.analise || '';

    card.innerHTML = `
        <div class="flex justify-between items-start">
            <div class="flex-1">
                <h4 class="text-lg font-bold mb-2">${topic.title}</h4>
                <p class="text-gray-600 mb-2">${topic.description}</p>
                <p class="text-sm text-gray-800 mb-3">Autor: ${topic.author}</p>
                <div class="flex gap-4 text-sm text-blue-600">
                    ${dadosLink && dadosLink !== 'Aqui fica o arquivo csv ou outro tipo de arquivo com os dados coletados' ? 
                        `<a href="${dadosLink}" target="_blank" class="underline hover:text-blue-800 flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Dados
                         </a>` : ''}
                    ${analiseLink && analiseLink !== 'Aqui fica o link para o repositório com a análise dos dados feita pelos alunos' ? 
                        `<a href="${analiseLink}" target="_blank" class="underline hover:text-blue-800 flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                            Análise
                         </a>` : ''}
                </div>
            </div>
        </div>
    `;
    return card;
}

function setupEventListeners() {
    // Modal
    const modal = document.getElementById('project-modal');
    const closeModal = document.getElementById('close-modal');
    
    if (closeModal) {
        closeModal.addEventListener('click', hideModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal();
        });
    }

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            hideModal();
        }
    });
}

function hideModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}