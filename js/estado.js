// Pesquisa os senadores pelo estado

async function pesquisar(estado) {

    var resultados = document.getElementById("resultados-uf");

    var status = document.getElementById("status-uf");


    resultados.innerHTML = "";


    mostrarStatus(
        status,
        "Buscando senadores por " + estado + "...",
        false
    );


    try {

        var url =
            "https://legis.senado.leg.br/dadosabertos/senador/lista/atual?uf="
            + estado
            + "&participacao=T&v=4";


        var resposta = await fetch(url);

        var dados = await resposta.text();


        var parser = new DOMParser();

        var xml = parser.parseFromString(
            dados,
            "application/xml"
        );


        if (xml.querySelector("parsererror")) {

            throw new Error("Erro ao interpretar os dados.");

        }


        var parlamentares =
            xml.querySelectorAll("Parlamentar");


        var modelo =
            document.getElementById("modelo-ficha");


        var encontrados = 0;


        parlamentares.forEach(function(parlamentar) {

            var identificacao =
                parlamentar.querySelector(
                    "IdentificacaoParlamentar"
                );


            if (!identificacao) {

                return;
            }


            var uf =
                texto(identificacao, "UfParlamentar");


            // Mostra somente o estado pesquisado

            if (uf.toUpperCase() != estado) {

                return;
            }


            encontrados++;


            var codigo =
                texto(identificacao, "CodigoParlamentar");

            var nome =
                texto(identificacao, "NomeParlamentar");

            var partido =
                texto(identificacao, "SiglaPartidoParlamentar");

            var foto =
                texto(identificacao, "UrlFotoParlamentar");

            var pagina =
                texto(identificacao, "UrlPaginaParlamentar");


            var ficha =
                modelo.content.cloneNode(true);


            ficha.querySelector(".ficha").href =
                pagina || "#";


            var imagem =
                ficha.querySelector(".ficha-foto img");


            imagem.src = foto;

            imagem.alt = nome;


            ficha.querySelector(".ficha-partido-uf")
                .textContent = partido + " · " + uf;


            ficha.querySelector(".ficha-nome")
                .textContent = nome;


            ficha.querySelector(".ficha-codigo")
                .textContent = "Código " + codigo;


            resultados.appendChild(ficha);

        });


        // Se não encontrou ninguém

        if (encontrados == 0) {

            mostrarStatus(
                status,
                "Nenhum senador encontrado para " + estado + ".",
                true
            );

            return;
        }


        esconderStatus(status);


    } catch (erro) {

        console.log(erro);

        mostrarStatus(
            status,
            "Erro ao buscar os dados. Tente novamente.",
            true
        );

    }

}

