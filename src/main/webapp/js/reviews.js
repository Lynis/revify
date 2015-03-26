/**
 * Created by kalyaninirmal on 3/22/2015.
 */

var categories = ["","Mobile", "Camera"];
var selectedCategory;
var selectedCategoryFeatureArray;


function loadProducts(category, featuresArray)
{
    var categoryItems = ["", "Nexus 4", "iPhone 6"];
    selectedCategory = category;
    selectedCategoryFeatureArray = featuresArray;
    removeExistingProductsCards();
    populateFeatureDropdown(selectedCategoryFeatureArray);

    var leftColumn = document.getElementById("leftColumnID");

    for(var i = 1; i < categoryItems.length; i++)
    {
        //creating card for product and feature
        var cardDiv = document.createElement('div');
        cardDiv.className = "card";
        cardDiv.id = "cardID_"+i;

        // create left div on card
        var leftDiv = document.createElement('div');
        leftDiv.className = "left";

        // create right div on card
        var rightDiv = document.createElement('div');
        rightDiv.className = "right";

        // create feature card div for feature icons, pins and feature details
        var featureDiv = document.createElement('div');
        featureDiv.className = "featureCard";

        // create feature details card
        var featureDetailsDiv = document.createElement('div');
        featureDetailsDiv.className = "featureDetails";
        featureDetailsDiv.id = "featureDetailsDiv"+i;

        // create left pin
        var pinLeft  = document.createElement('div');
        pinLeft.className = "pin-left";

        // create right pin
        var pinRight  = document.createElement('div');
        pinRight.className = "pin-right";

        // create feature image
        for(var j = 0; j < featuresArray.length; j++){

            var featureImage = document.createElement('img');
            featureImage.src = "images/"+featuresArray[j]+".jpg";
            featureImage.id = category+"feature_"+i+j;
            featureImage.width = 40;
            featureImage.height = 40;
            var ratingsImage = document.createElement('img');

            if(j == 2){
                ratingsImage.src = "images/dislike.jpg";
            }
            else{
                ratingsImage.src = "images/like.jpg";
            }
            ratingsImage.width = 50;
            ratingsImage.height = 50;

            featureDetailsDiv.appendChild(featureImage);
            featureDetailsDiv.appendChild(ratingsImage);
            featureDetailsDiv.appendChild(document.createElement('br'));
            featureDetailsDiv.appendChild(document.createElement('br'));
        }

        // create product image
        var productImage = document.createElement('img');
        productImage.src = "images/"+category+"_image1.jpg";
        productImage.width = 200;
        productImage.height = 200;

        //create left pin image
        var pinImageLeft = document.createElement('img');
        pinImageLeft.src = "images/blue.png";
        pinImageLeft.width = 35;
        pinImageLeft.height = 35;

        // create right pin image
        var pinImageRight = document.createElement('img');
        pinImageRight.src = "images/blue.png";
        pinImageRight.width = 35;
        pinImageRight.height = 35;

        var button = document.createElement('button');
        button.id = "button_"+i;
        button.onclick = function(){
            var w = window.open();
            w.document.open();
            w.document.write("<h3>Detailed reviews :</h3><fieldset><legend><img src='images/Battery.jpg' width='100' height='100'</img></legend></br><img src='images/user1.jpg' width='100' height='100'</img><img src='images/review-heart.jpg' width='80' height='80'></br><img src='images/user2.jpg' width='100' height='100'</img><img src='images/review-heart.jpg' width='80' height='80'>" +
            "<img src='images/review-heart.jpg' width='80' height='80'><img src='images/review-heart.jpg' width='80' height='80'>" +
            "<img src='images/review-heart.jpg' width='80' height='80'><img src='images/review-heart.jpg' width='80' height='80'></fieldset><br/>" +
            "<fieldset><legend><img src='images/Camera.jpg' width='100' height='100'</img></legend></br><img src='images/user1.jpg' width='100' height='100'</img><img src='images/review-heart.jpg' width='80' height='80'></br>" +
            "<img src='images/user2.jpg' width='100' height='100'</img><img src='images/review-heart.jpg' width='80' height='80'></fieldset></br>" +
            "<fieldset><legend><img src='images/Connectivity.jpg' width='100' height='100'</img></legend><img src='images/user1.jpg' width='100' height='100'</img><img src='images/review-heart.jpg' width='80' height='80'></br><img src='images/user2.jpg' width='100' height='100' </img><img src='images/review-heart.jpg' width='80' height='80'></fieldset>");
            w.document.close();
        }

        var buttonText = document.createTextNode("More..");
        button.appendChild(buttonText);

        pinLeft.appendChild(pinImageLeft);
        pinRight.appendChild(pinImageRight);

        featureDiv.appendChild(pinLeft);
        featureDiv.appendChild(pinRight);
        featureDiv.appendChild(featureDetailsDiv);

        leftDiv.appendChild(productImage);
        rightDiv.appendChild(featureDiv);

        leftDiv.appendChild(button);

        cardDiv.appendChild(leftDiv);
        cardDiv.appendChild(rightDiv);

        leftColumn.appendChild(cardDiv);
    }
}

function populateFeatureDropdown(featuresArray){

    removeFeatureDropDownOptions();

    // populate feature list

    for(var i = 0; i < featuresArray.length ; i++){
        var featureDropdown = document.getElementById('featureDropdown');
        var opt = document.createElement("option");
        opt.value = featuresArray[i];
        featureDropdown.appendChild(opt);
    }
}


function removeFeatureDropDownOptions(){
    var featureDropdownList = document.getElementById('featureDropdown').children;
    if ( featureDropdownList.length > 0 ) {
        document.getElementById('featureDropdown').removeChild( featureDropdownList[0]);
        removeFeatureDropDownOptions('featureDropdown');
    }
}

function selectedValue(){

    var selectedFeature = document.getElementById('featureDropdownValue');
    alert(selectedFeature.value);
    removeFeatures(selectedFeature.value);
}

function removeFeatures(selectedFeature){

    var index = selectedCategoryFeatureArray.indexOf(selectedFeature);
    var sortedFeatureArray = selectedCategoryFeatureArray.splice(index,1);
    loadProducts(selectedCategory, sortedFeatureArray);
}

function removeExistingProductsCards()
{
    var cardDiv = document.getElementsByClassName("card");
    var len = cardDiv.length;
    for(var i = 1; i<= len; i++)
    {
        var card = document.getElementById("cardID_"+i);
        card.parentNode.removeChild(card);
    }
}

