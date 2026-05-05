## 📘 LabMaker – Sistema de Agendamento e Kanban

Sistema web desenvolvido para gerenciamento de agendamentos e solicitações em formato Kanban, com controle de usuários e administradores.

---
## 🚀 Funcionalidades

## 👤 Usuário comum
- Cadastro e login
- Criar solicitações com descrição e anexo
- Visualizar status das solicitações (Kanban)
- Realizar agendamentos de horários disponíveis

## 🛠️ Administrador
- Login com privilégios administrativos
- Gerenciar horários disponíveis (slots)
- Visualizar usuários agendados
- Excluir agendamentos
- Gerenciar solicitações no Kanban (mudar status)

---
## 🧱 Tecnologias utilizadas
1. Frontend:
- HTML5
- CSS3 (TailwindCSS)
- JavaScript (Vanilla JS)
2. Backend:
- PHP
- Banco de Dados:
- MySQL

---
## 📁 Estrutura do projeto
```bash
.
labmaker/
│
├── frontend/
│   ├── login.html
│   ├── cadastro.html
│   ├── index.html
|   ├── cadlog.css
|   ├── cadlog.js
|   ├── logo.png
|   ├── sair.png
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── adm.php
│   ├── atualizar_status.php
│   ├── buscar_agendamentos.php
│   ├── conexao.php
│   ├── deletar_agendamento.php
│   ├── deletar_horario.php
│   ├── gerenciar_slots.php
│   ├── getslots.php
│   ├── listar_slots.php
│   ├── login.php
|   ├── logout.php
|   ├── salvar_agendamentos.php
|   ├── salvar_solicitacao.php
│   └── verificar.php
│
├── uploads/
│   └── (arquivos enviados pelos usuários)
```

---
## 📌 Observações

- O sistema diferencia usuários comuns e administradores
- O Kanban permite controle de fluxo das solicitações
- Upload de arquivos é salvo na pasta `/uploads`

---
## 👨‍💻 Autora

Desenvolvido por Andressa de Pinho Barreto 💻✨
