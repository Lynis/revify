/**
 * 
 */

var categoryURL = "http://localhost:8080/revify/services/categories";

var loadCategories = function(){

	jQuery.ajax(categoryURL, {
		dataType : "json",
		success : categoryOnSuccess,
		error : categoryOnError		
	});
};

var categoryOnSuccess = function(response, status, xhr){
	try{
		var categories = response;
		var categoryMenu = $('.dl-menu');
		for(var i in categories){
			var category = categories[i];
			var li = "<li><div><img src=\"" + category.icon +"\"><a href=\"\">"+
					  "<span>" + category.categoryName + "</span></a></div></li>";
			
			categoryMenu.append(li);
		}
	}catch(e){
		console.log(e);
		alert("Error loading page");		
	}
};

var categoryOnError = function(xhr, status, e){
	console.log(e);
	alert("Error in loading categories. Please try again");
};
//******************** sign in ******************************/

var signinURL = "https://localhost:8443/revify/services/signin";

var spinnerOn = function(){
    $('#disablingDiv').attr("display","block");
    //$('#spinner').show();
}

var spinnerOff = function(){
   // $('#spinner').hide();
    $('#disablingDiv').attr("display", "none");
}

var signin = function(){
    spinnerOn();
    jQuery.ajax(signinURL, {
        dataType: "text",
        success: signinOnSuccess,
        error: signinOnError
    });
};

var signinOnSuccess = function(response, status, xhr){
  window.open(response);
  spinnerOff();
};

var signinOnError = function(xhr, status, e){
    console.log(e);
    alert("Error while signing in");
};

$('#login').click(signin);

$(".dl-menuwrapper").hover(function(){
	$(".dl-menu").addClass("dl-menuopen");
}, function(){
	$(".dl-menu").removeClass("dl-menuopen");
});


loadCategories();