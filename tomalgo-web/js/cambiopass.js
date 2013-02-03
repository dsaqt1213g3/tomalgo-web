ERROR_PAGE="error.html";
MAIN_PAGE = "main.html";
MAIN_CLIENTE_PAGE = "main_cliente.html";

$('#cambiop').submit(function(e) {
	e.preventDefault();
	cambiop(SHA1($('#old_password').val()),SHA1($('#new_password').val()), cambioResult);
});

function cambioResult(response) {
	console.log(response);
	if (response.status =='OK' && response.result) {
		$.cookie('user-pass', SHA1($('#new_password').val()));
		self.close();
		bootbox.alert("Se ha cambiado la contraseña");
	} else {
		bootbox.alert("No se ha podido cambiar la contraseña");
	}
}
