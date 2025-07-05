// Script para página de apresentações
document.addEventListener('DOMContentLoaded', function() {
    // Pegar parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const topicIndex = parseInt(urlParams.get('topic'));
    
    if (!category || isNaN(topicIndex)) {
        console.error('Parâmetros inválidos na URL');
        return;
    }
    
    // Buscar dados do projeto
    const categoryData = projectsData[category];
    if (!categoryData || !categoryData.topics[topicIndex]) {
        console.error('Projeto não encontrado');
        return;
    }
    
    const topic = categoryData.topics[topicIndex];
    updatePageContent(topic, categoryData.title);
    loadPresentationFiles(topic);
});

function updatePageContent(topic, categoryTitle) {
    // Atualizar título do projeto
    const projectTitle = document.getElementById('project-title');
    if (projectTitle) {
        projectTitle.textContent = `Apresentações - ${topic.title}`;
    }
    
    // Atualizar descrição
    const projectDescription = document.getElementById('project-description');
    if (projectDescription) {
        projectDescription.textContent = topic.description;
    }
    
    // Atualizar autor
    const projectAuthor = document.getElementById('project-author');
    if (projectAuthor) {
        projectAuthor.textContent = `Autor(es): ${topic.author}`;
    }
}

function loadPresentationFiles(topic) {
    const presentationFilesList = document.getElementById('presentation-files-list');
    if (!presentationFilesList) return;
    
    const apresentacoes = topic.content?.apresentacoes || topic.content?.analise;
    
    if (!apresentacoes || apresentacoes === 'Aqui fica o link para o repositório com a análise dos dados feita pelos alunos') {
        presentationFilesList.innerHTML = `
            <div class="text-gray-500 text-center py-8">
                <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <p>Nenhuma apresentação disponível</p>
            </div>
        `;
        return;
    }
    
    // Se apresentações é uma string (URL única)
    if (typeof apresentacoes === 'string') {
        const fileCard = createPresentationFileCard(apresentacoes, 'Relatório de análise principal');
        presentationFilesList.appendChild(fileCard);
    }
    // Se apresentações é um array (múltiplos arquivos)
    else if (Array.isArray(apresentacoes)) {
        apresentacoes.forEach((arquivo, index) => {
            if (typeof arquivo === 'string') {
                const fileCard = createPresentationFileCard(arquivo, `Apresentação ${index + 1}`);
                presentationFilesList.appendChild(fileCard);
            } else if (typeof arquivo === 'object') {
                const fileCard = createPresentationFileCard(arquivo.url, arquivo.name || `Apresentação ${index + 1}`, arquivo.description);
                presentationFilesList.appendChild(fileCard);
            }
        });
    }
    // Se apresentações é um objeto (múltiplos arquivos nomeados)
    else if (typeof apresentacoes === 'object') {
        Object.entries(apresentacoes).forEach(([nome, info]) => {
            if (typeof info === 'string') {
                const fileCard = createPresentationFileCard(info, nome);
                presentationFilesList.appendChild(fileCard);
            } else if (typeof info === 'object') {
                const fileCard = createPresentationFileCard(info.url, info.name || nome, info.description);
                presentationFilesList.appendChild(fileCard);
            }
        });
    }
    
    // Adicionar event listeners para botões de download
    setTimeout(() => {
        const downloadButtons = document.querySelectorAll('.download-btn');
        downloadButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const url = this.getAttribute('data-url');
                const filename = this.getAttribute('data-filename');
                
                console.log('Botão clicado, iniciando download:', url, filename);
                downloadFile(url, filename);
                
                return false;
            });
        });
    }, 100);
}

function createPresentationFileCard(url, fileName, description = '') {
    const card = document.createElement('div');
    card.className = 'border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors';
    
    // Detectar tipo de arquivo pela extensão
    const fileExtension = getFileExtension(url);
    const fileIcon = getPresentationFileIcon(fileExtension);
    const displayFileName = fileName || getFileName(url);
    
    card.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                    ${fileIcon}
                </div>
                <div>
                    <h4 class="text-sm font-medium text-gray-900">${displayFileName}</h4>
                    ${description ? `<p class="text-sm text-gray-500">${description}</p>` : ''}
                    <div class="flex items-center mt-1">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ${fileExtension.toUpperCase()}
                        </span>
                        <span class="ml-2 text-xs text-gray-500">${getPresentationType(fileExtension)}</span>
                    </div>
                </div>
            </div>
            <div class="flex space-x-2">
                <button class="download-btn inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-url="${url}" data-filename="${getFileName(url)}">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                    Baixar
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function getFileExtension(url) {
    if (!url) return 'arquivo';
    const path = url.split('?')[0]; // Remove query parameters
    const extension = path.split('.').pop().toLowerCase();
    return extension || 'arquivo';
}

function getFileName(url) {
    if (!url) return 'Arquivo desconhecido';
    const path = url.split('?')[0]; // Remove query parameters
    const segments = path.split('/');
    return segments[segments.length - 1] || 'Arquivo';
}

function getPresentationType(extension) {
    const types = {
        'ipynb': 'Jupyter Notebook',
        'pdf': 'Documento PDF',
        'html': 'Relatório HTML',
        'pptx': 'Apresentação PowerPoint',
        'md': 'Documento Markdown'
    };
    return types[extension] || 'Documento';
}

function getPresentationFileIcon(extension) {
    const iconClass = "w-8 h-8";
    
    switch (extension) {
        case 'ipynb':
            return `<svg class="${iconClass} text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
            </svg>`;
        case 'pdf':
            return `<svg class="${iconClass} text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm6 10a1 1 0 01-1-1V9a1 1 0 112 0v4a1 1 0 01-1 1zm-4-6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clip-rule="evenodd"></path>
            </svg>`;
        case 'html':
            return `<svg class="${iconClass} text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>`;
        case 'pptx':
            return `<svg class="${iconClass} text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm10-4a1 1 0 100 2h3a1 1 0 100-2h-3zm0 4a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
            </svg>`;
        case 'md':
            return `<svg class="${iconClass} text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
            </svg>`;
        default:
            return `<svg class="${iconClass} text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"></path>
            </svg>`;
    }
}

function downloadFile(url, fileName) {
    console.log('Função downloadFile chamada:', url, fileName);
    
    // Criar link simples para download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    
    // Adicionar ao DOM
    document.body.appendChild(link);
    
    console.log('Iniciando download:', fileName);
    
    // Simular clique
    link.click();
    
    // Remover link
    setTimeout(() => {
        if (document.body.contains(link)) {
            document.body.removeChild(link);
        }
    }, 100);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showToast('URL copiada para a área de transferência!');
    }, function(err) {
        console.error('Erro ao copiar: ', err);
        showToast('Erro ao copiar URL', 'error');
    });
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg text-white z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
