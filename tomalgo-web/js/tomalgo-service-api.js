var API_BASE_URL = "http://tomamos-algo.servehttp.com:8000/tomalgo-service/ServiceServlet?";
var ERROR_PAGE="#";

function logged(username, callback) {
	var action = "action=checkuser&username=" + username + "&callback=?";
	var jqxhr=$.jsonp({
		url:API_BASE_URL + action,
		dataType: "jsonp",
		success:function(response){
			callback(response);
		}
	}).fail(function(){
		tryLocal(action,callback);
	});
}

function checkuser(username,callback) {
	var action = "action=checkusername&username=" + username + "&callback=?"
	var jqxhr = $.jsonp({
		url:API_BASE_URL + action,
		success: function(response){
			callback(response);
		}
	}).fail(function(){
		window.location.href = ERROR_PAGE;
	});
}

function login(username,password,callback){
	var action = "action=login&username="+username+"&password="+SHA1(password)+"&callback=?";
	var jqxhr=$.jsonp({
		url:API_BASE_URL + action,
		success:function(response){
			callback(response);
		}
		}).fail(function(){
			window.location.href = ERROR_PAGE;
		}
	);
}

function registeruser(username,password,mail,birth,callback) {
	var action = "action=register&username="+username+"&password="+SHA1(password)+"&mail="+mail+"&enterprise=0&birth="+birth+"&callback=?";
	var jqxhr=$.jsonp({
		url:API_BASE_URL + action,
		success:function(response){
			callback(response);
		}
		}).fail(function(){
			window.location.href = ERROR_PAGE;
		}
	);
}

function registerbar(username,password,mail,street,callback) {
	var action = "action=register&username="+username+"&password="+SHA1(password)+"&mail="+mail+"&enterprise=1&street="+street+"&callback=?";
	var jqxhr=$.jsonp({
		url:API_BASE_URL + action,
		success:function(response){
			callback(response);
		}
		}).fail(function(){
			window.location.href = ERROR_PAGE;
		}
	);
}

function logout(callback){
	var action = "action=logout&callback=?";
	var jqxhr=$.jsonp({
		url:API_BASE_URL + action,
		success:function(response){
			callback(response);
		}
		}).fail(function(){
			window.location.href = ERROR_PAGE;
		}
	);
}

function decline(password,callback){
	var action = "action=decline&password="+SHA1(password)+"&callback=?";
	var jqxhr=$.jsonp({
		url:API_BASE_URL + action,
		success:function(response){
			callback(response);
		}
		}).fail(function(){
			window.location.href = ERROR_PAGE;
		}
	);
}

function cambiop(oldpassword,newpassword,callback){
	console.log(oldpassword);
	console.log(newpassword);
	var action = "action=changepassword&oldpassword="+oldpassword+"&newpassword="+newpassword+"&callback=?";
	var jqxhr=$.jsonp({
		url:API_BASE_URL + action,
		success:function(response){
			callback(response);
		}
		}).fail(function(){
			window.location.href = ERROR_PAGE;
		}
	);
}

function listgames(callback){
	var action = "action=queryevents&password="+$.cookie('user-pass')+"&callback=?";
	var jqxhr=$.jsonp({
		url:API_BASE_URL + action,
		success:function(response){
			callback(response);
		}
		}).fail(function(){
			window.location.href = ERROR_PAGE;
		}
	);
}

function listoldgames(callback){
	var action = "action=queryoldevents&password="+$.cookie('user-pass')+"&callback=?";
	var jqxhr=$.jsonp({
		url:API_BASE_URL + action,
		success:function(response){
			callback(response);
		}
		}).fail(function(){
			window.location.href = ERROR_PAGE;
		}
	);
}

function assists(id,callback){
	var action = "action=queryassists&password="+$.cookie('user-pass')+"&event="+id+"&callback=?";
	var jqxhr=$.jsonp({
		url:API_BASE_URL + action,
		success:function(response){
			callback(response, id);
		}
		}).fail(function(){
			window.location.href = ERROR_PAGE;
		}
	);
}


function confirmAssist(id,callback){
	var action = "action=confirmassist&password="+$.cookie('user-pass')+"&event="+id+"&callback=?";
	var jqxhr=$.jsonp({
		url:API_BASE_URL + action,
		success:function(response){
			callback(response);
		}
		}).fail(function(){
			window.location.href = ERROR_PAGE;
		}
	);
}

function sendEvent(text,inidate,enddate,isevent,callback){
	var action = "action=sendevent&text="+text+"&inidate="+inidate+"&enddate="+enddate+"&isevent="+isevent+"&callback=?";
	var jqxhr=$.jsonp({
		url:API_BASE_URL + action,
		success:function(response){
			callback(response);
		}
		}).fail(function(){
			window.location.href = ERROR_PAGE;
		}
	);
}

function updateTags(tags,callback){
	var action = "action=updatetags&tags="+ tags +"&callback=?";

	var jqxhr=$.jsonp({
		url:API_BASE_URL + action,
		success:function(response){
			callback(response);
		}
		}).fail(function(){
			window.location.href = ERROR_PAGE;
		}
	);
}

