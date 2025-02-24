const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
};

// Botão de logout
document.getElementById("button-logout").addEventListener("click", logout);

// Adicionar lançamento
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, 
        type: type, 
        description: description, 
        date: date
    });

    saveData();
    e.target.reset();
    myModal.hide();

    getTransactions();

    alert("Lançamento adicionado com sucesso.");
});

// Verificar se o usuário está logado
checkLogged();

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    } else {
        data = { transactions: [] }; // Garante que sempre existam transações
    }

    console.log("Dados carregados:", data); // DEBUG

    getTransactions();
}

// Função para deslogar
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}

// Função para exibir transações
function getTransactions() {
    const transactions = data.transactions || [];
    let transactionsHtml = "";

    console.log("Transações carregadas:", transactions);

    document.getElementById("transactions-list").innerHTML = ""; 
    if (transactions.length > 0) {
        transactions.forEach((item) => {
            let type = item.type === "2" ? "Saída" : "Entrada";

            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>R$ ${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>
            `;
        });
    } else {
        transactionsHtml = `<tr><td colspan="4">Nenhuma transação encontrada.</td></tr>`;
    }

    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

// Função para salvar os dados no localStorage
function saveData() {
    console.log("Salvando no localStorage:", logged, data); // DEBUG
    localStorage.setItem(logged, JSON.stringify(data));
}
