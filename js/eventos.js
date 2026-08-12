// Formulário de busca por estado

document.getElementById("form-uf")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        var estado =
            document.getElementById("estado").value;


        estado = estado.trim().toUpperCase();


        if (estado != "") {

            pesquisar(estado);

        }

    });



// Formulário de busca por código

document.getElementById("form-parlamentar")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        var codigo =
            document.getElementById("cd_parlamentar").value;


        codigo = codigo.trim();


        if (codigo != "") {

            parlamentar(codigo);

        }

    });

