/* =====================================================
   SISTEMA DE CHAMADOS - JAVASCRIPT CORRIGIDO
   ===================================================== */

// Configuração do menu
const menuConfig = [
    {
        id: 'painel',
        title: 'Painel Principal',
        icon: 'fas fa-tachometer-alt',
        url: '/dashboard/',
        active: false
    },
    {
        id: 'chamados',
        title: 'Chamados',
        icon: 'fas fa-headset',
        url: '#',
        active: true,
        submenu: [
            { 
                id: 'novo-chamado', 
                title: 'Novo Chamado', 
                url: '/chamados/novo/', 
                icon: 'fas fa-plus-circle' 
            },
            { 
                id: 'meus-chamados', 
                title: 'Meus Chamados', 
                url: '/chamados/meus/', 
                icon: 'fas fa-list' 
            },
            { 
                id: 'acompanhar', 
                title: 'Acompanhar', 
                url: '/chamados/acompanhar/', 
                icon: 'fas fa-eye' 
            }
        ]
    },
    {
        id: 'inventarios',
        title: 'Inventários',
        icon: 'fas fa-clipboard-list',
        url: '#',
        submenu: [
            { 
                id: 'inventario-ativos', 
                title: 'Ativos', 
                url: '/inventarios/ativos/', 
                icon: 'fas fa-laptop' 
            },
            { 
                id: 'inventario-tickets', 
                title: 'Tickets', 
                url: '/inventarios/tickets/', 
                icon: 'fas fa-ticket-alt' 
            }
        ]
    },
    {
        id: 'relatorios',
        title: 'Relatórios',
        icon: 'fas fa-file-alt',
        url: '#',
        submenu: [
            { 
                id: 'relatorio-chamados', 
                title: 'Relatório de Chamados', 
                url: '/relatorios/chamados/', 
                icon: 'fas fa-chart-bar' 
            },
            { 
                id: 'relatorio-ativos', 
                title: 'Relatório de Ativos', 
                url: '/relatorios/ativos/', 
                icon: 'fas fa-laptop' 
            }
        ]
    },
    { type: 'divider' },
    {
        id: 'configuracoes',
        title: 'Configurações',
        icon: 'fas fa-cogs',
        url: '/configuracoes/',
    },
    {
        id: 'suporte',
        title: 'Suporte',
        icon: 'fas fa-life-ring',
        url: '#',
        submenu: [
            { 
                id: 'suporte-email', 
                title: 'suporte@citiesoft.com', 
                url: 'mailto:suporte@citiesoft.com', 
                icon: 'fas fa-envelope' 
            },
            { 
                id: 'base-conhecimento', 
                title: 'Base de Conhecimento', 
                url: '/suporte/base/', 
                icon: 'fas fa-book' 
            }
        ]
    }
];

// Variáveis globais
let uploadedFiles = [];
let selectedCategory = null;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando Sistema de Chamados...');
    
    initializeMenu();
    initializeModal();
    initializeEditor();
    initializeUpload();
    initializeForm();
    
    console.log('✅ Sistema de Chamados inicializado com sucesso!');
});

/* =====================================================
   INICIALIZAÇÃO DO MENU
   ===================================================== */
function initializeMenu() {
    const dynamicMenu = document.getElementById('dynamicMenu');
    if (!dynamicMenu) {
        console.error('❌ Menu dinâmico não encontrado');
        return;
    }

    menuConfig.forEach((item, index) => {
        if (item.type === 'divider') {
            const divider = document.createElement('div');
            divider.className = 'menu-divider';
            dynamicMenu.appendChild(divider);
            return;
        }

        const li = document.createElement('li');
        li.className = 'nav-item';

        if (item.submenu) {
            const a = document.createElement('a');
            a.className = `nav-link menu-toggle ${item.active ? 'active' : ''}`;
            a.href = 'javascript:void(0)';
            a.innerHTML = `<i class="${item.icon}"></i> <span class="menu-text">${item.title}</span>`;
            
            const submenuDiv = document.createElement('div');
            submenuDiv.className = 'submenu';
            submenuDiv.id = `submenu-${item.id}`;

            const submenuUl = document.createElement('ul');
            submenuUl.className = 'nav flex-column';

            item.submenu.forEach(sub => {
                const subLi = document.createElement('li');
                subLi.className = 'nav-item';
                const subA = document.createElement('a');
                subA.className = 'nav-link';
                subA.href = sub.url;
                subA.innerHTML = `<i class="${sub.icon}"></i> <span class="menu-text">${sub.title}</span>`;
                subLi.appendChild(subA);
                submenuUl.appendChild(subLi);
            });

            submenuDiv.appendChild(submenuUl);
            li.appendChild(a);
            li.appendChild(submenuDiv);

            if (item.active) {
                a.classList.add('collapsed');
                submenuDiv.classList.add('show');
            }

            a.addEventListener('click', function(e) {
                e.preventDefault();
                this.classList.toggle('collapsed');
                submenuDiv.classList.toggle('show');
            });
        } else {
            const a = document.createElement('a');
            a.className = `nav-link ${item.active ? 'active' : ''}`;
            a.href = item.url;
            a.innerHTML = `<i class="${item.icon}"></i> <span class="menu-text">${item.title}</span>`;
            li.appendChild(a);
        }

        dynamicMenu.appendChild(li);
    });

    // Menu mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('overlay');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Tem certeza que deseja sair do sistema?')) {
                window.location.href = '/logout/';
            }
        });
    }
}

