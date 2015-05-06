/**
 *
 * Start screen JS
 */

var productPath = "/revify/services/products";
var leaderboardPath = "/revify/services/leaderboard";
var userID = location.href.split("=")[1].replace("#","");
var toBeReviewedProducts = [];
var reviewedProducts = [];

String.prototype.trunc = String.prototype.trunc ||
function(n){
    return this.length>n ? this.substr(0,n-1)+'&hellip;' : this;
};

var loadProductsPurchasedByUser = function(user,token){
    var url = extractBaseUrl() + productPath + '/' + encodeURIComponent(user) + '?token=' + token;
    jQuery.ajax(url, {
        dataType : "json",
        success : loadProductsOnSuccess,
        error : loadProductsOnError
    });
};

$('#feedback').click(function () {
   location.href = "/revify/feedback.html?un=" + userID;
});

var extractBaseUrl = function(){
    var urlArr = location.href.split('/');
    var protocol = urlArr[0];
    var host = urlArr[2];
    return protocol + '//' + host;
}


var loadProductsOnSuccess = function(response, status, xhr){
    $($(".main>ul>li")[0]).addClass('active');
    try{
        var purchasedProducts = response;
        reviewedProducts = [];
        toBeReviewedProducts = [];
        for(var i in purchasedProducts) {
            var product = purchasedProducts[i];
            if (product.reviewed){
                reviewedProducts.push(product);
            }else {
                toBeReviewedProducts.push(product);
            }
        }
        populate();
    }catch(e){
        console.log(e);
        alert("Error loading purchased products");
    }
};

var loadProductsOnError = function(xhr, status, e){
    console.log(e);
    alert("Error in loading purchased products. Please try again");
};

var loadLeaderboard = function(){
    var url = extractBaseUrl() + leaderboardPath;
    jQuery.ajax(url, {
        dataType : "json",
        success : loadLeaderboardOnSuccess,
        error : loadLeaderboardOnError
    });
};

var loadLeaderboardOnSuccess = function(response, status, xhr){
    var html = '<div class="table-responsive"><table class="table table-striped">' +
        '<thead><tr><th>Player</th><th># of Products Reviewed</th><th>Points</th></tr></thead><tbody>';
    try{
        var leaderboard = response;
        for(var i in leaderboard) {
            var player = leaderboard[i];
            html += '<tr><td>'+ player.userID +'</td><td>' + player.noOfProductsReviewed + '</td><td>'+ player.totalScore +'</td></tr>'
        }
        html += '</tbody></table></div>';
        $("div.product-cards>div.row").html(html);
    }catch(e){
        console.log(e);
        alert("Error loading leaderboard");
    }
};

var loadLeaderboardOnError = function(xhr, status, e){
    console.log(e);
    alert("Error in loading leaderboard. Please try again");
};

var populate = function () {
    var cardsRow = $('div.product-cards>div.row');
    cardsRow.html('');

  /*  var col = "<div class='col-lg-3 col-md-3 col-sm-4 col-xs-4 card'></div>";
    cardsRow.append(col);*/
    var cnt = 0;
    for(var i in toBeReviewedProducts){
        var product = toBeReviewedProducts[i];
        var imageTag = "<img class='product-img' src='"+product.image + "'>";
        var anchorTag = "<a id='p_" + i + "' href='#' class='marker'>" + imageTag + "</a>";
        var col = "<div class='col-lg-2 col-md-3 col-sm-4 col-xs-4 card'><div class='product'>" + anchorTag + " </div><div class='product-name'><span data-toggle='tooltip' class='badge' title='"+ product.productName + "'>" + product.productName.trunc(20) + "</span></div><div>";
        cardsRow.append(col);
        cnt++;
    }
    cardsRow.find("a").click(toBeReviewedProductsOnClick);

    for(var i in reviewedProducts){
        var product = reviewedProducts[i];
        var imageTag = "<img class='product-img-r' src='"+product.image + "'>";
        var col = "<div class='col-lg-2 col-md-3 col-sm-4 col-xs-4 card'><span data-toggle=\"tooltip\"  title=\"Overall Rating\" class='rating-span badge pull-right'>" + product.overallRating + "</span><div class='product reviewed'>" + imageTag + " </div><div class='product-name'><span data-toggle='tooltip' class='badge' title='"+ product.productName + "'>" + product.productName.trunc(20) + "</span></div><div>";
        cardsRow.append(col);
        cnt++;
    }
    var l = screen.height <= 700 ? 9:15;
    while (cnt++ < l) {
        var col = "<div class='col-lg-2 col-md-3 col-sm-4 col-xs-4 card'></div>";
        cardsRow.append(col);
    }
    $("[data-toggle=\"tooltip\"]").tooltip();
};

var toBeReviewedProductsOnClick = function(){
    $("body").addClass('loading');

    var el = $(this)[0];
    var id = el.id.split('_')[1];
    window.sessionStorage.setItem("selectedProduct", JSON.stringify(toBeReviewedProducts[id]));
    window.sessionStorage.setItem("userName", userID);
    setTimeout(loadArena, 2000);
};

var loadArena = function(product){
    $("body").removeClass('loading');
    window.location = '/revify/arena_new.html';
};

$(".main>ul>li>a").click(function(){
    $(".main>ul>li").removeClass('active');
    $(this).parent().addClass('active');

    var id = $(this)[0].id;
    if (id == 'leaderboard'){
        loadLeaderboard();
    } else {
        loadProductsPurchasedByUser(userID, "afasdadasd");
    }
});


loadProductsPurchasedByUser(userID, "asjhdoiawhdha");
