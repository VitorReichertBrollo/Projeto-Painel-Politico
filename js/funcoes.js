// Pega um texto dentro do XML

function texto(elemento, nomeDaTag) {

    var resultado = elemento.querySelector(nomeDaTag);

    if (resultado) {

        return resultado.textContent.trim();

    }

    return "";
}



// Formata a data

function formatarData(data) {

    if (data == "") {

        return "";
    }


    var partes = data.split("-");


    if (partes.length != 3) {

        return data;
    }


    var ano = partes[0];
    var mes = partes[1];
    var dia = partes[2];


    return dia + "/" + mes + "/" + ano;
}



// Mostra uma mensagem

function mostrarStatus(elemento, mensagem, erro) {

    elemento.textContent = mensagem;

    elemento.hidden = false;


    if (erro) {

        elemento.classList.add("erro");

    } else {

        elemento.classList.remove("erro");

    }

}



// Esconde a mensagem

function esconderStatus(elemento) {

    elemento.hidden = true;

    elemento.classList.remove("erro");
}
