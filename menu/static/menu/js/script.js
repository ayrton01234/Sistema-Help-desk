// ===== CONFIGURAÇÃO DO MENU =====
// Array de objetos contendo a estrutura completa do menu
// Cada item pode ter submenus para organização hierárquica
const menuConfig = [
    {
        id: 'painel',
        title: 'Painel Principal',
        icon: 'fas fa-tachometer-alt',
        url: 'http://127.0.0.1:8000/menu/',
        active: true // Item ativo/selecionado
    },
    {
        id: 'inventarios',
        title: 'Inventários',
        icon: 'fas fa-clipboard-list',
        url: '#',
        submenu: [ // Subitens deste menu
            { id: 'inventario-ativos', title: 'Ativos', url: '#', icon: 'fas fa-laptop' },
            { id: 'inventario-tickets', title: 'Tickets', url: '#', icon: 'fas fa-ticket-alt' },
            { id: 'inventario-chamados', title: 'Chamados (OCS)', url: '#', icon: 'fas fa-headset' }
        ]
    },
    {
        id: 'relatorios',
        title: 'Relatórios',
        icon: 'fas fa-file-alt',
        url: '#',
        submenu: [
            { id: 'relatorio-ativos', title: 'Relatório de Ativos', url: '#', icon: 'fas fa-laptop' },
            { id: 'relatorio-tickets', title: 'Relatório de Tickets', url: '#', icon: 'fas fa-ticket-alt' },
            { id: 'relatorio-usuarios', title: 'Relatório de Usuários', url: '#', icon: 'fas fa-users' },
            { id: 'relatorio-analise', title: 'Análise e Métricas', url: '#', icon: 'fas fa-chart-pie' }
        ]
    },
    {
        id: 'cadastros',
        title: 'Cadastros',
        icon: 'fas fa-edit',
        url: '#',
        submenu: [
            { id: 'cadastro-usuarios', title: 'Usuários', url: '#', icon: 'fas fa-user-cog' },
            { id: 'cadastro-clientes', title: 'Clientes', url: '#', icon: 'fas fa-user' },
            { id: 'cadastro-ativos', title: 'Ativos', url: '#', icon: 'fas fa-laptop' }
        ]
    },
    { type: 'divider' }, // Divisor visual no menu
    {
        id: 'configuracoes',
        title: 'Configurações',
        icon: 'fas fa-cogs',
        url: '#',
        submenu: [
            { id: 'config-geral', title: 'Configurações Gerais', url: '#', icon: 'fas fa-sliders-h' },
            { id: 'config-perfis', title: 'Perfis de Acesso', url: '#', icon: 'fas fa-user-shield' }
        ]
    },
    {
        id: 'base-conhecimento',
        title: 'Base de Conhecimento',
        icon: 'fas fa-book',
        url: '#',
        submenu: [
            { id: 'dicas-manutencao', title: 'Dicas de Manutenção', url: '#', icon: 'fas fa-tools' },
            { id: 'glossario', title: 'Glossário', url: '#', icon: 'fas fa-book-open' },
            { id: 'dicionario-software', title: 'Dicionário de Software', url: '#', icon: 'fas fa-laptop-code' },
            { id: 'artigos', title: 'Artigos', url: '#', icon: 'fas fa-newspaper' }
        ]
    },
    {
        id: 'suporte',
        title: 'Suporte',
        icon: 'fas fa-life-ring',
        url: '#',
        submenu: [
            { id: 'suporte-email', title: 'suporte@citiesoft.com', url: 'mailto:suporte@citiesoft.com', icon: 'fas fa-envelope' }
        ]
    }
];

// ===== CONSTRUÇÃO DINÂMICA DO MENU =====
/**
 * Função que constrói o menu dinamicamente baseado na configuração
 * Cria elementos HTML para cada item do menu
 */
