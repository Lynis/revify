/**
 *
 */

var categoryPath = "/revify/services/categories";

var loadCategories = function(){
    var url = extractBaseUrl() + categoryPath;
    jQuery.ajax(url, {
        dataType : "json",
        success : categoryOnSuccess,
        error : categoryOnError
    });
};

var extractBaseUrl = function(){
    var urlArr = location.href.split('/');
    var protocol = urlArr[0];
    var host = urlArr[2];
    return protocol + '//' + host;
}

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
//********************* Latest Reviews **********************/
var categoryArray = [1,3];
var latestReviewsPath = "/revify/services/reviews?range=latest&categoryID=";

var loadLatestReviews = function() {
    for (var i = 0; i < categoryArray.length; i++) {
        getLatestReviews(categoryArray[i]);
    }
};

var getLatestReviews = function(categoryID){
    var url = extractBaseUrl() + latestReviewsPath + categoryID;
    jQuery.ajax(url, {
        dataType: "json",
        success : latestReviewOnSuccess,
        error : latestReviewOnError
    });
};

var latestReviewOnSuccess = function(response, status, e){
    try{
        var reviews = response;
        var reviewContainer = $('#review-container');
        if(reviews!= null && reviews.length != 0){
            var category = reviews[0].categoryName;
            var latestReviewStr = "Latest Reviews";
            var reviewHeadingTemplate  = " <div class=\"row\"><div class=\"col-md-12 review-heading\">" +
                "<span class=\"review-heading-left-block\">" + "categoryHolder" + "</span>"+
                "<a href=\"user-reviews.html\"><span class=\"review-heading-right-block\">See more</span></a></div></div>";
            var row = "<div class=\"row\"></div>";

            var categoryName = latestReviewStr.replace(" ", " " + category + " ");
            var reviewHeading = reviewHeadingTemplate.replace("categoryHolder", categoryName);
            reviewContainer.append(reviewHeading);
            reviewContainer.append(row);

            var reviewCardRow = $('div#review-container > div.row:last-child');

            //var row = $('#review-container:last-child');

            for(var i in reviews) {
                var review = reviews[i];

                var date = new Date(review.reviewDate);
                var reviewTime = date.toDateString();

                var reviewCard = "<div class=\"col-md-3 col-sm-6 col-xs-12\">" +
                    "<div class=\"review-panel review-card\"><div class=\"review-card-image review-border\">" +
                    "<a href=\"\"><img class=\"img-responsive\" src=\"" + review.image + "\">" +
                    "</a></div><div class=\"review-panel-body\">" +
                    "<div class=\"row row-table review-border\"><div class=\"col-xs-12 text-center pv-lg\">" +
                    "<span class=\"fs-20 text-bold\">" + review.productName.substring(0, 15) + "..." + "</span></div></div>" +
                    "<div class=\"row row-table review-border\"><div class=\"col-xs-4 text-center pv-lg\">" +
                    "<img src=\"images/heart-small.png\" class=\"rv-pd img-responsive\"></div><div class=\"col-xs-8 pv-lg text-right fs-14\">" +
                    "<div class=\"m0 text-bold fs-22\">" + review.overallRating + "</div>" +
                    "<div class=\"text-uppercase fs-14\">Rating</div></div></div>" +
                    "<div class=\"row row-table\"><div class=\"col-xs-4 text-center pv-lg\">" +
                    "<span>by <span class=\"reviewer\">" + review.reviwer + "</span></span>" + "</div> <div class=\"col-xs-8 pv-lg text-right\">" +
                    "<span>" + reviewTime + "</span></div></div></div></div></div>";

                reviewCardRow.append(reviewCard);
            }

        }
    }catch(e){
        console.log(e);
        alert("Error while loading latest reviews...");
    }
};

var latestReviewOnError = function(xhr, status, e){
    console.log(e);
    alert("Error loading latest review");
};

//******************** sign in ******************************/

var signinURL = extractBaseUrl() + "/revify/services/signin";

var spinnerOn = function(){
    $('.disablingDiv').show();
    $('#spinner').show();
}

var spinnerOff = function(){
    $('#spinner').hide();
    $('.disablingDiv').hide();
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
    window.open(response, "_self");
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
loadLatestReviews();