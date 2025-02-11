
    function adicionarLinha() {
        let grama = document.getElementById("grama").value;
        let nome = document.getElementById("nome").value;
        let idade = document.getElementById("idade").value;
        let cidade = document.getElementById("cidade").value;

        if (grama === "" || nome === "" || idade === "" || cidade === "") {
            alert("Preencha todos os campos!");
            return;
        }

        let tabela = document.getElementById("tabela-corpo");
        let novaLinha = tabela.insertRow();

        let cel0 = novaLinha.insertCell(0);
        let cel1 = novaLinha.insertCell(1);
        let cel2 = novaLinha.insertCell(2);
        let cel3 = novaLinha.insertCell(3);
        let cel4 = novaLinha.insertCell(4);

        cel0.innerHTML = grama;
        cel1.innerHTML = nome;
        cel2.innerHTML = idade;
        cel3.innerHTML = cidade;
        cel4.innerHTML = '<button onclick="removerLinha(this)">❌</button>';

        // Limpa os campos após adicionar
        document.getElementById("grama").value = "";
        document.getElementById("nome").value = "";
        document.getElementById("idade").value = "";
        document.getElementById("cidade").value = "";
    }

    function removerLinha(botao) {
        let linha = botao.parentNode.parentNode;
        linha.parentNode.removeChild(linha);
    }