function buildDynamicMenu() {
    const dynamicMenu = document.getElementById('dynamicMenu');
    
    // Limpa o menu existente (caso haja)
    dynamicMenu.innerHTML = '';
    
    // Itera sobre cada item da configuração do menu
    menuConfig.forEach((item, index) => {
        // Cria divisores entre seções do menu
        if (item.type === 'divider') {
            const divider = document.createElement('div');
            divider.className = 'menu-divider';
            dynamicMenu.appendChild(divider);
            return; // Sai da iteração atual
        }

        // Cria elemento de lista para cada item do menu
        const li = document.createElement('li');
        li.className = 'nav-item';

        // Verifica se o item tem submenu
        if (item.submenu) {
            // Cria link principal com toggle
            const a = document.createElement('a');
            a.className = `nav-link menu-toggle ${item.active ? 'active' : ''}`;
            a.href = 'javascript:void(0)'; // Previne navegação
            a.innerHTML = `<i class="${item.icon}"></i> <span class="menu-text">${item.title}</span>`;
            
            // Cria container do submenu
            const submenuDiv = document.createElement('div');
            submenuDiv.className = 'submenu';
            submenuDiv.id = `submenu-${item.id}`;

            // Cria lista de subitens
            const submenuUl = document.createElement('ul');
            submenuUl.className = 'nav flex-column';

            // Adiciona cada subitem
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

            // Monta a estrutura completa
            submenuDiv.appendChild(submenuUl);
            li.appendChild(a);
            li.appendChild(submenuDiv);

            // Adiciona evento de clique para expandir/recolher submenu
            a.addEventListener('click', () => {
                a.classList.toggle('collapsed');
                submenuDiv.classList.toggle('show');
            });
        } else {
            // Cria item de menu simples (sem submenu)
            const a = document.createElement('a');
            a.className = `nav-link ${item.active ? 'active' : ''}`;
            a.href = item.url;
            a.innerHTML = `<i class="${item.icon}"></i> <span class="menu-text">${item.title}</span>`;
            li.appendChild(a);
        }

        // Aplica delay de animação progressivo para cada item
        const link = li.querySelector('.nav-link');
        if (link) {
            link.style.transitionDelay = `${0.1 + (index * 0.05)}s`;
        }

        // Adiciona item ao menu
        dynamicMenu.appendChild(li);
    });
}

// ===== CONTROLE DO MENU MOBILE =====
/**
 * Configura os eventos para o menu mobile
 * Controla a abertura/fechamento da sidebar em dispositivos móveis
 */
function setupMobileMenu() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('overlay');

    if (sidebarToggle) {
        // Evento para abrir/fechar menu
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        // Evento para fechar menu ao clicar no overlay
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
}


// ===== BOTÃO DE LOGOUT =====
// ===== BOTÃO DE LOGOUT =====
function setupLogoutButton() {
    const logoutButton = document.getElementById('logoutButton');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (confirm('Tem certeza que deseja sair do sistema?')) {
                // Fallback - use a URL que você sabe que funciona
                window.location.href = '/';  // ← Tente esta URL primeiro
                // Se não funcionar, tente: window.location.href = '/login/';
            }
        });
    }
}

// ===== DATA ATUAL =====
/**
 * Atualiza o elemento com a data atual formatada
 * Exemplo: "terça-feira, 5 de novembro de 2024"
 */
function updateCurrentDate() {
    const currentDateElement = document.getElementById('currentDate');
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    currentDateElement.textContent = new Date().toLocaleDateString('pt-BR', options);
}

// ===== ANIMAÇÃO DE CONTADORES =====
/**
 * Anima um valor numérico de um início até um fim
 * @param {string} id - ID do elemento HTML
 * @param {number} start - Valor inicial
 * @param {number} end - Valor final
 * @param {number} duration - Duração da animação em milissegundos
 */
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16); // Calcula incremento por frame (60fps)
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        obj.textContent = Math.floor(current);
    }, 16); // Aproximadamente 60 frames por segundo
}

// ===== INICIALIZAÇÃO DOS GRÁFICOS =====
/**
 * Configura e inicializa os gráficos usando Chart.js
 * Cria gráficos de pizza e barras para visualização de dados
 */
function initializeCharts() {
    // Gráfico de Ativos por Status (Pizza)
    const ctxAtivos = document.getElementById('ativosChart').getContext('2d');
    new Chart(ctxAtivos, {
        type: 'doughnut', // Tipo de gráfico: rosquinha
        data: {
            labels: ['Ativos', 'Em Manutenção', 'Desativados', 'Reserva'],
            datasets: [{
                data: [198, 15, 22, 12],
                backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#17a2b8'],
                borderWidth: 3,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 12 }
                    }
                }
            }
        }
    });

    // Gráfico de Tickets por Prioridade (Barras)
    const ctxTickets = document.getElementById('ticketsChart').getContext('2d');
    new Chart(ctxTickets, {
        type: 'bar',
        data: {
            labels: ['Baixa', 'Normal', 'Alta', 'Urgente'],
            datasets: [{
                label: 'Tickets',
                data: [8, 15, 7, 4],
                backgroundColor: ['#28a745', '#00A6FF', '#ffc107', '#dc3545'],
                borderRadius: 8 // Bordas arredondadas nas barras
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false } // Oculta legenda
            },
            scales: {
                y: {
                    beginAtZero: true, // Começa do zero
                    ticks: { stepSize: 5 } // Intervalo de 5 em 5
                }
            }
        }
    });
}