/* =====================================================
   INICIALIZAÇÃO DO MODAL DE CATEGORIAS
   ===================================================== */
function initializeModal() {
    const categoryTrigger = document.getElementById('categoryTrigger');
    const categoryModal = document.getElementById('categoryModal');
    const modalClose = document.getElementById('modalClose');
    const modalCancel = document.getElementById('modalCancel');
    const modalConfirm = document.getElementById('modalConfirm');
    const categoryInput = document.getElementById('categoria');
    const categoryItems = document.querySelectorAll('.category-item');
    const searchInput = document.getElementById('searchCategory');

    // Abrir modal
    if (categoryTrigger) {
        categoryTrigger.addEventListener('click', function() {
            if (categoryModal) {
                categoryModal.classList.add('show');
                console.log('📂 Modal aberto');
            }
        });
    }

    // Fechar modal - X
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Fechar modal - Cancelar
    if (modalCancel) {
        modalCancel.addEventListener('click', closeModal);
    }

    // Fechar modal ao clicar fora
    if (categoryModal) {
        categoryModal.addEventListener('click', function(e) {
            if (e.target === categoryModal) {
                closeModal();
            }
        });
    }

    // Selecionar categoria
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove seleção anterior
            categoryItems.forEach(i => i.classList.remove('selected'));
            
            // Adiciona seleção atual
            this.classList.add('selected');
            selectedCategory = {
                value: this.getAttribute('data-category'),
                name: this.querySelector('.category-name').textContent
            };
            
            console.log('✅ Categoria selecionada:', selectedCategory);
        });
    });

    // Confirmar seleção
    if (modalConfirm) {
        modalConfirm.addEventListener('click', function() {
            if (selectedCategory) {
                if (categoryInput) {
                    categoryInput.value = selectedCategory.value;
                }
                if (categoryTrigger) {
                    categoryTrigger.querySelector('span').textContent = selectedCategory.name;
                    categoryTrigger.style.color = '#333';
                }
                closeModal();
                console.log('🎯 Categoria confirmada:', selectedCategory);
            } else {
                alert('Por favor, selecione uma categoria.');
            }
        });
    }

    // Busca de categorias
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            categoryItems.forEach(item => {
                const categoryName = item.querySelector('.category-name').textContent.toLowerCase();
                if (categoryName.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    function closeModal() {
        if (categoryModal) {
            categoryModal.classList.remove('show');
            console.log('❌ Modal fechado');
        }
    }
}

/* =====================================================
   INICIALIZAÇÃO DO EDITOR
   ===================================================== */
function initializeEditor() {
    const descricaoTextarea = document.getElementById('descricao');
    if (!descricaoTextarea) return;

    // Botão Negrito
    document.getElementById('btnBold')?.addEventListener('click', function() {
        wrapSelectedText('**', '**');
    });

    // Botão Itálico
    document.getElementById('btnItalic')?.addEventListener('click', function() {
        wrapSelectedText('*', '*');
    });

    // Botão Sublinhado
    document.getElementById('btnUnderline')?.addEventListener('click', function() {
        wrapSelectedText('__', '__');
    });

    // Botão Lista
    document.getElementById('btnList')?.addEventListener('click', function() {
        const start = descricaoTextarea.selectionStart;
        const end = descricaoTextarea.selectionEnd;
        const text = descricaoTextarea.value;
        const selected = text.substring(start, end);
        
        if (selected) {
            const lines = selected.split('\n');
            const listText = lines.map(line => line ? `• ${line}` : '').join('\n');
            descricaoTextarea.setRangeText(listText, start, end, 'select');
        }
        descricaoTextarea.focus();
    });

    function wrapSelectedText(prefix, suffix) {
        const start = descricaoTextarea.selectionStart;
        const end = descricaoTextarea.selectionEnd;
        const selected = descricaoTextarea.value.substring(start, end);
        
        if (selected) {
            descricaoTextarea.setRangeText(prefix + selected + suffix, start, end, 'select');
        }
        descricaoTextarea.focus();
    }
}

/* =====================================================
   INICIALIZAÇÃO DO UPLOAD
   ===================================================== */
function initializeUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('arquivos');
    const btnEscolherArquivo = document.getElementById('btnEscolherArquivo');
    const fileList = document.getElementById('fileList');

    // Abrir seletor de arquivos
    if (btnEscolherArquivo && fileInput) {
        btnEscolherArquivo.addEventListener('click', function() {
            fileInput.click();
        });
    }

    // Seleção de arquivos
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            handleFiles(e.target.files);
        });
    }

    // Drag and drop
    if (uploadArea) {
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', function() {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            handleFiles(e.dataTransfer.files);
        });
    }

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (file.size > 60 * 1024 * 1024) {
                alert(`O arquivo "${file.name}" excede o tamanho máximo de 60 MB.`);
                return;
            }
            
            uploadedFiles.push(file);
            addFileToList(file);
        });
    }

    function addFileToList(file) {
        if (!fileList) return;

        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileSize = formatFileSize(file.size);
        const fileIcon = getFileIcon(file.name);
        
        fileItem.innerHTML = `
            <div class="file-info">
                <i class="${fileIcon} file-icon"></i>
                <div class="file-details">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${fileSize}</div>
                </div>
            </div>
            <button type="button" class="file-remove" data-filename="${file.name}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        fileList.appendChild(fileItem);
        
        // Evento de remoção
        const removeBtn = fileItem.querySelector('.file-remove');
        removeBtn.addEventListener('click', function() {
            removeFile(file.name);
        });
    }

    function removeFile(fileName) {
        uploadedFiles = uploadedFiles.filter(f => f.name !== fileName);
        const fileItems = document.querySelectorAll('.file-item');
        
        fileItems.forEach(item => {
            if (item.querySelector('.file-name').textContent === fileName) {
                item.remove();
            }
        });
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function getFileIcon(fileName) {
        const ext = fileName.split('.').pop().toLowerCase();
        const iconMap = {
            'pdf': 'fas fa-file-pdf',
            'doc': 'fas fa-file-word', 'docx': 'fas fa-file-word',
            'xls': 'fas fa-file-excel', 'xlsx': 'fas fa-file-excel',
            'ppt': 'fas fa-file-powerpoint', 'pptx': 'fas fa-file-powerpoint',
            'jpg': 'fas fa-file-image', 'jpeg': 'fas fa-file-image', 'png': 'fas fa-file-image', 'gif': 'fas fa-file-image',
            'zip': 'fas fa-file-archive', 'rar': 'fas fa-file-archive',
            'txt': 'fas fa-file-alt'
        };
        return iconMap[ext] || 'fas fa-file';
    }
}

/* =====================================================
   INICIALIZAÇÃO DO FORMULÁRIO
   ===================================================== */
function initializeForm() {
    const chamadoForm = document.getElementById('chamadoForm');
    const successMessage = document.getElementById('successMessage');
    const btnLimpar = document.getElementById('btnLimpar');

    if (chamadoForm) {
        chamadoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validações
            const categoria = document.getElementById('categoria').value;
            const especialidade = document.getElementById('especialidade').value;
            const titulo = document.getElementById('titulo').value.trim();
            const descricao = document.getElementById('descricao').value.trim();
            
            if (!categoria) {
                alert('Por favor, selecione uma categoria.');
                return;
            }
            
            if (!especialidade) {
                alert('Por favor, selecione o tipo de especialidade.');
                return;
            }
            
            if (!titulo) {
                alert('Por favor, preencha o título do chamado.');
                return;
            }
            
            if (!descricao) {
                alert('Por favor, descreva o problema ou solicitação.');
                return;
            }
            
            enviarChamado();
        });
    }

    function enviarChamado() {
        const submitBtn = chamadoForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Simulação de envio
        setTimeout(() => {
            if (successMessage) {
                successMessage.classList.add('show');
            }
            
            limparFormulario();
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            setTimeout(() => {
                if (successMessage) {
                    successMessage.classList.remove('show');
                }
            }, 5000);
        }, 2000);
    }

    function limparFormulario() {
        if (chamadoForm) {
            chamadoForm.reset();
        }
        
        // Limpar categoria
        const categoryInput = document.getElementById('categoria');
        const categoryTrigger = document.getElementById('categoryTrigger');
        
        if (categoryInput) categoryInput.value = '';
        if (categoryTrigger) {
            categoryTrigger.querySelector('span').textContent = 'Selecione uma categoria...';
            categoryTrigger.style.color = '';
        }
        
        selectedCategory = null;
        
        // Limpar arquivos
        uploadedFiles = [];
        const fileList = document.getElementById('fileList');
        if (fileList) fileList.innerHTML = '';
        
        // Limpar seleção no modal
        const categoryItems = document.querySelectorAll('.category-item');
        categoryItems.forEach(item => item.classList.remove('selected'));
    }

    if (btnLimpar) {
        btnLimpar.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja limpar todos os campos?')) {
                limparFormulario();
            }
        });
    }
}

// Adicionar CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// Fim do script_chamados.js AMEM RSRSRSRS




