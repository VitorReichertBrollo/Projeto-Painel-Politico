// Pesquisa um parlamentar pelo código

async function parlamentar(codigo) {

    var resultado =
        document.getElementById("resultado-parlamentar");

    var status =
        document.getElementById("status-parlamentar");


    resultado.innerHTML = "";


    mostrarStatus(
        status,
        "Buscando parlamentar " + codigo + "...",
        false
    );


    try {

        var url =
            "https://legis.senado.leg.br/dadosabertos/senador/"
            + codigo
            + "?v=6";


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


        var identificacao =
            xml.querySelector(
                "IdentificacaoParlamentar"
            );


        var dadosBasicos =
            xml.querySelector(
                "DadosBasicosParlamentar"
            );


        if (!identificacao) {

            mostrarStatus(
                status,
                "Nenhum parlamentar encontrado com o código "
                + codigo + ".",
                true
            );

            return;
        }


        var nome =
            texto(identificacao, "NomeParlamentar");

        var tratamento =
            texto(identificacao, "FormaTratamento");

        var partido =
            texto(identificacao, "SiglaPartidoParlamentar");

        var uf =
            texto(identificacao, "UfParlamentar");

        var foto =
            texto(identificacao, "UrlFotoParlamentar");

        var email =
            texto(identificacao, "EmailParlamentar");

        var pagina =
            texto(identificacao, "UrlPaginaParlamentar");


        var nascimento = "";

        var naturalidade = "";

        var ufNaturalidade = "";


        if (dadosBasicos) {

            nascimento =
                texto(dadosBasicos, "DataNascimento");

            naturalidade =
                texto(dadosBasicos, "Naturalidade");

            ufNaturalidade =
                texto(dadosBasicos, "UfNaturalidade");

        }


        var modelo =
            document.getElementById("modelo-dossie");


        var dossie =
            modelo.content.cloneNode(true);


        var imagem =
            dossie.querySelector(".dossie-foto img");


        imagem.src = foto;

        imagem.alt = nome;


        dossie.querySelector(".dossie-tratamento")
            .textContent = tratamento || "Senador(a)";


        dossie.querySelector(".dossie-nome")
            .textContent = nome;


        dossie.querySelector(".dossie-partido-uf")
            .textContent = partido + " · " + uf;


        dossie.querySelector(".dossie-codigo")
            .textContent = codigo;


        dossie.querySelector(".dossie-email")
            .textContent = email || "—";


        dossie.querySelector(".dossie-nascimento")
            .textContent =
            formatarData(nascimento) || "—";


        if (naturalidade && ufNaturalidade) {

            dossie.querySelector(".dossie-naturalidade")
                .textContent =
                naturalidade + " / " + ufNaturalidade;

        } else {

            dossie.querySelector(".dossie-naturalidade")
                .textContent = "—";

        }


        dossie.querySelector(".dossie-link").href =
            pagina || "#";


        resultado.appendChild(dossie);


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

