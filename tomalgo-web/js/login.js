ERROR_PAGE="error.html";
MAIN_PAGE = "main.html";
MAIN_CLIENTE_PAGE = "main_cliente.html";

$('#login-form').submit(function(e) {
	e.preventDefault();
	login($('#iusername').val(), $('#ipassword').val(), loginResult);	
});

function loginResult(response, username) {
	if (response.status == 'OK' && response.result.succeed) {
		$.cookie('user-name', $('#iusername').val());
		$.cookie('user-pass', SHA1($('#ipassword').val()));
		$.cookie('user-mail', response.result.mail);
		$.cookie('user-enterprise', response.result.enterprise);
		if (response.result.enterprise){
			window.location.href = MAIN_PAGE;
		}
		else{
			window.location.href = MAIN_CLIENTE_PAGE;
		}
	} else {
		bootbox.alert(response.result.message);
	}
}
