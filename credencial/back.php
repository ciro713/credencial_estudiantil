<?php
include('db-connection.php');

// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$opcion = $conexion->real_escape_string($_POST['opcion']);

switch($opcion){
    case 'ingresar':
        $id_usuario = $conexion->real_escape_string($_POST['id_usuario']);
        $password = $conexion->real_escape_string($_POST['password']);
    
        $sql = $conexion->query("SELECT u.id_usuario, u.password, e.DNI, e.nombre_apellido FROM usuarios u INNER JOIN estudiante e ON u.id_usuario = e.DNI WHERE u.id_usuario = '$id_usuario' AND u.password = '$password'");

        if ($datos = $sql->fetch_object() && $row['estado_credencial' == 'habilitado']) {
            $acceso = array('exito' => true);
            header("Content-Type: application/json");
            echo json_encode($acceso);
        } else {
            $acceso = array('invalido' => true);
            header("Content-Type: application/json");
            echo json_encode($acceso);
        }
    break;

    case 'registrarse':
        $DNI = $_POST['DNI'];
        $contraseña = $_POST['contraseña'];

        // Aquí debes agregar la lógica para insertar un nuevo usuario en la base de datos
        // Recuerda utilizar consultas preparadas y almacenar la contraseña de manera segura
        $sql = "INSERT INTO usuarios (id_usuario, password) VALUES (?, ?)";
        $stmt = $conexion->prepare($sql);
        $hashed_password = password_hash($contraseña, PASSWORD_DEFAULT);
        $stmt->bind_param("ss", $DNI, $hashed_password);
        $stmt->execute();

        // Verificar si la inserción fue exitosa y devolver una respuesta adecuada
        if ($stmt->affected_rows > 0) {
            $respuesta = array('exito' => true);
        } else {
            $respuesta = array('exito' => false, 'mensaje' => 'Error al registrar usuario');
        }
        header("Content-Type: application/json");
        echo json_encode($respuesta);
    break;
}
    
?>
