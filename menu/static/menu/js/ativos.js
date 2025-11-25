// JAVASCRIPT PARA MÓDULO DE ATIVOS
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do modal de categoria
    const categoryTrigger = document.getElementById('categoryTrigger');
    const categoryModal = document.getElementById('categoryModal');
    const modalClose = document.getElementById('modalClose');
    const modalCancel = document.getElementById('modalCancel');
    const modalConfirm = document.getElementById('modalConfirm');
    const searchCategory = document.getElementById('searchCategory');
    const categoryItems = document.querySelectorAll('.category-item');
    const categoriaInput = document.getElementById('categoria');
    
    // Botões do formulário
    const btnLimparAtivo = document.getElementById('btnLimparAtivo');
    const btnSalvarAtivo = document.getElementById('btnSalvarAtivo');
    const formAtivo = document.getElementById('formAtivo');
    
    let selectedCategory = null;

    // MODAL DE CATEGORIA
    if (categoryTrigger) {
        categoryTrigger.addEventListener('click', function() {
            categoryModal.style.display = 'block';
            setTimeout(() => {
                if (searchCategory) searchCategory.focus();
            }, 100);
        });
    }

    function closeCategoryModal() {
        categoryModal.style.display = 'none';
        selectedCategory = null;
        categoryItems.forEach(item => item.classList.remove('selected'));
        if (searchCategory) searchCategory.value = '';
        categoryItems.forEach(item => item.style.display = 'block');
    }

    if (modalClose) modalClose.addEventListener('click', closeCategoryModal);
    if (modalCancel) modalCancel.addEventListener('click', closeCategoryModal);

    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            categoryItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            selectedCategory = this.getAttribute('data-category');
        });
    });

    if (modalConfirm) {
        modalConfirm.addEventListener('click', function() {
            if (selectedCategory) {
                categoriaInput.value = selectedCategory;
                categoryTrigger.querySelector('span').textContent = selectedCategory;
                closeCategoryModal();
            } else {
                alert('Por favor, selecione uma categoria.');
            }
        });
    }

    if (searchCategory) {
        searchCategory.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            categoryItems.forEach(item => {
                const categoryName = item.querySelector('.category-name').textContent.toLowerCase();
                if (categoryName.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // VALIDAÇÃO E MANIPULAÇÃO DO FORMULÁRIO
    if (btnLimparAtivo) {
        btnLimparAtivo.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja limpar todos os dados do formulário?')) {
                formAtivo.reset();
                categoriaInput.value = '';
                categoryTrigger.querySelector('span').textContent = 'Selecione uma categoria...';
                
                const errorFields = formAtivo.querySelectorAll('.error');
                errorFields.forEach(field => field.classList.remove('error'));
            }
        });
    }

    const requiredFields = formAtivo.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
        
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('error');
            }
        });
    });

    const valorCompraField = document.querySelector('input[name="valor_compra"]');
    if (valorCompraField) {
        valorCompraField.addEventListener('blur', function() {
            let value = this.value.replace(/\D/g, '');
            if (value) {
                value = (parseInt(value) / 100).toFixed(2);
                this.value = 'R$ ' + value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
        });
    }

    if (formAtivo) {
        formAtivo.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            let firstErrorField = null;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    if (!firstErrorField) firstErrorField = field;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
                
                if (firstErrorField) {
                    firstErrorField.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
                return;
            }
            
            const originalText = btnSalvarAtivo.innerHTML;
            btnSalvarAtivo.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
            btnSalvarAtivo.disabled = true;
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === categoryModal) {
            closeCategoryModal();
        }
    });

    console.log('Módulo de ativos inicializado');
});