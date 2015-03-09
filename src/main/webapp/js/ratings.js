
function loadProducts(category)
{
    reset();
    if(category == 1)
    {
        reset();
        var img1 = "img/nexus4.jpg";
        var img2 = "img/iphone6.jpg";
        var label1 = "Nexus 4";
        var label2 = "iPhone 6"
        var feature1 = "img/camera.png";
        var feature2 = "img/battery.png";
        var feature3 = "img/wifi.png";
        var featureRating1 = "2 stars";
        var featureRating2 = "2 stars";
        var featureRating3 = "2 stars";
        loadProductImage(img1, img2);
        loadProductLabel(label1, label2);
        loadFeatures(feature1, feature2, feature3);
        loadFeaturesRatings(featureRating1, featureRating2, featureRating3);
    }
    
    if(category == 2)
    {
        var img1 = "img/sonycamera.jpg";
        var img2 = "img/nikon.jpg";   
        var label1 = "Sony";
        var label2 = "Nikon";
        var feature1 = "img/sonylens.jpg";
        var feature2 = "img/sonylens.jpg";
        var feature3 = "img/sonylens.jpg";
        var featureRating1 = "2 stars";
        var featureRating2 = "2 stars";
        var featureRating3 = "2 stars";
        loadProductImage(img1, img2);
        loadProductLabel(label1, label2);
        loadFeatures(feature1, feature2, feature3);
        loadFeaturesRatings(featureRating1, featureRating2, featureRating3);
    }            
}

function loadProductImage(img1, img2)
{
    document.getElementById("img1").src = img1;
    document.getElementById("img2").src = img2;
}

function loadFeatures(feature1, feature2, feature3)
{
    document.getElementById("featureimg1").src=feature1;
    document.getElementById("featureimg2").src=feature2;
    document.getElementById("featureimg3").src=feature3;
    
    document.getElementById("featureimg4").src=feature1;
    document.getElementById("featureimg5").src=feature2;
    document.getElementById("featureimg6").src=feature3;
    
}

function loadProductLabel(label1, label2)
{
    document.getElementById("product1").innerHTML = label1;
    document.getElementById("product2").innerHTML = label2;    
}

function loadFeaturesRatings(featureRating1,featureRating2,featureRating3)
{
    document.getElementById("feature1").innerHTML = (featureRating1);
    document.getElementById("feature2").innerHTML = (featureRating2);
    document.getElementById("feature3").innerHTML = (featureRating3);
    document.getElementById("feature4").innerHTML = (featureRating1);
    document.getElementById("feature5").innerHTML = (featureRating2);
    document.getElementById("feature6").innerHTML = (featureRating3);
//    document.getElementById("img1").style.display = 'none';
}

function sort()
{
    var selection = document.getElementById("list").value;    
    if(selection == "Camera")
    {
        document.getElementById("featureimg2").style.display = 'none';
        document.getElementById("featureimg3").style.display = 'none';
        document.getElementById("featureimg5").style.display = 'none';
        document.getElementById("featureimg6").style.display = 'none';
        
        document.getElementById("feature2").innerHTML = ("");
        document.getElementById("feature3").innerHTML = ("");        
        document.getElementById("feature5").innerHTML = ("");
        document.getElementById("feature6").innerHTML = ("");        
    }
}

function reset()
{
    document.getElementById("featureimg2").style.visiblity = 'visible';
    document.getElementById("featureimg3").style.display = '';
    document.getElementById("featureimg5").style.display = 'visible';
    document.getElementById("featureimg6").style.display = 'visible';
}
