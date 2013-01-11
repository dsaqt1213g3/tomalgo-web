ERROR_PAGE="error.html";
MAIN_PAGE = "main.html";
LOGIN_PAGE = "login.html";

$('#decline').submit(function(e) {
	e.preventDefault();
	decline($('#password3').val(), declineResult);
});

function declineResult(response) {
	if (response.result.succeed) {
		window.location.href = LOGIN_PAGE;
	} else {
		bootbox.alert(response.result.message);
	}
}
