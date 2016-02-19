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
	$('#searchform').on('submit', function(e) {
		e.preventDefault();
		$.ajax({
			type: 'POST', // form submit method get/post
			data: $('#searchform').serialize(),			
			success: function (response) {
				$('#success').html("Loading.");
				$('#error').load();
			}
		});
	});
});