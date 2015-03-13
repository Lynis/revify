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
		var categoryContainer = $('.category-list');
		for(var i in categories){
			var category = categories[i];
			var li = "<li class=\"category\"><div><a href=\"\">" +
					"<img src=\""+ category.icon + "\" alt=\""+ category.categoryName +"\"></a>" +
					"<span style='font-size:16px;' class='text-right'>" + category.categoryName + "</span></div></li>";
			
			categoryContainer.append(li);
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

loadCategories();