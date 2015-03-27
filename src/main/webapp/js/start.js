/**
 *
 * Start screen JS
 */
var productPath = "/revify/services/products";
var userID = "1";//hard-coded for now
var purchasedProducts = [];

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
    try{
        purchasedProducts = response;
        var cardsRow = $('.product-cards>.row');
        var col = "<div class='col-lg-2 col-md-2 col-sm-3 col-xs-3 card'></div>";
        cardsRow.append(col);
        var cnt = 1;
        for(var i in purchasedProducts){
            var product = purchasedProducts[i];
            var imageTag = "<img class='product-img' src='"+product.image + "'>";
            var anchorTag = product.reviewed ? imageTag: "<a id='p_" + i + "' href='#' class='marker'>" + imageTag + "</a>";
            var col = "<div class='col-lg-2 col-md-2 col-sm-3 col-xs-3 card'><div class='product'>" + anchorTag + " </div><div class='product-name'>" + product.productName + "</div><div>";
            cardsRow.append(col);
            cnt++;
        }
        cardsRow.find("a").click(toBeReviewedProductsOnClick);

        while (cnt++ < 30) {
            var col = "<div class='col-lg-2 col-md-2 col-sm-3 col-xs-3 card'></div>";
            cardsRow.append(col);
        }
    }catch(e){
        console.log(e);
        alert("Error loading purchased products");
    }
};

var loadProductsOnError = function(xhr, status, e){
    console.log(e);
    alert("Error in loading purchased products. Please try again");
};

var toBeReviewedProductsOnClick = function(){
    $("body").addClass('loading');

    var el = $(this)[0];
    var id = el.id.split('_')[1];
    window.sessionStorage.setItem("selectedProduct", JSON.stringify(purchasedProducts[id]));
    setTimeout(loadArena, 2000);
};

var loadArena = function(product){
    $("body").removeClass('loading');
    window.location = '/revify/arena2.html';
};

loadProductsPurchasedByUser(userID, "asjhdoiawhdha");
