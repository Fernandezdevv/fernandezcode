// Função para mostrar toasts
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById("toast-container") || createToastContainer();

    const toast = document.createElement("div");
    toast.classList.add("toast", type);
    toast.textContent = message;

    toastContainer.appendChild(toast);

    // Mostrar o toast
    setTimeout(() => toast.classList.add("show"), 100);

    // Remover após 3 segundos
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Cria o contêiner caso ainda não exista
function createToastContainer() {
    const container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
    return container;
}

// Cadastro
const cadastroForm = document.getElementById("cadastroForm");
if (cadastroForm) {
    cadastroForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {
            const res = await fetch("cadastro.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome, email, senha })
            });

            const data = await res.json();

            if (data.success) {
                showToast(data.message, 'success');
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            } else {
                showToast(data.message, 'error');
            }
        } catch (error) {
            showToast("Erro ao tentar cadastrar. Tente novamente.", 'error');
            console.error(error);
        }
    });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const senha = document.getElementById("loginSenha").value;

        try {
            const res = await fetch("login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha })
            });

            const data = await res.json();

            if (data.success) {
                showToast("Login realizado com sucesso!", 'success');
                setTimeout(() => {
                    window.location.href = "index.php";
                }, 2000);
            } else {
                showToast(data.message, 'error');
            }
        } catch (error) {
            showToast("Erro ao tentar fazer login. Tente novamente.", 'error');
            console.error(error);
        }
    });
}
