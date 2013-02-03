ERROR_PAGE="error.html";
MAIN_PAGE = "main.html";
LOGIN_PAGE = "login.html";

$('#decline').submit(function(e) {
	e.preventDefault();
	decline($('#password3').val(), declineResult);
});

function declineResult(response) {
	if (response.status = 'OK' && response.result) {
		self.close();
		window.location.href = LOGIN_PAGE;
	} else {
		bootbox.alert("No has puesto bien la contraseña");
	}
}
