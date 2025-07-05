// Script para página de dados
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
    loadDataFiles(topic);
});

function updatePageContent(topic, categoryTitle) {
    // Atualizar título do projeto
    const projectTitle = document.getElementById('project-title');
    if (projectTitle) {
        projectTitle.textContent = `Dados - ${topic.title}`;
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

function loadDataFiles(topic) {
    const dataFilesList = document.getElementById('data-files-list');
    if (!dataFilesList) return;
    
    const dados = topic.content?.dados;
    
    if (!dados || dados === 'Aqui fica o arquivo csv ou outro tipo de arquivo com os dados coletados') {
        dataFilesList.innerHTML = `
            <div class="text-gray-500 text-center py-8">
                <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p>Nenhum arquivo de dados disponível</p>
            </div>
        `;
        return;
    }
    
    // Se dados é uma string (URL única)
    if (typeof dados === 'string') {
        const fileCard = createDataFileCard(dados, 'Arquivo de dados principal');
        dataFilesList.appendChild(fileCard);
    }
    // Se dados é um array (múltiplos arquivos)
    else if (Array.isArray(dados)) {
        dados.forEach((arquivo, index) => {
            if (typeof arquivo === 'string') {
                const fileCard = createDataFileCard(arquivo, `Arquivo de dados ${index + 1}`);
                dataFilesList.appendChild(fileCard);
            } else if (typeof arquivo === 'object') {
                const fileCard = createDataFileCard(arquivo.url, arquivo.name || `Arquivo ${index + 1}`, arquivo.description);
                dataFilesList.appendChild(fileCard);
            }
        });
    }
    // Se dados é um objeto (múltiplos arquivos nomeados)
    else if (typeof dados === 'object') {
        Object.entries(dados).forEach(([nome, info]) => {
            if (typeof info === 'string') {
                const fileCard = createDataFileCard(info, nome);
                dataFilesList.appendChild(fileCard);
            } else if (typeof info === 'object') {
                const fileCard = createDataFileCard(info.url, info.name || nome, info.description);
                dataFilesList.appendChild(fileCard);
            }
        });
    }
}

function createDataFileCard(url, fileName, description = '') {
    const card = document.createElement('div');
    card.className = 'border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors';
    
    // Detectar tipo de arquivo pela extensão
    const fileExtension = getFileExtension(url);
    const fileIcon = getFileIcon(fileExtension);
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
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            ${fileExtension.toUpperCase()}
                        </span>
                        <span class="ml-2 text-xs text-gray-500">${getFileSize(url)}</span>
                    </div>
                </div>
            </div>
            <div class="flex space-x-2">
                <a href="${url}" download class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                    Baixar
                </a>
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

function getFileSize(url) {
    // Placeholder para tamanho do arquivo - poderia ser implementado com fetch HEAD request
    const extension = getFileExtension(url);
    const sizes = {
        'csv': '~2-5 MB',
        'xlsx': '~1-3 MB',
        'json': '~500 KB - 2 MB',
        'txt': '~100 KB - 1 MB'
    };
    return sizes[extension] || 'Tamanho variável';
}

function getFileIcon(extension) {
    const iconClass = "w-8 h-8";
    
    switch (extension) {
        case 'csv':
            return `<svg class="${iconClass} text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>`;
        case 'xlsx':
        case 'xls':
            return `<svg class="${iconClass} text-green-800" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>`;
        case 'json':
            return `<svg class="${iconClass} text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
            </svg>`;
        case 'txt':
            return `<svg class="${iconClass} text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
            </svg>`;
        default:
            return `<svg class="${iconClass} text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"></path>
            </svg>`;
    }
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