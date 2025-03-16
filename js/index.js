    document.addEventListener("DOMContentLoaded", () => {
        carregarTabela();
        atualizarSomaTotal();
    });

    function calcularTotal() {
        let somaTotal = 0;
        let linhas = document.querySelectorAll("#tabela-corpo tr");
    
        linhas.forEach(linha => {
            let qtdTotalCell = linha.querySelector("td:nth-child(4)");
            if (qtdTotalCell) {
                let valor = parseInt(qtdTotalCell.textContent) || 0;
                somaTotal += valor;
            }
        });
    
        document.getElementById("totalProduzido").value = somaTotal;
    
        // Atualiza a produção por hora sempre que o total produzido mudar
        calcularProducaoHora();
    }

    function calcularProducaoHora() {
        let totalProduzido = parseFloat(document.getElementById("totalProduzido").value) || 0;
        let horasTrabalhadas = parseFloat(document.getElementById("horas_trabalhadas").value) || 0;
    
        if (horasTrabalhadas > 0) {
            let producaoHora = totalProduzido / horasTrabalhadas;
            document.getElementById("producao_por_hora").value = producaoHora.toFixed(2); // Exibe com 2 casas decimais
        } else {
            document.getElementById("producao_por_hora").value = 0;
        }
    }
    
    

    function adicionarLinha() {
    
        let grama = document.getElementById("grama").value;
        let lote = document.getElementById("lote").value;
        let nCaixa = document.getElementById("n-caixa").value;
        let total = document.getElementById("total").value;
        let perdap = document.getElementById("p-preforma").value;
        let perdag = document.getElementById("p-garrafa").value;
        let cor = document.getElementById("cor-preforma").value;

        if (!total) {
            alert("Por favor, insira um valor para Qtd Total.");
            return;
        }

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
            <td class="p-preforma">${perdap}</td>
            <td class="p-garrafa">${perdag}</td>
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
        document.getElementById("p-preforma").value = "";
        document.getElementById("p-garrafa").value = "";
        document.getElementById("cor-preforma").selectedIndex = 0;

        // Adiciona a nova linha à tabela
    tabela.appendChild(novaLinha);

    // Recalcula o total
    calcularTotal();
    }

    // Função para remover uma linha da tabela e atualizar o total
    function removerLinha(botao) {
        let linha = botao.parentElement.parentElement;
        linha.remove();
        calcularTotal(); // Recalcula o total após remover
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
        let perdap = 0;
        document.querySelectorAll(".p-preforma").forEach(cell => {
            perdap += parseFloat(cell.innerText) || 0;
        });
        let perdag = 0;
        document.querySelectorAll(".p-garrafa").forEach(cell => {
            perdag += parseFloat(cell.innerText) || 0;
        });
        document.getElementById("soma-total").innerHTML = `<strong>${total}</strong>`;
        document.getElementById("soma-preforma").innerHTML = `<strong>${perdap}</strong>`;
        document.getElementById("soma-garrafa").innerHTML = `<strong>${perdag}</strong>`;
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
                perdap: colunas[4].innerText,
                perdag: colunas[5].innerText,
                cor: colunas[6].innerText
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
                    <td class="p-preforma">${item.perdap}</td>
                    <td class="p-garrafa">${item.perdag}</td>
                    <td>${item.cor}</td>
                    <td><button onclick="removerLinha(this)">Remover</button></td>
                `;
                tabelaCorpo.appendChild(novaLinha);
            });
        }
        atualizarSomaTotal();
    }

  
    document.getElementById("horas_trabalhadas").addEventListener("input", calcularProducaoHora);
    document.getElementById("totalProduzido").addEventListener("input", calcularProducaoHora);
    
    