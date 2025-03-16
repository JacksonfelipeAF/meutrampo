// Função para adicionar linha à tabela
function adicionarLinha() {
    // Pega os valores dos inputs
    const grama = document.getElementById("grama").value;
    const lote = document.getElementById("lote").value;
    const nCaixa = document.getElementById("n-caixa").value;
    const total = document.getElementById("total").value;
    const preforma = document.getElementById("p-preforma").value;
    const garrafa = document.getElementById("p-garrafa").value;
    const corPreforma = document.getElementById("cor-preforma").value;

    // Verifica se todos os campos estão preenchidos
    if (!grama || !lote || !nCaixa || !total || !preforma || !garrafa || !corPreforma) {
        alert("Por favor, preencha todos os campos antes de adicionar.");
        return;
    }

    // Cria a nova linha na tabela
    const tabelaCorpo = document.getElementById("tabela-corpo");
    const novaLinha = document.createElement("tr");

    // Adiciona as células à nova linha
    novaLinha.innerHTML = `
        <td>${grama}</td>
        <td>${lote}</td>
        <td>${nCaixa}</td>
        <td class="qtd-total">${total}</td>
        <td class="p-preforma">${preforma}</td>
        <td class="p-garrafa">${garrafa}</td>
        <td>${corPreforma}</td>
        <td><button onclick="removerLinha(this)">Remover</button></td>
    `;

    // Adiciona a nova linha ao corpo da tabela
    tabelaCorpo.appendChild(novaLinha);

    // Salva os dados da tabela no localStorage
    salvarTabelaNoLocalStorage();

    // Limpa os campos de entrada após adicionar
    document.getElementById("grama").value = "";
    document.getElementById("lote").value = "";
    document.getElementById("n-caixa").value = "";
    document.getElementById("total").value = "";
    document.getElementById("p-preforma").value = "";
    document.getElementById("p-garrafa").value = "";
    document.getElementById("cor-preforma").value = "Cristal"; // Reseta para o valor padrão

    // Atualiza a soma total
    calcularTotal();
    atualizarSomaTotal();
}

// Função para remover linha da tabela
function removerLinha(button) {
    const linha = button.parentElement.parentElement;
    linha.remove();

    // Salva os dados da tabela no localStorage após remoção
    salvarTabelaNoLocalStorage();

    // Atualiza os totais após remoção
    calcularTotal();
    atualizarSomaTotal();
}

// Função para salvar a tabela no localStorage
function salvarTabelaNoLocalStorage() {
    let tabela = [];
    
    // Para cada linha da tabela, pega os valores das células (colunas)
    document.querySelectorAll("#tabela-corpo tr").forEach(row => {
        let colunas = row.querySelectorAll("td");
        tabela.push({
            grama: colunas[0].innerText,       // Grama
            lote: colunas[1].innerText,        // Lote
            nCaixa: colunas[2].innerText,      // Nº Caixa
            total: colunas[3].innerText,       // Total
            perdap: colunas[4].innerText,      // Perda Preforma
            perdag: colunas[5].innerText,      // Perda Garrafa
            cor: colunas[6].innerText         // Cor Preforma
        });
    });

    // Salva os dados da tabela no localStorage
    localStorage.setItem("tabelaPreforma", JSON.stringify(tabela));
}

// Função para carregar a tabela do localStorage
function carregarTabela() {
    let dadosSalvos = localStorage.getItem("tabelaPreforma");
    if (dadosSalvos) {
        let tabela = JSON.parse(dadosSalvos);
        let tabelaCorpo = document.getElementById("tabela-corpo");
        tabelaCorpo.innerHTML = ""; // Evita duplicação ao recarregar
        tabela.forEach(item => {
            let novaLinha = document.createElement("tr");
            novaLinha.innerHTML = `
                <td>${item.grama}</td>
                <td>${item.lote}</td>
                <td>${item.nCaixa}</td>
                <td class="qtd-total">${item.total}</td>
                <td class="p-preforma">${item.perdap}</td>
                <td class="p-garrafa">${item.perdag}</td>
                <td>${item.cor}</td>
                <td><button onclick="removerLinha(this)">Remover</button></td>
            `;
            tabelaCorpo.appendChild(novaLinha);
        });
    }
    calcularTotal();
    atualizarSomaTotal(); // Atualiza os totais após carregar os dados
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
    document.querySelectorAll(".p-preforma").forEach(cell => perdap += parseFloat(cell.innerText) || 0);
    document.querySelectorAll(".p-garrafa").forEach(cell => perdag += parseFloat(cell.innerText) || 0);

    document.getElementById("soma-total").innerHTML = `<strong>${total}</strong>`;
    document.getElementById("soma-preforma").innerHTML = `<strong>${perdap}</strong>`;
    document.getElementById("soma-garrafa").innerHTML = `<strong>${perdag}</strong>`;
}

// Carregar a tabela ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
    carregarTabela();
});


