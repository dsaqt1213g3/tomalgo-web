ERROR_PAGE="error.html";
MAIN_PAGE = "main.html";
LOGIN_PAGE = "login.html";
$('#register-form').submit(function(e) {
	e.preventDefault();
	registerbar($('#iusername').val(), $('#ipassword1').val(), $('#iemail').val(), $('#istreet').val(), registerbarResult);
});

function registerbarResult(response) {
	if (response.status == 'OK') {
		window.location.href = LOGIN_PAGE;
	} else {
		bootbox.alert(response.result.message);
	}
}
