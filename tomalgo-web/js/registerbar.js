ERROR_PAGE="error.html";
MAIN_PAGE = "main.html";
LOGIN_PAGE = "login.html";

function checkuserResult(response) {
	if (response.status == 'OK' && response.result) {
		$('#cgusername').addClass('error');
		$('#eusername').text('El usuario especificado ya existe');
		$('#eusername').show();
	}
}

//campo username
$('#iusername').blur(function() {
	var value = $('#iusername').val();
	if (value == '') {
		$('#cgusername').addClass('error');
		$('#eusername').text('No puedes dejar este campo en blanco');
		$('#eusername').show();
	} else {
		$('#cgusername').removeClass('error');
		$('#eusername').hide();
		checkuser(value, checkuserResult)
	}
});

$('#iusername').focus(function() {
	$('#cgusername').removeClass('error');
	$('#eusername').hide();
});

//campo contrase�a
$('#ipassword1').blur(function() {
	var value = $('#ipassword1').val();
	if (value == '') {
		$('#cgpassword1').addClass('error');
		$('#epassword1').text('No puedes dejar este campo en blanco');
		$('#epassword1').show();
	} else {
		$('#cgpassword1').removeClass('error');
		$('#epassword1').hide();
	}
});

$('#ipassword1').focus(function() {
	$('#cgpassword1').removeClass('error');
	$('#epassword1').hide();
});

//campo repetir contrase�a
$('#ipassword2').blur(function() {
	var value = $('#ipassword2').val();
	var con = $('#ipassword1').val();
	if (value == '') {
		$('#cgpassword2').addClass('error');
		$('#epassword2').text('No puedes dejar este campo en blanco');
		$('#epassword2').show();
	} else {
		$('#cgpassword2').removeClass('error');
		$('#epassword2').hide();
	}

	if (value != con) {
		$('#cgpassword2').addClass('error');
		$('#epassword2').text('Las contrase�as no coinciden');
		$('#epassword2').show();
	}
});
$('#ipassword2').focus(function() {
	$('#cgpassword2').removeClass('error');
	$('#epassword2').hide();
});

//campo mail
$('#idireccion').blur(function() {
	var value = $('#idireccion').val();
	if (value == '') {
		$('#cgdireccion').addClass('error');
		$('#edireccion').text('No puedes dejar este campo en blanco');
		$('#edireccion').show();
	} else {
		$('#cgdireccion').removeClass('error');
		$('#edireccion').hide();
	}
});
$('#idireccion').focus(function() {
	$('#cgdireccion').removeClass('error');
	$('#edireccion').hide();
});

//campo mail
$('#iemail').blur(function() {
	var value = $('#iemail').val();
	if (value == '') {
		$('#cgemail').addClass('error');
		$('#eemail').text('No puedes dejar este campo en blanco');
		$('#eemail').show();
	} else {
		$('#cgemail').removeClass('error');
		$('#eemail').hide();
	}
});
$('#iemail').focus(function() {
	$('#cgemail').removeClass('error');
	$('#eemail').hide();
});

$('#register-form').submit(function(e) {
	e.preventDefault();
	
	//Obtener valores
	var username = $('#iusername').val(),
		password = $('#ipassword1').val(),
		repassword = $('#ipassword2').val(),
		street = $('#idireccion').val(),
		email = $('#iemail').val()
		usernameUsed = $('#cgusername').hasClass('error');
	
	//Calcular si hay error
	var error = username == '' 	|| password == '' 	|| password != repassword
			 || street == ''		|| email == '' 		|| usernameUsed;

	
	//Ejecutar el registro si no hay error
	if(!error) {			
		registerbar(username, password, email, street, registerbarResult);
	} else {
		bootbox.alert('Hay errores en los campos de registro');
	}
});

function registerbarResult(response) {
	if (response.status == 'OK') {
		window.location.href = LOGIN_PAGE;
	} else {
		bootbox.alert(response.result.message);
	}
}
