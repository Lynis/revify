/**
 *
 * Start screen JS
 */
var productPath = "/revify/services/products";
var userID = location.href.split("=")[1].replace("#","");
var toBeReviewedProducts = [];
var reviewedProducts = [];

var loadProductsPurchasedByUser = function(user,token){
    var url = extractBaseUrl() + productPath + '/' + encodeURIComponent(user) + '?token=' + token;
    jQuery.ajax(url, {
        dataType : "json",
        success : loadProductsOnSuccess,
        error : loadProductsOnError
    });
};
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

var populate = function () {
    var cardsRow = $('.row');
    cardsRow.html('');

  /*  var col = "<div class='col-lg-3 col-md-3 col-sm-4 col-xs-4 card'></div>";
    cardsRow.append(col);*/
    var cnt = 0;
    for(var i in toBeReviewedProducts){
        var product = toBeReviewedProducts[i];
        var imageTag = "<img class='product-img' src='"+product.image + "'>";
        var anchorTag = "<a id='p_" + i + "' href='#' class='marker'>" + imageTag + "</a>";
        var col = "<div class='col-lg-2 col-md-3 col-sm-4 col-xs-4 card'><div class='product'>" + anchorTag + " </div><div class='product-name'><span class='badge'>" + product.productName + "</span></div><div>";
        cardsRow.append(col);
        cnt++;
    }
    cardsRow.find("a").click(toBeReviewedProductsOnClick);

    for(var i in reviewedProducts){
        var product = reviewedProducts[i];
        var imageTag = "<img class='product-img' src='"+product.image + "'>";
        var col = "<div class='col-lg-2 col-md-3 col-sm-4 col-xs-4 card'><div class='product reviewed'>" + imageTag + " </div><div class='product-name'><span class='badge'>" + product.productName + "</span></div><div>";
        cardsRow.append(col);
        cnt++;
    }
    while (cnt++ < 15) {
        var col = "<div class='col-lg-2 col-md-3 col-sm-4 col-xs-4 card'></div>";
        cardsRow.append(col);
    }
};

var toBeReviewedProductsOnClick = function(){
    $("body").addClass('loading');

    var el = $(this)[0];
    var id = el.id.split('_')[1];
    window.sessionStorage.setItem("selectedProduct", JSON.stringify(toBeReviewedProducts[id]));
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
        $(".row").html('<div class="table-responsive"><table class="table table-striped">' +
        '<thead><tr><th>Player</th><th># of Products Reviewed</th><th>Points</th></tr></thead><tbody>'+
        '<tr><td>joe</td><td>3</td><td>300</td></tr>' +
        '<tr><td>joe</td><td>3</td><td>300</td></tr>' +
        '<tr><td>joe</td><td>3</td><td>300</td></tr>' +
        '<tr><td>joe</td><td>3</td><td>300</td></tr>' +
        '<tr><td>joe</td><td>3</td><td>300</td></tr>' +
        '<tr><td>joe</td><td>3</td><td>300</td></tr>' +
        '<tr><td>joe</td><td>3</td><td>300</td></tr>' +
        '<tr><td>joe</td><td>3</td><td>300</td></tr>' +
        '<tr><td>joe</td><td>3</td><td>300</td></tr>' +
        '<tr><td>joe</td><td>3</td><td>300</td></tr>' +
        '<tr><td>joe</td><td>3</td><td>300</td></tr>' +
        '<tr><td>joe</td><td>3</td><td>300</td></tr>' +
        '<tr><td>joe</td><td>3</td><td>300</td></tr>' +
        '<tr><td>joe</td><td>3</td><td>300</td></tr>' +
        '<tr><td>joe</td><td>3</td><td>300</td></tr>' +
        '</tbody></table></div>');


    } else {
        loadProductsPurchasedByUser(userID, "afasdadasd");
    }
});


loadProductsPurchasedByUser(userID, "asjhdoiawhdha");
