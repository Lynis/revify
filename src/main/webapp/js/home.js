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

$(".dl-menuwrapper").hover(function(){
	$(".dl-menu").addClass("dl-menuopen");
}, function(){
	$(".dl-menu").removeClass("dl-menuopen");
});


loadCategories();