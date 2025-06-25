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
    card.className = 'topic-card bg-white shadow-md rounded-lg p-6 mb-4';
    
    card.innerHTML = `
        <div class="flex justify-between items-start">
            <div class="flex-1">
                <h4 class="text-lg font-bold mb-2">${topic.title}</h4>
                <p class="text-gray-600 mb-2">${topic.description}</p>
                <p class="text-sm text-blue-600">Autor: ${topic.author}</p>
            </div>
            <button class="details-btn ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Ver Detalhes
            </button>
        </div>
    `;

    const detailsButton = card.querySelector('.details-btn');
    detailsButton.addEventListener('click', () => {
        showProjectModal(topic);
    });

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

function showProjectModal(topic) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalTitle || !modalContent) return;
    
    modalTitle.textContent = topic.title;

    const dados = topic.content?.dados || 'Dados não informados';
    const analise = topic.content?.analise || 'Análise não informada';
    
    modalContent.innerHTML = `
        <div class="space-y-6">
            <div>
                <h4 class="font-semibold text-lg mb-2">Autores</h4>
                <p class="text-gray-700">${topic.author}</p>
            </div>
            
            <div>
                <h4 class="font-semibold text-lg mb-2">Dados</h4>
                <p class="text-gray-700">${dados}</p>
            </div>

            <div>
                <h4 class="font-semibold text-lg mb-2">Analise feita</h4>
                <p class="text-gray-700">${analise}</p>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function hideModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}