document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            try {
                const response = await fetch('../backend/login.php', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) throw new Error('Erro na conexão');

                const result = await response.text();
                const cleanResult = result.trim();

                // NOVA LÓGICA: Salva no navegador se o usuário é ADM ou Comum antes de redirecionar
                if (cleanResult === 'success_adm') {
                    localStorage.setItem('isAdmin', 'true');
                    window.location.href = 'index.html';
                }
                else if (cleanResult === 'success_user') {
                    localStorage.setItem('isAdmin', 'false');
                    window.location.href = 'index.html';
                }
                else if (cleanResult === 'success_cadastro') {
                    alert('Cadastro realizado! Agora você pode entrar.');
                    window.location.href = 'login.html';
                }
                else {
                    alert(cleanResult);
                }

            } catch (error) {
                console.error('Erro na requisição:', error);
                alert('Não foi possível conectar ao servidor.');
            }
        });
    }
});

function toggleSenha(id, element) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
        element.textContent = "visibility";
    } else {
        input.type = "password";
        element.textContent = "visibility_off";
    }
}