document.addEventListener("DOMContentLoaded", () => {
    carregarTabela();
    atualizarSomaTotal();
});

function adicionarLinha() {
    let grama = document.getElementById("grama").value;
    let lote = document.getElementById("lote").value;
    let nCaixa = document.getElementById("n-caixa").value;
    let total = document.getElementById("total").value;
    let cor = document.getElementById("cor-preforma").value;

    if (grama === "" || lote === "" || nCaixa === "" || total === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let tabela = document.getElementById("tabela-corpo");
    let novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
        <td>${grama}</td>
        <td>${lote}</td>
        <td>${nCaixa}</td>
        <td class="qtd-total">${total}</td>
        <td>${cor}</td>
        <td><button onclick="removerLinha(this)">Remover</button></td>
    `;

    tabela.appendChild(novaLinha);
    salvarTabelaNoLocalStorage();
    atualizarSomaTotal();

    document.getElementById("grama").value = "";
    document.getElementById("lote").value = "";
    document.getElementById("n-caixa").value = "";
    document.getElementById("total").value = "";
    document.getElementById("cor-preforma").selectedIndex = 0;
}

function removerLinha(botao) {
    botao.parentNode.parentNode.remove();
    salvarTabelaNoLocalStorage();
    atualizarSomaTotal();
}

function atualizarSomaTotal() {
    let total = 0;
    document.querySelectorAll(".qtd-total").forEach(cell => {
        total += parseFloat(cell.innerText) || 0;
    });
    document.getElementById("soma-total").innerHTML = `<strong>${total}</strong>`;
}

function salvarTabelaNoLocalStorage() {
    let tabela = [];
    document.querySelectorAll("#tabela-corpo tr").forEach(row => {
        let colunas = row.querySelectorAll("td");
        tabela.push({
            grama: colunas[0].innerText,
            lote: colunas[1].innerText,
            nCaixa: colunas[2].innerText,
            total: colunas[3].innerText,
            cor: colunas[4].innerText
        });
    });
    localStorage.setItem("tabelaPreforma", JSON.stringify(tabela));
}

function carregarTabela() {
    let dadosSalvos = localStorage.getItem("tabelaPreforma");
    if (dadosSalvos) {
        let tabela = JSON.parse(dadosSalvos);
        let tabelaCorpo = document.getElementById("tabela-corpo");
        tabela.forEach(item => {
            let novaLinha = document.createElement("tr");
            novaLinha.innerHTML = `
                <td>${item.grama}</td>
                <td>${item.lote}</td>
                <td>${item.nCaixa}</td>
                <td class="qtd-total">${item.total}</td>
                <td>${item.cor}</td>
                <td><button onclick="removerLinha(this)">Remover</button></td>
            `;
            tabelaCorpo.appendChild(novaLinha);
        });
    }
    atualizarSomaTotal();
}
