function loadProducts(category)
{
    removeProducts(category);
    var leftColumn = document.getElementById("leftColumnID");
    for(var i = 1; i < 3; i++)
    {
        //creating card for product and feature
        var cardDiv = document.createElement('div');
        cardDiv.className = "card";
        cardDiv.id = category+"cardID_"+i;

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

        // create left pin
        var pinLeft  = document.createElement('div');
        pinLeft.className = "pin-left";

        // create right pin
        var pinRight  = document.createElement('div');
        pinRight.className = "pin-right";

        // create feature image
        var featureImage = document.createElement('img');
        featureImage.src = "img/"+category+"_feature1.jpg";
        featureImage.width = 40;
        featureImage.height = 40;

        // create product image
        var productImage = document.createElement('img');
        productImage.src = "images/"+category+"_image1.jpg";
        productImage.width = 150;
        productImage.height = 150;

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

        pinLeft.appendChild(pinImageLeft);
        pinRight.appendChild(pinImageRight);

        featureDetailsDiv.appendChild(featureImage);

        featureDiv.appendChild(pinLeft);
        featureDiv.appendChild(pinRight);
        featureDiv.appendChild(featureDetailsDiv);

        leftDiv.appendChild(productImage);
        rightDiv.appendChild(featureDiv);

        cardDiv.appendChild(leftDiv);
        cardDiv.appendChild(rightDiv);

        leftColumn.appendChild(cardDiv);
    }
}

function removeProducts(cat)
{
    var cardDiv = document.getElementsByClassName("card");
    var len = cardDiv.length;
    var category = ["mobile", "camera"];
    for(var k = 0; k < category.length; k++)
    {
        if(category[k]!=cat)
        {
            for(var i = 1; i<= len; i++)
            {
                var card = document.getElementById(category[k]+"cardID_"+i);
                card.parentNode.removeChild(card);
            }
        }
    }
}
