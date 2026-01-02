// Função para adicionar linha à tabela
function adicionarLinha() {
    const grama = document.getElementById("grama").value.trim();
    const lote = document.getElementById("lote").value.trim();
    const nCaixa = document.getElementById("n-caixa").value.trim();
    const total = document.getElementById("total").value.trim();
    const preforma = document.getElementById("p-preforma").value.trim();  // Corrigir nome para "p-preforma"
    const garrafa = document.getElementById("p-garrafa").value.trim();    // Corrigir nome para "p-garrafa"
    const corPreforma = document.getElementById("cor-preforma").value;

    if (!grama || !lote || !nCaixa || !total || !preforma || !garrafa || !corPreforma) {
        alert("Por favor, preencha todos os campos antes de adicionar.");
        return;
    }

    const tabelaCorpo = document.getElementById("tabela-corpo");
    const novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
        <td>${grama}</td>
        <td>${lote}</td>
        <td>${nCaixa}</td>
        <td class="qtd-total">${total}</td>
        <td class="preforma">${preforma}</td>
        <td class="garrafa">${garrafa}</td>
        <td>${corPreforma}</td>
        <td><button onclick="removerLinha(this)">Remover</button></td>
    `;

    tabelaCorpo.appendChild(novaLinha);
    salvarTabelaNoLocalStorage();

    // Limpa os campos após adicionar
    document.getElementById("grama").value = "";
    document.getElementById("lote").value = "";
    document.getElementById("n-caixa").value = "";
    document.getElementById("total").value = "";
    document.getElementById("p-preforma").value = "";  // Corrigir nome para "p-preforma"
    document.getElementById("p-garrafa").value = "";  // Corrigir nome para "p-garrafa"
    document.getElementById("cor-preforma").value = "Cristal";

    calcularTotal();
    atualizarSomaTotal();
}

// Função para remover linha
function removerLinha(button) {
    button.closest("tr").remove();
    salvarTabelaNoLocalStorage();
    calcularTotal();
    atualizarSomaTotal();
}

// Função para salvar a tabela no localStorage
function salvarTabelaNoLocalStorage() {
    let tabela = [];

    document.querySelectorAll("#tabela-corpo tr").forEach(row => {
        let colunas = row.querySelectorAll("td");
        tabela.push({
            grama: colunas[0].innerText,
            lote: colunas[1].innerText,
            nCaixa: colunas[2].innerText,
            total: colunas[3].innerText,
            perdap: colunas[4].innerText,
            perdag: colunas[5].innerText,
            cor: colunas[6].innerText
        });
    });

    localStorage.setItem("tabelaPreforma", JSON.stringify(tabela));
}

// Função para carregar a tabela do localStorage
function carregarTabela() {
    let dadosSalvos = localStorage.getItem("tabelaPreforma");
    if (dadosSalvos) {
        let tabela = JSON.parse(dadosSalvos);
        let tabelaCorpo = document.getElementById("tabela-corpo");
        tabelaCorpo.innerHTML = ""; 

        tabela.forEach(item => {
            let novaLinha = document.createElement("tr");
            novaLinha.innerHTML = `
                <td>${item.grama}</td>
                <td>${item.lote}</td>
                <td>${item.nCaixa}</td>
                <td class="qtd-total">${item.total}</td>
                <td class="preforma">${item.perdap}</td>
                <td class="garrafa">${item.perdag}</td>
                <td>${item.cor}</td>
                <td><button onclick="removerLinha(this)">Remover</button></td>
            `;
            tabelaCorpo.appendChild(novaLinha);
        });
    }
    calcularTotal();
    atualizarSomaTotal();
}

// Função para calcular o total dos itens
function calcularTotal() {
    let somaTotal = 0;
    document.querySelectorAll(".qtd-total").forEach(cell => {
        somaTotal += parseFloat(cell.textContent) || 0;
    });

    document.getElementById("totalProduzido").value = somaTotal;
    calcularProducaoHora();
}

// Função para calcular a produção por hora
function calcularProducaoHora() {
    let totalProduzido = parseFloat(document.getElementById("totalProduzido").value) || 0;
    let horasTrabalhadas = parseFloat(document.getElementById("horas_trabalhadas").value) || 0;
    document.getElementById("producao_por_hora").value = horasTrabalhadas > 0 ? (totalProduzido / horasTrabalhadas).toFixed(2) : 0;
}

// Função para atualizar a soma dos totais
function atualizarSomaTotal() {
    let total = 0, perdap = 0, perdag = 0;
    document.querySelectorAll(".qtd-total").forEach(cell => total += parseFloat(cell.innerText) || 0);
    document.querySelectorAll(".preforma").forEach(cell => perdap += parseFloat(cell.innerText) || 0);
    document.querySelectorAll(".garrafa").forEach(cell => perdag += parseFloat(cell.innerText) || 0);

    document.getElementById("soma-total").innerHTML = `<strong>${total}</strong>`;
    document.getElementById("soma-preforma").innerHTML = `<strong>${perdap}</strong>`;
    document.getElementById("soma-garrafa").innerHTML = `<strong>${perdag}</strong>`;
}

// Carregar a tabela ao iniciar a página
document.addEventListener("DOMContentLoaded", carregarTabela);

// Exportar para CSV
function exportarCSV() {
    let csv = "Grama,Lote,Nº Caixa,Total,Perda Preforma,Perda Garrafa,Cor Preforma\n";

    document.querySelectorAll("#tabela-corpo tr").forEach(linha => {
        let colunas = linha.querySelectorAll("td");
        let linhaCSV = Array.from(colunas).map(td => td.innerText).join(",");
        csv += linhaCSV + "\n";
    });

    let blob = new Blob([csv], { type: "text/csv" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tabela_preforma.csv";
    link.click();
}
