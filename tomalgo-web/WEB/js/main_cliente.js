var user;
ERROR_PAGE="error.html";




function eventoResult(response) {
	if (response.status == 'OK' && response.result.succeed) {
		window.location.href = MAIN_PAGE;
	} else {
		bootbox.alert(response.result.message);
	}
}


function assistResult(response) {
	if (response.status == 'OK' && response.result.succeed) {
		window.location.href = MAIN_PAGE;
	} else {
		bootbox.alert(response.result.message);
	}
}



function loggedResult(response){
	if (response.status==='OK' && response.result){
		user = $.parseJSON($.cookie('mus-user'));
		$('#iusername').text(user.username);
		console.log($.cookie('user-pass'));
		navbarClick('inicio');
    $('#iniID').text("Bienvenid@ " + $.parseJSON($.cookie('mus-user')).username);
		$('#fullpage').show();
	}else{
		window.location.href="login.html";
	}
}

function logoutResult(response){
	if (response.status==='OK' && response.result){
		window.location.href="login.html";
	}else{
		window.location.href="error.html";
	}
}

function infoResult(){
		$('#iname').text("Nombre: " + $.cookie('user-name'));
		$('#imail').text("Email: " + $.cookie('user-mail'));
}


//$.cookie('minecraft-user', username);

function listGamesResult(response){
	if (response.status==='OK'){
		console.log(response.result);
		makeResultTable(response.result);
	}else{
		window.location.href="error.html";
	}
}

function listoldGamesResult(response){
	if (response.status==='OK'){
		console.log(response.result);
		makeResultTable(response.result);
	}else{
		window.location.href="error.html";
	}
}

var assist;
function assistResult(response){
	console.log(response.result);
	assist = response.result;
	console.log(assist);
}


function makeResultTable(games) {
		
	// creates a <table> element and a <tbody> element
	var tbl = document.getElementById("trewResultados");
	
	var tblBody = document.getElementById("tableBody");
	if(tblBody != null)
		tbl.removeChild(tblBody);
	
	tblBody = document.createElement('tbody');
	
	tblBody.setAttribute("id", "tableBody");

	// creating all cells
	for (var i= 0; i < games.length; i++) {
		// creates a table row
		var row = document.createElement("tr");

		// Create a <td> element and a text node, make the text
		// node the contents of the <td>, and put the <td> at
		// the end of the table row
		var cell = document.createElement("td");
		var cellText = document.createTextNode(games[i].id);
		cell.appendChild(cellText);
		row.appendChild(cell);
	
		cell = document.createElement("td");
		cellText = document.createTextNode(games[i].enterprise);
		cell.appendChild(cellText);
		row.appendChild(cell);
		
		cell = document.createElement("td");
		cellText = document.createTextNode(games[i].text);
		cell.appendChild(cellText);
		row.appendChild(cell);

		cell = document.createElement("td");
		cellText = document.createTextNode(games[i].inidate);
		cell.appendChild(cellText);
		row.appendChild(cell);

		cell = document.createElement("td");
		cellText = document.createTextNode(games[i].enddate);
		cell.appendChild(cellText);
		row.appendChild(cell);

		// add the row to the end of the table body
		tblBody.appendChild(row);
	}

	// put the <tbody> in the <table>
	tbl.appendChild(tblBody);
}
function showContent (content){
	$.each ($('.content:not('+content+')'), function(k,v){
		$("#"+v.id).hide();
	});
	$(content).show();
}

function navbarClick(content){
	
	if(content === 'oferta')
		listgames(listGamesResult);
	else if (content === 'sala') {
		listoldgames(listGamesResult);
		content = 'oferta';	
	}
	
	$.each ($('.navbar-button:not(a'+content+')'), function(k,v){
		$("#"+v.id).removeClass("active");
	});	
	
	$("#a" + content).addClass("active");
	showContent("#" +content);
}

$('#asala').click(function(e){
	e.preventDefault();	
	navbarClick('sala');

});

$('#aoferta').click(function(e){
	e.preventDefault();	
	navbarClick('oferta');
});

$('#aevento').click(function(e){
	e.preventDefault();
	navbarClick('evento');
});
$('#atag').click(function(e){
	e.preventDefault();	
	navbarClick('tag');
});

$('#aperfil').click(function(e){
	e.preventDefault();
	navbarClick('perfil');
	infoResult();
});

$('#acloseSesion').click(function(e){
	e.preventDefault();
	logout(logoutResult);
});

$('#botonConfirmar').click(function(e) {
	e.preventDefault();
	confirmAssist($('#iid').val(), assistResult);
});

$('#botonTags').click(function(e) {
	e.preventDefault();
	sendEvent($('#iinfo').val(), $('#iinidate').val(), $('#ienddate').val(), eventoResult);
});