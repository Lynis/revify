/**
 * Created by jchengottusseriy on 3/5/2015.
 * Gaming JS
 */

var currentFeature = 0;
var selectedProduct;

var createFeatureContainer = function(featureIcon, featureName){
    var el = "<div id='feature-container'><img src='images/bird.gif'><div class='feature'><img src='" + featureIcon +"' ><span>" + featureName +"</span></div></div>";
    $('.copter-region').append(el);
};

var destroyFeatureContainer = function(){
    $('#feature-container').remove();
    var nextFeature = getNextFeature();
    if (nextFeature != null) {
        createFeatureContainer(nextFeature.icon, nextFeature.featureName);
        animateFeatureContainer(800);
    }
}

var animateFeatureContainer = function(left, oncomplete) {
    $('#feature-container').animate({
        left: "+=" + left
    }, 3000, oncomplete);
};

var animateStar = function (star) {
    star.fadeIn(600, star.fadeOut);
}

var begin = function() {
    var feature = getNextFeature();
    createFeatureContainer(feature.icon, feature.featureName);
    animateFeatureContainer(800);
};

var getNextFeature = function(){
    var length = selectedProduct.features.length;
    if (currentFeature < length)
      return selectedProduct.features[currentFeature++];
    return null;
};

$('.push-button-rect').click(function(){
   $('.start').fadeOut(800, function(){
       var inputDiv =  $('.push-btn-group');
       inputDiv.fadeIn(600, begin);
   });

});

$('.push-button').click(function() {
    //fadeOut the feature from view first and on complete delete it.
    var f = $('.feature');
    f.fadeOut(400, f.remove);

    //then animate the bird
    animateFeatureContainer(1000, destroyFeatureContainer);

    //show score
    $(".score").addClass('show');
    //update total score
});

function init(){
    selectedProduct = JSON.parse(window.sessionStorage.getItem("selectedProduct"));
    $('.product-region>img').attr('src',selectedProduct.image);
    $('.product-region>marquee').text(selectedProduct.productName);
}

init();