// ===== PREENCHIMENTO DAS TABELAS =====
/**
 * Preenche as tabelas com dados de exemplo
 * Em uma aplicação real, esses dados viriam de uma API
 */
function populateTables() {
    // Dados para tabela de Tickets
    const ticketsData = [
        { id: '#1234', titulo: 'Impressora não funciona', solicitante: 'João Silva', prioridade: 'Alta', status: 'Aberto', data: '03/11/2025' },
        { id: '#1233', titulo: 'Acesso à rede lento', solicitante: 'Maria Santos', prioridade: 'Normal', status: 'Em Andamento', data: '03/11/2025' },
        { id: '#1232', titulo: 'Software travando', solicitante: 'Pedro Costa', prioridade: 'Urgente', status: 'Aberto', data: '02/11/2025' },
        { id: '#1231', titulo: 'Solicitar novo mouse', solicitante: 'Ana Lima', prioridade: 'Baixa', status: 'Resolvido', data: '02/11/2025' },
        { id: '#1230', titulo: 'Email não sincroniza', solicitante: 'Carlos Souza', prioridade: 'Normal', status: 'Em Andamento', data: '01/11/2025' }
    ];

    const ticketsTable = document.getElementById('ticketsTable');
    ticketsData.forEach(ticket => {
        // Define classes CSS baseadas na prioridade e status
        const priorityClass = ticket.prioridade === 'Urgente' ? 'danger' : 
                              ticket.prioridade === 'Alta' ? 'warning' : 
                              ticket.prioridade === 'Normal' ? 'info' : 'success';
        
        const statusClass = ticket.status === 'Resolvido' ? 'success' : 
                           ticket.status === 'Em Andamento' ? 'warning' : 'danger';

        // Cria linha da tabela
        const row = `
            <tr>
                <td><strong>${ticket.id}</strong></td>
                <td>${ticket.titulo}</td>
                <td>${ticket.solicitante}</td>
                <td><span class="status-badge ${priorityClass}">${ticket.prioridade}</span></td>
                <td><span class="status-badge ${statusClass}">${ticket.status}</span></td>
                <td><i class="far fa-calendar me-1"></i>${ticket.data}</td>
            </tr>
        `;
        ticketsTable.innerHTML += row;
    });

    // Dados para tabela de Ativos
    const ativosData = [
        { patrimonio: 'NB-2025-001', tipo: 'Notebook', departamento: 'TI', status: 'Ativo' },
        { patrimonio: 'DT-2025-045', tipo: 'Desktop', departamento: 'Financeiro', status: 'Ativo' },
        { patrimonio: 'MN-2025-012', tipo: 'Monitor', departamento: 'RH', status: 'Ativo' },
        { patrimonio: 'NB-2024-089', tipo: 'Notebook', departamento: 'Vendas', status: 'Manutenção' },
        { patrimonio: 'IM-2025-003', tipo: 'Impressora', departamento: 'Admin', status: 'Ativo' }
    ];

    const ativosTable = document.getElementById('ativosTable');
    ativosData.forEach(ativo => {
        const statusClass = ativo.status === 'Ativo' ? 'success' : 'warning';
        const row = `
            <tr>
                <td><strong>${ativo.patrimonio}</strong></td>
                <td><i class="fas fa-laptop me-2"></i>${ativo.tipo}</td>
                <td>${ativo.departamento}</td>
                <td><span class="status-badge ${statusClass}">${ativo.status}</span></td>
            </tr>
        `;
        ativosTable.innerHTML += row;
    });

    // Dados para tabela de Chamados OCS
    const chamadosData = [
        { id: 'OCS-567', tipo: 'Hardware', tecnico: 'Marcos Tech', status: 'Em Atendimento' },
        { id: 'OCS-566', tipo: 'Software', tecnico: 'Paula Lima', status: 'Concluído' },
        { id: 'OCS-565', tipo: 'Rede', tecnico: 'Roberto Net', status: 'Pendente' },
        { id: 'OCS-564', tipo: 'Hardware', tecnico: 'Marcos Tech', status: 'Em Atendimento' },
        { id: 'OCS-563', tipo: 'Instalação', tecnico: 'Paula Lima', status: 'Concluído' }
    ];

    const chamadosTable = document.getElementById('chamadosTable');
    chamadosData.forEach(chamado => {
        const statusClass = chamado.status === 'Concluído' ? 'success' : 
                           chamado.status === 'Em Atendimento' ? 'warning' : 'danger';
        
        const row = `
            <tr>
                <td><strong>${chamado.id}</strong></td>
                <td><i class="fas fa-tools me-2"></i>${chamado.tipo}</td>
                <td>${chamado.tecnico}</td>
                <td><span class="status-badge ${statusClass}">${chamado.status}</span></td>
            </tr>
        `;
        chamadosTable.innerHTML += row;
    });
}

