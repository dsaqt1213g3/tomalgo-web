var user;
ERROR_PAGE="error.html";
INIT_PAGE = "login.html";
CLIENT_MAIN_PAGE = "main_cliente.html";

function eventoResult(response) {
	if (response.status == 'OK') {
		$('#iinfo').val("");
		$('#iinidate').val("");
		$('#iinitime').val("");
		$('#ienddate').val("");
		$('#iendtime').val("");
		$('#isuscripcion')[0].checked = false;
		bootbox.alert("Se ha podido enviar con exito");
	} else {
		bootbox.alert(response.result.message);
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


//$.cookie('minecraft-user', username);

function listGamesResult(response){
	if (response.status==='OK'){
		makeResultTable(response.result);
	}else{
		window.location.href="error.html";
	}
}

function assistResult(response, id){
	var cell = document.getElementById("assist" + id);
	cellText = document.createTextNode(response.result);
	cell.appendChild(cellText);
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

		cell = document.createElement("td");		
		cell.setAttribute("id", "assist" + games[i].id);
		row.appendChild(cell);

		if(games[i].promo) {
			assists(games[i].id, assistResult);
		} else {
			cellText = document.createTextNode("No es promo");
			cell.appendChild(cellText);
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
	if(content === 'sala')
		listgames(listGamesResult);
	$("#a" + content).addClass("active");
	showContent("#" + content);
}


$(document).ready(function() {
	var error = $.cookie('user-name') == null || $.cookie('user-enterprise') == null;
	console.log(error);
	if(!error) {
		console.log($.cookie('user-enterprise'));
		if($.cookie('user-enterprise') == "true") {
			logged($.cookie('user-name'), loggedResult);
		} else {
			window.location.href = CLIENT_MAIN_PAGE;	
		}
			
	} else {
		window.location.href = INIT_PAGE;
	}

});

$('#asala').click(function(e){
	e.preventDefault();	
	navbarClick('sala');
});

$('#atag').click(function(e){
	e.preventDefault();	
	navbarClick('tag');
});

$('#aevento').click(function(e){
	e.preventDefault();
	navbarClick('evento');
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

$('#botonEvento').click(function(e) {
	e.preventDefault();
	if($('#iinitime').val() == "" || $('#iinidate').val() == "" || 
	   $('#iendtime').val() == "" || $('#ienddate').val() == "" || $('#iinfo').val() == "") {
		bootbox.alert("No puedes dejar campos en balanco");
	} else {
		var suscripcion = "0";
		if($('#isuscripcion')[0].checked){
			suscripcion = "1";
		}
		sendEvent($('#iinfo').val(),
				  $('#iinidate').val() + " " +  $('#iinitime').val(),
				  $('#ienddate').val() + " " +  $('#iendtime').val(),
				  suscripcion,
				  eventoResult);
	}
	
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
