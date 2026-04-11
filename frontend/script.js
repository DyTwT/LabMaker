tailwind.config = {
    theme: {
        extend: {
            colors: {
                bg: '#0f172a',
                surface: '#1e293b',
                accent: '#22d3ee',
                accentDark: '#0891b2',
                textPrimary: '#f1f5f9',
                textSecondary: '#94a3b8',
                received: '#f59e0b',
                analysis: '#8b5cf6',
                doing: '#3b82f6',
                done: '#10b981'
            }
        }
    }
}

let currentScreen = 'home';
let isAdmin = false;
let selectedDate = null;
let solicitacoes = [];
let calYear = new Date().getFullYear();
let calMonth = new Date().getMonth();

document.addEventListener('DOMContentLoaded', async () => {
    isAdmin = localStorage.getItem('isAdmin') === 'true';
    atualizarBotoesAdmin();

    await verificarUsuario();

    navigate('home');

    const formAgendamento = document.getElementById('form-agendamento');
    if (formAgendamento) {
        formAgendamento.addEventListener('submit', enviarAgendamento);
    }

    const formSlot = document.getElementById('formAddSlot');
    if (formSlot) {
        formSlot.addEventListener('submit', adicionarSlotAdmin);
    }

    if (window.lucide) {
        lucide.createIcons();
    }

    const btnAgendamentos = document.getElementById('btnAgendamentosAdmin');

    if (btnAgendamentos) {
        btnAgendamentos.addEventListener('click', () => {
            console.log("CLICOU NO BOTÃO");
            navigate('agendamentosAdmin');
        });
    }
});

async function verificarUsuario() {
    try {
        const res = await fetch('../backend/verificar.php');
        if (!res.ok) throw new Error();
        const data = await res.json();

        isAdmin = data.administrador;
        localStorage.setItem('isAdmin', isAdmin);
        atualizarBotoesAdmin();
    } catch (error) {
        console.warn("Usando permissões do cache local.");
        isAdmin = localStorage.getItem('isAdmin') === 'true';
        atualizarBotoesAdmin();
    }
}

function atualizarBotoesAdmin() {
    const adminElements = document.querySelectorAll('.admin-only');
    adminElements.forEach(el => {
        if (isAdmin) el.classList.remove('hidden');
        else el.classList.add('hidden');
    });
}

async function navigate(screen) {
    document.querySelectorAll('[id^="screen"]').forEach(el => el.classList.add('hidden'));

    let targetId = '';

    switch (screen) {
        case 'home': targetId = 'screenHome'; break;
        case 'manageSlots': targetId = 'screenManageSlots'; break;
        case 'requests': targetId = 'screenRequests'; break;
        case 'newRequest': targetId = 'screenNewRequest'; break;
        case 'kanban': targetId = 'screenKanban'; break;
        case 'scheduling': targetId = 'screenScheduling'; break;
        case 'agendamentosAdmin': targetId = 'screenAgendamentosAdmin'; break;
    }

    const target = document.getElementById(targetId);

    if (target) {
        target.classList.remove('hidden');
        currentScreen = screen;
    } else {
        console.error("Tela não encontrada:", targetId);
        return;
    }

    if (screen === 'kanban') {
        await carregarSolicitacoes();
        renderKanban();
    }

    if (screen === 'scheduling') {
        renderCalendar();
    }

    if (screen === 'manageSlots') {
        await carregarSlotsAdmin();
    }

    if (screen === 'agendamentosAdmin') {
        await carregarAgendamentosAdmin();
    }
}

async function submitSolicitacao(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
        const res = await fetch('../backend/salvar_solicitacao.php', {
            method: 'POST',
            body: formData
        });
        const result = await res.text();

        if (result.includes('sucesso') || result.trim() === 'ok') {
            alert("Solicitação enviada com sucesso!");
            event.target.reset();
            navigate('requests');
        } else {
            alert("Erro ao enviar: " + result);
        }
    } catch (e) {
        alert("Erro de conexão ao enviar solicitação.");
    }
}

function renderCalendar() {
    const container = document.getElementById('calendar-container');
    if (!container) return;

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

    let html = `<div class="flex justify-between items-center mb-4">
        <button onclick="changeMonth(-1)" class="p-2 text-accent">←</button>
        <h3 class="font-bold">${monthNames[calMonth]} ${calYear}</h3>
        <button onclick="changeMonth(1)" class="p-2 text-accent">→</button>
    </div>
    <div class="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-textSecondary mb-2">
        <div>DOM</div><div>SEG</div><div>TER</div><div>QUA</div><div>QUI</div><div>SEX</div><div>SÁB</div>
    </div>
    <div class="grid grid-cols-7 gap-1">`;

    for (let i = 0; i < firstDay; i++) html += `<div class="p-3"></div>`;

    for (let dia = 1; dia <= daysInMonth; dia++) {
        const dataFormatada = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        html += `<button onclick="selecionarDia('${dataFormatada}')" class="p-3 rounded-xl text-sm ${selectedDate === dataFormatada ? 'ring-2 ring-accent bg-accent/10' : 'hover:bg-white/5'}">${dia}</button>`;
    }

    container.innerHTML = html + `</div>`;
}

function changeMonth(diff) {
    calMonth += diff;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    else if (calMonth < 0) { calMonth = 11; calYear--; }
    renderCalendar();
}