// ===== NOTIFICAÇÕES =====
/**
 * Preenche a lista de notificações
 * Cada notificação tem ícone, cor e texto específicos
 */
function populateNotifications() {
    const notifications = [
        { time: 'Há 5 min', text: 'Novo ticket #1234: Impressora não funciona', icon: 'ticket-alt', color: '#dc3545' },
        { time: 'Há 15 min', text: 'Ativo NB-2025-001 cadastrado com sucesso', icon: 'laptop', color: '#28a745' },
        { time: 'Há 1 hora', text: 'Chamado OCS-567 em atendimento', icon: 'headset', color: '#ffc107' },
        { time: 'Há 2 horas', text: 'Backup do sistema concluído', icon: 'check-circle', color: '#17a2b8' },
        { time: 'Há 3 horas', text: '15 ativos próximos da garantia vencer', icon: 'exclamation-triangle', color: '#ff9800' }
    ];

    const notificationsList = document.getElementById('notificationsList');
    notifications.forEach(notif => {
        const item = document.createElement('div');
        item.className = 'notification-item';
        item.innerHTML = `
            <div class="d-flex align-items-start">
                <i class="fas fa-${notif.icon} me-3" style="color: ${notif.color}; font-size: 1.3rem; margin-top: 3px;"></i>
                <div style="flex: 1;">
                    <div class="notification-time">
                        <i class="far fa-clock"></i> ${notif.time}
                    </div>
                    <p class="notification-text">${notif.text}</p>
                </div>
            </div>
        `;
        notificationsList.appendChild(item);
    });
}

// ===== EVENTOS DE CLIQUE NOS CARDS =====
/**
 * Adiciona interatividade aos cards de estatística
 * Cada card exibe um alerta quando clicado
 */
function setupCardClickEvents() {
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', function() {
            const text = this.querySelector('p').textContent;
            alert(`Visualizar detalhes: ${text}`);
        });
    });
}

// ===== PREVENIR CACHE APÓS LOGOUT =====
/**
 * Previne problemas de cache quando usuário volta após logout
 * Recarrega a página se foi carregada do cache
 */
function setupPageShowEvent() {
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    });
}

// ===== INICIALIZAÇÃO DA APLICAÇÃO =====
/**
 * Função principal que inicializa toda a aplicação
 * É executada quando a página termina de carregar
 */
function initializeApplication() {
    // Constrói o menu dinamicamente
    buildDynamicMenu();
    
    // Configura menu mobile
    setupMobileMenu();
    
    // Configura botão de logout
    setupLogoutButton();
    
    // Atualiza data atual
    updateCurrentDate();
    
    // Anima os contadores dos cards
    animateValue('activosCount', 0, 247, 1500);
    animateValue('ativosAtivosCount', 0, 198, 1500);
    animateValue('ativosManutencaoCount', 0, 15, 1500);
    animateValue('ticketsAbertosCount', 0, 34, 1500);
    animateValue('chamadosCount', 0, 12, 1500);
    animateValue('usuariosCount', 0, 89, 1500);
    
    // Inicializa gráficos
    initializeCharts();
    
    // Preenche tabelas com dados
    populateTables();
    
    // Preenche notificações
    populateNotifications();
    
    // Configura eventos de clique nos cards
    setupCardClickEvents();
    
    // Configura evento para prevenir problemas de cache
    setupPageShowEvent();
    
    console.log('Dashboard Citiesoft inicializado com sucesso!');
}

// ===== EVENTO DE CARREGAMENTO DA PÁGINA =====
// Espera o DOM estar completamente carregado antes de inicializar
document.addEventListener('DOMContentLoaded', initializeApplication);

