											// LOGIN PAGE
/* ================================================================================================ */

// check the LOGIN form
function ValidLogForm(f) {
	if (f.username.value == "") {document.getElementById("user_error").innerHTML = "Please fill in your username."; return false;}
	if (f.password.value == "") {document.getElementById("password_error").innerHTML = "Please fill in your password."; return false;}
	if (f.username.value.length > 12) {document.getElementById("user_error").innerHTML = "Please pick a username that is less than or equal to 12 characters."; return false;}
	if (f.password.value.length < 6 || f.password.value.length > 15) {document.getElementById("password_error").innerHTML = "The password should be between 6 and 15 characters."; return false;}
	return true; }



											// SIGNUP PAGE
/* ================================================================================================ */
	
// check the SIGNUP form
function ValidSignForm(f) {
	if (f.username.value == "") {document.getElementById("user_error").innerHTML = "Please fill in your username."; return false;}
	if (f.password.value == "") {document.getElementById("password_error").innerHTML = "Please fill in your password."; return false;}
	if (f.email.value == "") {document.getElementById("email_error").innerHTML = "Please fill in your email."; return false;}
	if (f.username.value.length > 12) {document.getElementById("user_error").innerHTML = "Please pick a username that is less than or equal to 12 characters."; return false;}
	if (f.password.value.length < 6 || f.password.value.length > 14) {document.getElementById("password_error").innerHTML = "The password should be between 6 and 14 characters."; return false;}
	if (!ValidEmail(f.email.value)) {document.getElementById("email_error").innerHTML = "The given email is not valid."; return false;}
	return true; }

// check if the email is valid
function ValidEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
	}

	

											// INDEX PAGE
/* ================================================================================================ */

// when we choose one of the four different sources (APIs), changes the color of 'a' tag and filters the results
function activate(x) {
	document.getElementById("1").className = "1";
	document.getElementById("2").className = "2";
	document.getElementById("3").className = "3";
	document.getElementById("4").className = "4";
	document.getElementById(x).className = "active";
	
	document.getElementById("1api").className = "hidden";
	document.getElementById("2api").className = "hidden";
	document.getElementById("3api").className = "hidden";
	document.getElementById("4api").className = "hidden";
	
	document.getElementById(x.concat("api")).className = "dict_results";
}

// fill in the result's attributes in order to display the result on the modal pop up
function addCategory(title, url, readingRating, sentimentRating) {
	document.getElementById("resultTitle").innerHTML="&nbsp &nbsp Title: "+title;
	document.getElementById("resultUrl").innerHTML="&nbsp &nbsp Url: <a href="+url+" target='_blank'>"+url+"</a>";
	document.getElementById("resultRscore").innerHTML="&nbsp &nbsp Reading ease score: "+readingRating;
	document.getElementById("resultSscore").innerHTML="&nbsp &nbsp Sentiment: "+sentimentRating;
}

// fetch the result's attributes and make a POST request with AJAX, passing those attributes
function sendResults(){
	var titleDiv=document.getElementById("resultTitle").innerHTML;
	var title=titleDiv.substring(21);
	
	var urlDiv=document.getElementById("resultUrl").innerHTML;
	var urlFetch=urlDiv.match('href="(.*)" target');
	var url=urlFetch[1];
	
	
	var readingRatingDiv=document.getElementById("resultRscore").innerHTML;
	var readingRating=readingRatingDiv.substring(34);
	
	var sentimentRatingDiv=document.getElementById("resultSscore").innerHTML;
	var sentimentRating=sentimentRatingDiv.substring(25);
	
	var selected=document.getElementById("selectCategory");
	var selectedCategory = selected.options[selected.selectedIndex].value;
	
	if (selectedCategory=="specify") {
		var selectedCategory=document.getElementById("newcategoryid").value;
	}

	if (selectedCategory=='') { alert("Please specify a category name."); return false; }

	$.ajax({
		type: "POST",
        url: "/searchapp/",
        data: {
			csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			title: title,
			url: url,
			readingRating: readingRating,
			sentimentRating: sentimentRating,
			category: selectedCategory,
		},
        success: function(){
			// change the '+' with a tick
			document.getElementById(url).src="/static/images/tick.png"
			document.getElementById(url).onclick=function() { alert("This result has already been reviewed.") }
		},
		error: function(){
			alert("Could not save it.");
		}
		
    });
}

// "LOADING GIF"
function load() {
	document.getElementById('loading').innerHTML = '<img src="/static/images/loading.gif" alt="Loading" height="20%" width="20%">';
}

// display a pop over, stating what is the web app about
$(document).ready(function(){
    $('[data-toggle="aboutpopoverdown"]').popover({
		placement: 'left',
        title: '<p> Federated Health Search Application:',
        content: '<p>The purpose of this application is to help people find out about particular conditions and to save the information that they find into different folders. The application lets people search across two different medical sites (medline and healthfinder) and the general web (bing). People using the application would like to self diagnose, i.e. given some symptoms find out what are the likely conditions. They would also like to find out information about particular conditions, treatments and medicines. The application should help the users understand if the information is easy to read, is loaded with senitment and subjectivity.</p>',
		html:true });
});



											// PROFILE PAGE
