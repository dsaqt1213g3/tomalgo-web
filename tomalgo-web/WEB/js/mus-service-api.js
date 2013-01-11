var API_BASE_URL = "http://localhost:8080/tomalgo-service/ServiceServlet?";
var ERROR_PAGE="#";

function checkUser(username, callback){
	var url= API_BASE_URL + "action=checkuser&username=" +username+"&callback=?";

	var jqxlhr=$.jsonp({
		url:url,
		success: function(response){
				callback(response);
		}
	}).fail(function(){
		alert("ERROR gordo!!");
	});

}
function search(q, callback) {
  var url = API_BASE_URL + "action=search&query=" + q + "&callback=?";
  url = encodeURI(url);
  var jqxhr = $.jsonp({
    url: url,
    success: function(response) {
      callback(response);
    },
  }).fail(function() {
    window.location.href = ERROR_PAGE;
  });
}


function login(username,password,callback){

	var url= API_BASE_URL + "action=login&username="+username+"&password="+SHA1(password)+"&callback=?";

	var jqxlhr=$.jsonp({
		url:url,
		success: function(response){
				callback(response);
		}
	}).fail(function(){
		window.localtion.href=ERROR_PAGE;
	});

}

function registeruser(username,password,mail,birth,callback) {
	var url= API_BASE_URL + "action=register&username="+username+"&password="+SHA1(password)+"&mail="+mail+"&enterprise=0&birth="+birth+"&callback=?";
	var jqxlhr=$.jsonp({
		url:url,
		success:function(response){
			callback(response);
			
		}
    }).fail(function(){
		window.localtion.href=ERROR_PAGE;
		
    });
}

function registerbar(username,password,mail,street,callback) {
	var action = "action=register&username="+username+"&password="+SHA1(password)+"&mail="+mail+"&enterprise=1&street="+street+"&callback=?";
	var jqxhr=$.jsonp({
		url:API_BASE_URL + action,
		success:function(response){
			callback(response);
			
		}
    }).fail(function(){
		window.localtion.href=ERROR_PAGE;
		
    });
}



function logout(callback){
	var url= API_BASE_URL + "action=logout&callback=?";

	var jqxlhr=$.jsonp({
		url:url,
		success: function(response){
				callback(response);
		}
	}).fail(function(){
		window.localtion.href=ERROR_PAGE;
	});

}

function decline(password,callback){

	var url= API_BASE_URL + "action=decline&password="+SHA1(password)+"&callback=?";

	var jqxlhr=$.jsonp({
		url:url,
		success: function(response){
				callback(response);
		}
	}).fail(function(){
		window.localtion.href=ERROR_PAGE;
	});

}

function cambiop(password,password2,callback){

	var url= API_BASE_URL + "action=changepassword&newpassword="+SHA1(password)+"&oldpassword="+SHA1(password2)+"callback=?";

	var jqxlhr=$.jsonp({
		url:url,
		success: function(response){
				callback(response);
		}
	}).fail(function(){
		window.localtion.href=ERROR_PAGE;
	});

}

function listgames(callback){
	console.log($.cookie('user-pass'));
  var jqxhr=$.jsonp({
    url:API_BASE_URL+"action=queryevents&password="+$.cookie('user-pass')+"&callback=?",
    success:function(response){
      	callback(response);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}


function listoldgames(callback){
	console.log($.cookie('user-pass'));
  var jqxhr=$.jsonp({
    url:API_BASE_URL+"action=queryoldevents&password="+$.cookie('user-pass')+"&callback=?",
    success:function(response){
      	callback(response);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}

function assists(id,callback){
    var jqxhr=$.jsonp({
	    url:API_BASE_URL+"action=queryassists&password="+$.cookie('user-pass')+"&event="+id+"&callback=?", 
	    success:function(response) {
	    	callback(response);
	    },

	    }).fail(function(){
	      window.location.href=ERROR_PAGE;
    });
}

function confirmAssist(id,callback){
    var jqxhr=$.jsonp({
	    url:API_BASE_URL+"action=confirmassist&password="+$.cookie('user-pass')+"&event="+id+"&callback=?", 
	    success:function(response) {
	    	callback(response);
	    },

	    }).fail(function(){
	      window.location.href=ERROR_PAGE;
    });
}

function sendEvent(text,inidate,enddate,callback){
	var url= API_BASE_URL + "action=sendevent&text="+text+"&inidate="+inidate+"&enddate="+enddate+"&isevent=1&callback=?";
	console.log(url);
	var jqxlhr=$.jsonp({
		url:url,
		success: function(response){
				callback(response);
		}
	}).fail(function(){
		window.location.href=ERROR_PAGE;
	});

}