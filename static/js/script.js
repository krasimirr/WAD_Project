function ValidLogForm(f) {
	if (f.username.value == "") {document.getElementById("user_error").innerHTML = "Please fill in your username."; return false;}
	if (f.password.value == "") {document.getElementById("password_error").innerHTML = "Please fill in your password."; return false;}
	if (f.username.value.length > 12) {document.getElementById("user_error").innerHTML = "Please pick a username that is less than or equal to 12 characters."; return false;}
	if (f.password.value.length < 6 || f.password.value.length > 15) {document.getElementById("password_error").innerHTML = "The password should be between 6 and 15 characters."; return false;}
	return true; }
			

function ValidSignForm(f) {
	if (f.username.value == "") {document.getElementById("user_error").innerHTML = "Please fill in your username."; return false;}
	if (f.password.value == "") {document.getElementById("password_error").innerHTML = "Please fill in your password."; return false;}
	if (f.email.value == "") {document.getElementById("email_error").innerHTML = "Please fill in your email."; return false;}
	if (f.username.value.length > 12) {document.getElementById("user_error").innerHTML = "Please pick a username that is less than or equal to 12 characters."; return false;}
	if (f.password.value.length < 6 || f.password.value.length > 14) {document.getElementById("password_error").innerHTML = "The password should be between 6 and 14 characters."; return false;}
	if (!ValidEmail(f.email.value)) {document.getElementById("email_error").innerHTML = "The given email is not valid."; return false;}
	return true;
	}


function ValidEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
	}


function reload(){
	var container = document.getElementById("error");
	var content = container.innerHTML;
	container.innerHTML= content;
	}

	$(document).ready(function () {
	$('#searchformm').on('submit', function(e) {
		e.preventDefault();
		$.ajax({
			type: 'POST', // form submit method get/post
			data: $('#searchform').serialize(),			
			success: function (response) {
				document.getElementById("resulid").className = "unhidden";
				//$('#success').html("");

			}
		});
	});
});

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}

function activate(x) {
	document.getElementById("1").className = "1";
	document.getElementById("2").className = "2";
	document.getElementById("3").className = "3";
	document.getElementById("4").className = "4";
	document.getElementById(x).className = "active";
	//post('/searchapp/',{name: 'Johnny Bravo'});
}	

function load() {
	document.getElementById('loading').innerHTML = '<img src="/static/loading.gif" alt="Loading" height="20%" width="20%">';
}


//function resizeDiv() {
//	vph = $(window).height();
//	$('').css({'max-height': vph/3});
//}


//function unhide () {
//	document.getElementById("results_hidden").className = "unhidden";
//}