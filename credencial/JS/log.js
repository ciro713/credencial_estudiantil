$(function(){
    $("#btn-ingresar").click(function(){
        var datos = {
            id_usuario : $("#id_usuario").val(),
            password : $("#password").val(),
            opcion : "ingresar"
        }

        $.ajax({
            url : '../credencial/back.php',
            type : 'POST',
            dataType : 'json',
            data : datos,
            success:function(data){
                if(data.exito == true){
                    $(location).attr('href', '../credencial/prueba.html');
                }else if(data.espera == true){
                    alert("usuario invalido");
                }else if(data.invalido == true){
                    alert("usuario invalido");
                }
            },
            error:function(){
                alert("ah ocurrido un error");
                console.log(datos);
            }
        })
    })

    $("#btn-registrar").click(function(){
        var estudiante = {
            id_usuario : $().val(),
            password : $().val(),
            nomyape : $().val(),
            email : $().val(),
            direccion : $().val(),
            desde : $().val(),
            hasta : $().val(),
            establecimiento_educativo : $().val(),
            opcion : "registrarse"
        }

        $.ajax({
            url : '../credencial/back.php',
            type : 'POST',
            dataType : 'json',
            data : estudiante,
            success:function(data){
                if(data.registrado == true){
                    $(location).attr('href', '../credencial/espera.html');
                }else if(data.error == true){
                    alert("usuario invalido");

                }
            },
            error:function(){
                alert("ah ocurrido un error");
                console.log(datos);
            }
        })
    })
})