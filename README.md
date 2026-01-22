# 🛠️ Sistema Help-Desk - Gestão de Chamados

Este é um sistema completo de Help Desk desenvolvido para facilitar a gestão de tickets, atendimento ao cliente e organização de base de conhecimento. O projeto foi construído utilizando **Python** e o framework **Django**.

---

## 🚀 Funcionalidades Principais

* **Gestão de Tickets**: Criação, edição e acompanhamento de chamados.
* **Sistema de Autenticação**: Login seguro com validação e níveis de acesso.
* **Base de Conhecimento (FAQ)**: Área para perguntas frequentes e tutoriais.
* **Interface Responsiva**: Design otimizado para diferentes tamanhos de tela.
* **Integração com TinyMCE**: Editor de texto rico para descrições detalhadas nos chamados.
* **Histórico de Interações**: Registro de mensagens e atualizações de status em tempo real.

---

## 🛠️ Tecnologias Utilizadas

* **Back-end**: Python 3.x, Django.
* **Front-end**: HTML5, CSS3, JavaScript.
* **Banco de Dados**: SQLite (Desenvolvimento) / PostgreSQL (Produção).
* **Ambiente**: Virtualenv para isolamento de dependências.

---

## 🔧 Como Instalar e Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/ayrton01234/Sistema-Help-desk.git](https://github.com/ayrton01234/Sistema-Help-desk.git)
    cd Sistema-Help-desk
    ```

2.  **Crie e ative o ambiente virtual:**
    ```bash
    python -m venv venv
    # No Windows:
    .\venv\Scripts\activate
    ```

3.  **Instale as dependências:**
    ```bash
    pip install -r requisitos.txt
    ```

4.  **Execute as migrações do banco de dados:**
    ```bash
    python gerenciar.py makemigrations
    python gerenciar.py migrate
    ```

5.  **Inicie o servidor:**
    ```bash
    python gerenciar.py runserver
    ```
    O sistema estará disponível em: `http://127.0.0.1:8000`

---

## 👥 Colaboradores
* [Ayrton](https://github.com/ayrton01234)
* [Thiago Leis](https://github.com/ThiagoSLeis)


