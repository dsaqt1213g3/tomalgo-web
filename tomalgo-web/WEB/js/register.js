ERROR_PAGE="error.html";
MAIN_PAGE = "main.html";
LOGIN_PAGE = "login.html";
$('#register-form').submit(function(e) {
	e.preventDefault();
	registeruser($('#iusername').val(), $('#ipassword1').val(), $('#iemail').val(), $('#ifecha').val(), registeruserResult);
});

function registeruserResult(response) {
	if (response.status == 'OK' && response.result.succeed) {
		window.location.href = LOGIN_PAGE;
	} else {
		bootbox.alert(response.result.message);
	}
}