async function selecionarDia(data) {
    selectedDate = data;
    renderCalendar();

    const res = await fetch(`../backend/getslots.php?data=${data}`);
    const slots = await res.json();

    const container = document.getElementById('slots-container');
    container.innerHTML = slots.length ? '' : '<p class="text-xs col-span-3 text-center">Sem horários.</p>';

    slots.forEach(slot => {
        const btn = document.createElement('button');
        btn.className = 'bg-surface p-3 rounded-xl border border-white/10 text-xs';
        btn.innerText = slot.horario.substring(0, 5);
        btn.onclick = () => {
            document.getElementById('hiddenData').value = data;
            document.getElementById('hiddenHorario').value = slot.horario;
            document.getElementById('modalAgendamento').classList.remove('hidden');
        };
        container.appendChild(btn);
    });
}

async function enviarAgendamento(e) {
    e.preventDefault();
    await fetch('../backend/salvar_agendamentos.php', {
        method: 'POST',
        body: new FormData(e.target)
    });

    alert("Reserva concluída!");
    document.getElementById('modalAgendamento').classList.add('hidden');
    navigate('home');
}

async function carregarSlotsAdmin() {
    const list = document.getElementById('admin-slots-list');
    if (!list) return;

    const res = await fetch('../backend/gerenciar_slots.php?action=list');
    const slots = await res.json();

    list.innerHTML = slots.length ? '' : '<p class="text-xs text-center">Nenhum slot.</p>';

    slots.forEach(s => {
        const item = document.createElement('div');
        item.className = "flex justify-between items-center bg-surface p-4 rounded-xl mb-2";
        item.innerHTML = `<div class="text-xs"><b>${s.data_slots}</b> - ${s.horario.substring(0, 5)}</div>
        <button onclick="deletarSlotAdmin(${s.id_slots})" class="text-red-400">Excluir</button>`;
        list.appendChild(item);
    });
}

async function adicionarSlotAdmin(e) {
    e.preventDefault();
    await fetch('../backend/gerenciar_slots.php?action=add', {
        method: 'POST',
        body: new FormData(e.target)
    });

    alert("Horário aberto!");
    carregarSlotsAdmin();
}

async function deletarSlotAdmin(id) {
    if (!confirm("Excluir?")) return;

    const fd = new FormData();
    fd.append('id', id);

    await fetch('../backend/gerenciar_slots.php?action=delete', {
        method: 'POST',
        body: fd
    });

    carregarSlotsAdmin();
}

async function carregarSolicitacoes() {
    const res = await fetch("../backend/listar_solicitacao.php");
    solicitacoes = await res.json();
}

async function carregarAgendamentosAdmin() {
    console.log("FUNÇÃO CHAMADA");
    const container = document.getElementById('lista-agendamentos');
    if (!container) return;

    const res = await fetch('../backend/buscar_agendamentos.php');
    const dados = await res.json();

    container.innerHTML = dados.length ? '' : '<p class="text-xs">Nenhum agendamento.</p>';

    dados.forEach(a => {
        const item = document.createElement('div');
        item.className = "bg-surface p-4 rounded-xl flex justify-between items-center";

        item.innerHTML = `
            <div class="text-xs">
                <b>${a.nome_agendamentos}</b><br>
                ${a.telefone}<br>
                ${a.data_agendamentos} - ${a.horario_agendamentos ? a.horario_agendamentos.substring(0, 5) : ''}<br>
                Pessoas: ${a.pessoas}
            </div>
            <button onclick="deletarAgendamento(${a.id})" class="text-red-400 text-xs">
                Excluir
            </button>
        `;

        container.appendChild(item);
    });
}

async function deletarAgendamento(id) {
    if (!confirm("Deseja excluir este agendamento?")) return;

    const fd = new FormData();
    fd.append('id', id);

    await fetch('../backend/deletar_agendamento.php', {
        method: 'POST',
        body: fd
    });

    carregarAgendamentosAdmin();
}

function renderKanban() {
    const statusTypes = ['Recebido', 'Análise', 'Fazendo', 'Concluído'];

    statusTypes.forEach(status => {
        const container = document.getElementById(`kanban-${status.toLowerCase()}`);
        if (!container) return;

        container.innerHTML = '';

        solicitacoes
            .filter(s => s.status === status)
            .forEach(s => {
                const card = document.createElement('div');
                card.className = `bg-surface p-4 rounded-xl border-l-4 border-${getStatusColor(status)} mb-3`;

                card.innerHTML = `
                    <h4 class="font-bold text-sm">${s.nome}</h4>
                    <p class="text-xs text-textSecondary mt-1">${s.descricao}</p>
                    ${isAdmin ? `
                        <select onchange="alterarStatus(${s.id_solicitacoes}, this.value)" class="bg-bg text-[10px] mt-3 p-1 rounded w-full border border-white/10">
                            ${statusTypes.map(st => `<option value="${st}" ${st === status ? 'selected' : ''}>${st}</option>`).join('')}
                        </select>` : ''}
                `;

                container.appendChild(card);
            });
    });
}

async function alterarStatus(id, novoStatus) {
    const fd = new FormData();
    fd.append('id', id);
    fd.append('status', novoStatus);

    await fetch('../backend/atualizar_status.php', {
        method: 'POST',
        body: fd
    });

    await carregarSolicitacoes();
    renderKanban();
}

function getStatusColor(status) {
    const colors = {
        'Recebido': 'received',
        'Análise': 'analysis',
        'Fazendo': 'doing',
        'Concluído': 'done'
    };
    return colors[status] || 'accent';
}

function realizarLogout() {
    localStorage.clear();
    window.location.href = '../backend/logout.php';
}

window.navigate = navigate;
window.deletarAgendamento = deletarAgendamento;
window.deletarSlotAdmin = deletarSlotAdmin;
window.alterarStatus = alterarStatus;
window.realizarLogout = realizarLogout;