// Alternativa: também executa quando a janela termina de carregar
window.addEventListener('load', initializeApplication);

// Fim do script.js começando o criação do menu dinâmico e outras funcionalidades da dashboard.

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do formulário
    const form = document.getElementById('chamadoForm');
    const descricao = document.getElementById('descricao');
    const btnBold = document.getElementById('btnBold');
    const btnItalic = document.getElementById('btnItalic');
    const btnEscolherArquivo = document.getElementById('btnEscolherArquivo');
    const inputArquivos = document.getElementById('arquivos');
    const uploadArea = document.getElementById('uploadArea');
    const fileList = document.getElementById('fileList');
    const successMessage = document.getElementById('successMessage');
    
    // Elementos da modal
    const categoryTrigger = document.getElementById('categoryTrigger');
    const categoryModal = document.getElementById('categoryModal');
    const modalCancel = document.getElementById('modalCancel');
    const modalConfirm = document.getElementById('modalConfirm');
    const categoryItems = document.querySelectorAll('.category-item');
    const searchInput = document.querySelector('.search-input');
    
    // Estado dos botões do editor
    let isBoldActive = false;
    let isItalicActive = false;
    
    // Estado da modal
    let selectedCategory = null;
    let selectedCategoryName = null;
    
    // Abrir modal de categoria
    categoryTrigger.addEventListener('click', function() {
        categoryModal.style.display = 'flex';
        selectedCategory = null;
        // Remover seleção anterior
        categoryItems.forEach(item => item.classList.remove('selected-category'));
    });
    
    // Fechar modal ao clicar no cancelar
    modalCancel.addEventListener('click', function() {
        categoryModal.style.display = 'none';
    });
    
    // Fechar modal ao clicar fora do conteúdo
    window.addEventListener('click', function(event) {
        if (event.target === categoryModal) {
            categoryModal.style.display = 'none';
        }
    });
    
    // Selecionar categoria na modal
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover seleção anterior
            categoryItems.forEach(i => i.classList.remove('selected-category'));
            
            // Adicionar seleção atual
            this.classList.add('selected-category');
            selectedCategory = this.getAttribute('data-category');
            selectedCategoryName = this.querySelector('.category-name').textContent;
        });
    });
    
    // Confirmar seleção da categoria
    modalConfirm.addEventListener('click', function() {
        if (!selectedCategory) {
            alert('Por favor, selecione uma categoria.');
            return;
        }
        
        // Atualizar o botão de trigger com a categoria selecionada
        categoryTrigger.textContent = selectedCategoryName;
        // Atualizar o input hidden com o valor da categoria
        document.getElementById('categoria').value = selectedCategory;
        
        // Fechar a modal
        categoryModal.style.display = 'none';
    });
    
    // Pesquisar categorias na modal
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        categoryItems.forEach(item => {
            const categoryName = item.querySelector('.category-name').textContent.toLowerCase();
            
            if (categoryName.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // Editor de texto simples
    btnBold.addEventListener('click', function() {
        document.execCommand('bold', false, null);
        isBoldActive = !isBoldActive;
        updateToolbarButtons();
        descricao.focus();
    });
    
    btnItalic.addEventListener('click', function() {
        document.execCommand('italic', false, null);
        isItalicActive = !isItalicActive;
        updateToolbarButtons();
        descricao.focus();
    });
    
    // Atualizar estado visual dos botões do editor
    function updateToolbarButtons() {
        btnBold.classList.toggle('active', isBoldActive);
        btnItalic.classList.toggle('active', isItalicActive);
    }
    
    // Upload de arquivos
    btnEscolherArquivo.addEventListener('click', function() {
        inputArquivos.click();
    });
    
    inputArquivos.addEventListener('change', function() {
        handleFiles(this.files);
    });
    
    // Drag and drop
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = '#3498db';
        uploadArea.style.backgroundColor = '#f0f8ff';
    });
    
    uploadArea.addEventListener('dragleave', function() {
        uploadArea.style.borderColor = '#ddd';
        uploadArea.style.backgroundColor = '#f5f5f5';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = '#ddd';
        uploadArea.style.backgroundColor = '#f5f5f5';
        
        const files = e.dataTransfer.files;
        inputArquivos.files = files;
        handleFiles(files);
    });
    
    // Função para processar arquivos
    function handleFiles(files) {
        fileList.innerHTML = '';
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            // Verificar tamanho do arquivo (60 MB)
            if (file.size > 60 * 1024 * 1024) {
                alert(`O arquivo "${file.name}" excede o limite de 60 MB.`);
                continue;
            }
            
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            const fileName = document.createElement('span');
            fileName.textContent = file.name;
            
            const fileSize = document.createElement('span');
            fileSize.textContent = formatFileSize(file.size);
            fileSize.className = 'file-size';
            
            const fileInfo = document.createElement('div');
            fileInfo.appendChild(fileName);
            fileInfo.appendChild(fileSize);
            
            const removeBtn = document.createElement('span');
            removeBtn.className = 'remove-file';
            removeBtn.textContent = '✕';
            removeBtn.title = 'Remover arquivo';
            removeBtn.addEventListener('click', function() {
                fileItem.remove();
                updateFileInput();
            });
            
            fileItem.appendChild(fileInfo);
            fileItem.appendChild(removeBtn);
            fileList.appendChild(fileItem);
        }
    }
    
    // Formatar tamanho do arquivo para exibição
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Atualizar input de arquivos após remoção
    function updateFileInput() {
        const dt = new DataTransfer();
        const fileItems = fileList.querySelectorAll('.file-item');
        
        for (let i = 0; i < inputArquivos.files.length; i++) {
            const file = inputArquivos.files[i];
            let fileExists = false;
            
            for (let j = 0; j < fileItems.length; j++) {
                if (fileItems[j].querySelector('span').textContent === file.name) {
                    fileExists = true;
                    break;
                }
            }
            
            if (fileExists) {
                dt.items.add(file);
            }
        }
        
        inputArquivos.files = dt.files;
    }
    
    // Validação do formulário antes do envio
    function validarFormulario() {
        const camposObrigatorios = [
            { elemento: document.getElementById('categoria'), nome: 'Categoria' },
            { elemento: document.getElementById('especialidade'), nome: 'Tipo de Especialidade' },
            { elemento: document.getElementById('titulo'), nome: 'Título' },
            { elemento: document.getElementById('descricao'), nome: 'Descrição' }
        ];
        
        for (const campo of camposObrigatorios) {
            if (!campo.elemento.value.trim()) {
                alert(`Por favor, preencha o campo "${campo.nome}".`);
                if (campo.elemento.id === 'categoria') {
                    categoryTrigger.focus();
                } else {
                    campo.elemento.focus();
                }
                return false;
            }
        }
        
        return true;
    }
    
    // Envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação do formulário
        if (!validarFormulario()) {
            return;
        }
        
        // Coletar dados do formulário
        const formData = {
            categoria: document.getElementById('categoria').value,
            especialidade: document.getElementById('especialidade').value,
            observadores: document.getElementById('observadores').value,
            localizacao: document.getElementById('localizacao').value,
            titulo: document.getElementById('titulo').value,
            descricao: document.getElementById('descricao').value,
            arquivos: inputArquivos.files
        };
        
        // Simulação de envio (substituir por chamada AJAX real)
        console.log('Dados do chamado:', formData);
        
        // Mostrar mensagem de sucesso
        successMessage.style.display = 'block';
        
        // Rolar para o topo para mostrar a mensagem
        window.scrollTo(0, 0);
        
        // Limpar formulário após 2 segundos
        setTimeout(function() {
            form.reset();
            fileList.innerHTML = '';
            isBoldActive = false;
            isItalicActive = false;
            updateToolbarButtons();
            successMessage.style.display = 'none';
            // Resetar o botão de categoria
            categoryTrigger.textContent = 'Selecione uma categoria...';
        }, 3000);
    });
});

// ESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSFim do script.js para o formulário de abertura de chamado.
// ===== MODO ESCURO / MODO CLARO =====
// Ativa/desativa o tema e salva no localStorage

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggleTheme");

    // Carregar tema salvo
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        if (toggleBtn) toggleBtn.innerHTML = `<i class="fa-solid fa-sun"></i> <span>Modo Claro</span>`;
    }

    // Alternar tema ao clicar
    if (toggleBtn) {
        toggleBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                localStorage.setItem("theme", "dark");
                toggleBtn.innerHTML = `<i class="fa-solid fa-sun"></i> <span>Modo Claro</span>`;
            } else {
                localStorage.setItem("theme", "light");
                toggleBtn.innerHTML = `<i class="fa-solid fa-moon"></i> <span>Modo Escuro</span>`;
            }
        });
    }
});
// Fim do script.js para o modo escuro/claro.


