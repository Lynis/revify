/**
 * Created by jchengottusseriy on 3/5/2015.
 */

var createFeatureContainer = function(featureIcon, featureName){
    var el = "<div id='feature-container'><img src='../images/bird.gif'><div class='feature'><img src='" + featureIcon +"' ><span>" + featureName +"</span></div></div>";
    $('.copter-region').append(el);
};

var destroyFeatureContainer = function(){
    $('#feature-container').remove();
    createFeatureContainer('../images/feature_phone.png','Phone');
    animateFeatureContainer(800);
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
    createFeatureContainer('../images/feature_camera.png', 'Camera');
    animateFeatureContainer(800);
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
});
