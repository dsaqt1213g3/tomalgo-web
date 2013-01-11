ERROR_PAGE="error.html";
MAIN_PAGE = "main.html";
LOGIN_PAGE = "login.html";

$('#cambiop').submit(function(e) {
	e.preventDefault();
	cambiop($('#password2').val(),$('#password').val(), cambioResult);
});

function cambioResult(response) {
	if (response.status =='OK') {
		window.location.href = MAIN_PAGE;
	} else {
		bootbox.alert(response.result.message);
	}
}