/* ================================================================================================ */
	
// alert window, notifying the user and displaying their email (the one they used for our web app)
function avatar(email) {
    alert("-make a registration in Gravatar to upload your avatar\n-use the email you provided to us: "+email);
}

// create a category (make a POST request with AJAX, passing the name of the category)
function createCategory() {
	var name=document.getElementById("newcategoryid").value;
	$.ajax({
		type: "POST",
        url: "/searchapp/profile",
        data: {
			csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			newCategory: name,
			nameCategory: '',
			urlPage: '',
		},
        success: function(){
			$("#profile_categories").load(location.href+" #profile_categories>*","");
		},
		error: function(){
			alert("Could not create it.");
		}
		
    });
}

// delete a category (make a POST request with AJAX)
function deleteCategory(name) {
	if (!confirm("Are you sure you want to delete this category?") == true) return false;
	$.ajax({
		type: "POST",
        url: "/searchapp/profile",
        data: {
			csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			nameCategory: name,
			urlPage: '',
		},
        success: function(){
			// refresh the div
			$("#profile_categories").load(location.href+" #profile_categories>*","");
		},
		error: function(){
			alert("Could not delete it.");
		}
		
    });
}

// delete page (make a POST request with AJAX)
function deletePage(name) {
	if (!confirm("Are you sure you want to delete this page?") == true) return false;
	$.ajax({
		type: "POST",
        url: "/searchapp/profile",
        data: {
			csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			urlPage: name,
			nameCategory: '',
		},
        success: function(){
			// refresh the div
			$(".unhidden").load(location.href+" .unhidden>*","");
		},
		error: function(){
			alert("Could not delete it.");
		}
		
    });
}

// When a category is clicked, it shows the pages (hides/unhides them)
function show(cat_id, keys) {
	if (document.getElementById(cat_id).className=="unhidden") {
		document.getElementById(cat_id).className="hidden";
		document.getElementById(cat_id+"h1").innerHTML="+ "+cat_id;
	}
	else {
		document.getElementById(cat_id).className="unhidden";
		document.getElementById(cat_id+"h1").innerHTML="- "+cat_id;
	}
}



											// CONTACT PAGE
/* ================================================================================================ */

// check if CONTACT form is valid
function ValidContactForm(f) {
	if (f.name.value == "") {document.getElementById("name_error").innerHTML = "Please fill in your name."; return false;}
	if (f.name.value.length > 16) {document.getElementById("name_error").innerHTML = "Please use a name that is less than 17 characters."; return false;}
	if (f.email.value == "") {document.getElementById("email_error").innerHTML = "Please fill in your email."; return false;}
	if (!ValidEmail(f.email.value)) {document.getElementById("email_error").innerHTML = "The given email is not valid."; return false;}
	if (f.message.value == "") {document.getElementById("message_error").innerHTML = "Please fill in your message."; return false;}
	if (f.message.value.length > 500) {document.getElementById("message_error").innerHTML = "The message should not be more than 500 characters."; return false;}
	return true; }
	

	
											// SEND_EMAIL PAGE
/* ================================================================================================ */

// check if CONTACT form is valid (for superusers only, contacting users)
function ValidContactUserForm(f) {
	if (f.email.value == "") {document.getElementById("email_error").innerHTML = "Please fill in email."; return false;}
	if (!ValidEmail(f.email.value)) {document.getElementById("email_error").innerHTML = "The given email is not valid."; return false;}
	if (f.subject.value == "") {document.getElementById("subject_error").innerHTML = "Please fill in the subject."; return false;}
	if (f.message.value == "") {document.getElementById("message_error").innerHTML = "Please fill in your message."; return false;}
	if (f.message.value.length > 500) {document.getElementById("message_error").innerHTML = "The message should not be more than 500 characters."; return false;}
	return true; }
	
// pop up window, containing the "contact" template
function contactus(){
	var left = (screen.width/2)-(400/2);
	var top = (screen.height/2)-(400/2);
    popupWindow = window.open(
	'/searchapp/contact/', 'Contact us', 'height=400,width=450, resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes, top='+top+', left='+left);
}



											// SIGNUP/LOGIN/LOGOUT
/* ================================================================================================ */

// display a pop over, stating what is the web app about
$(document).ready(function(){
    $('[data-toggle="aboutpopoverup"]').popover({
		placement: 'top',
        title: '<p> Federated Health Search Application:',
        content: '<p>The purpose of this application is to help people find out about particular conditions and to save the information that they find into different folders. The application lets people search across two different medical sites (medline and healthfinder) and the general web (bing). People using the application would like to self diagnose, i.e. given some symptoms find out what are the likely conditions. They would also like to find out information about particular conditions, treatments and medicines. The application should help the users understand if the information is easy to read, is loaded with senitment and subjectivity.</p>',
		html:true });
});
