document.addEventListener("DOMContentLoaded", function() {
    var btnIngresar = document.getElementById("btn-ingresar");

    btnIngresar.addEventListener("click", function() {
        var idUsuario = document.getElementById("id_usuario").value;
        var password = document.getElementById("password").value;

        var datos = {
            id_usuario: idUsuario,
            password: password,
            opcion: btnIngresar.value
        };

        console.log(datos);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../credencial/back.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    if (data.exito) {
                        alert("Usuario válido. Redirigiendo...");
                        console.log(datos);
                        window.location.href = "../credencial/prueba.html";
                    } else if (data.invalido) {
                        alert("Usuario o contraseña incorrectos");
                        // document.getElementById("mensaje-error").innerHTML = '<p class="msj-alert col-auto m-auto">Usuario o contraseña incorrectos</p>';
                    } else {
                        alert("Respuesta no válida del servidor");
                    }
                } else {
                    alert("Error al comunicarse con el servidor.");
                }
            }
        };

        xhr.send(JSON.stringify(datos));
    });
});