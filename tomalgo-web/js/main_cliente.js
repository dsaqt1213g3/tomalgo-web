var user;
ERROR_PAGE="error.html";
INIT_PAGE = "login.html";
ENTERPRISE_MAIN_PAGE = "main.html";


function eventoResult(response) {
	if (response.status == 'OK' && response.result.succeed) {
		window.location.href = MAIN_PAGE;
	} else {
		bootbox.alert(response.result.message);
	}
}


function assistResult(response) {
	if (response.status == 'OK' && response.result) {
		bootbox.alert("Has sido confirmado para este evento");
	} else {
		bootbox.alert("Ya estas apuntado para este evento");
	}
}

function loggedResult(response){
	if (response.status === 'OK' && response.result) {
		navbarClick('inicio');
		$('#fullpage').show();
	} else {
		window.location.href = INIT_PAGE;
	}
}

function loggedResult(response){
	if (response.status === 'OK' && response.result) {
		navbarClick('inicio');
		$('#fullpage').show();
	} else {
		window.location.href = INIT_PAGE;
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

function listGamesResult(response){
	if (response.status==='OK'){
		makeResultTable(response.result, true);
	}else{
		window.location.href="error.html";
	}
}

function listOldGamesResult(response){
	if (response.status==='OK'){
		makeResultTable(response.result, false);
	}else{
		window.location.href="error.html";
	}
}

function makeResultTable(games, c) {
		
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

		cell = document.createElement("td");	
		row.appendChild(cell);

		if(games[i].promo && c) {
			var button = document.createElement("button");
			button.setAttribute("type", "submit");
			button.setAttribute("class", "btn btn-success");	
			button.setAttribute("event", games[i].id);		
			button.setAttribute("id", "event" + games[i].id);
			
		 	button.addEventListener('click', function(e) {
				e.preventDefault();
				confirmAssist(e.toElement.getAttribute("event"), assistResult);				
			}, false);

			cellText = document.createTextNode("confirma asistencia");
			button.appendChild(cellText);
			cell.appendChild(button);
		}

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
	$.each ($('.navbar-button:not(a'+content+')'), function(k,v){
		$("#"+v.id).removeClass("active");
	});	
	
	$("#a" + content).addClass("active");
	
	if(content === 'oferta')
		listgames(listGamesResult);
	else if (content === 'sala') {
		listoldgames(listOldGamesResult);
		content = 'oferta';	
	}
	

	showContent("#" +content);
}

$(document).ready(function() {
	var error = $.cookie('user-name') == null || $.cookie('user-enterprise') == null;
	console.log(error);
	if(!error) {
		console.log($.cookie('user-enterprise'));
		if($.cookie('user-enterprise') == "false") {
			logged($.cookie('user-name'), loggedResult);
		} else {
			window.location.href = ENTERPRISE_MAIN_PAGE;	
		}
			
	} else {
		window.location.href = INIT_PAGE;
	}

});


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

$('#botonTags').click(function(e) {
	e.preventDefault();
	var tags= "[";
	var nTags = 0;

	var checkbox = new Array(
		document.tag.inlineCheckbox1,
		document.tag.inlineCheckbox2,
		document.tag.inlineCheckbox3,
		document.tag.inlineCheckbox4,
		document.tag.inlineCheckbox5
	);

	for (var i = 0; i < checkbox.length; i++){
		if (checkbox[i].checked == true)
		{
			if (nTags == 0)
				tags = tags + checkbox[i].value;
			else
				tags = tags + "," + checkbox[i].value;
			nTags++;
		}
	}
	tags = tags + "]";
	updateTags(tags,function(response){ 
		if (response.status == 'OK' && response.result) {
			bootbox.alert("Has seleccionado de forma correcta tus Tags");
		} else {
			bootbox.alert("No se han podido introducir los tags seleccionados");
		}
	});
});