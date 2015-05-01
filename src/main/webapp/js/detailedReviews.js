/**
 * Created by kalyaninirmal on 4/4/2015.
 */


//var detailedReviewPath = "/revify/services/reviews?productID=1&range=individual";

var loadDetailedReviews = function(){

    var productId = sessionStorage.getItem("productID");
    var detailedReviewPath = "/revify/services/reviews?productID="+productId+"&range=individual";
    var url = extractBaseUrl() + detailedReviewPath;
    jQuery.ajax(url, {
        dataType : "json",
        success : detailedReviewOnSuccess,
        error : detailedReviewOnError
    });
};


var extractBaseUrl = function(){
    var urlArr = location.href.split('/');
    var protocol = urlArr[0];
    var host = urlArr[2];
    return protocol + '//' + host;
}

var detailedReviewOnError = function(xhr, status, e){
    console.log(e);
    alert("Error in loading detailed reviews. Please try again");
};

var detailedReviewOnSuccess = function (response, status, xhr){
    var reviews = response;
    var section = document.getElementById('section');
    var container = document.getElementById('container');
    container.className = "container";

    for(var r in reviews){

        var review = reviews[r];
        var productName = document.createElement('div');
        productName.className = "product-name";
        productName.innerText = review.productDTO.productName;

        var row = document.createElement('row');
        row.className = "row";

        for(var j = 0; j  < review.productDTO.productReviewDTOs.length ; j++){

            var col_lg_6 = document.createElement('div');
            col_lg_6.className = "col-lg-6 col-md-6 col-sm-12 col-xs-12";

            var panel_default = document.createElement('div');
            panel_default.className = "panel panel-default";

            var panel_heading = document.createElement('div');
            panel_heading.className = "panel-heading";
            panel_heading.innerText = "User : " + review.productDTO.productReviewDTOs[j].reviewerID;

            var span1 = document.createElement('span');
            span1.className = "pull-right";
            var date = new Date(review.productDTO.productReviewDTOs[j].reviewDate);
            span1.innerText = date.toLocaleDateString();

            var panel_body = document.createElement('div');
            panel_body.className = "panel-body";

            var col_lg_2 = document.createElement('div');
            col_lg_2.className = "col-lg-2 col-md-2 col-sm-2 col-xs-2";

            var span2 = document.createElement('div');
            span2.className = "overall";
            span2.innerText = review.productDTO.productReviewDTOs[j].overallRating;

            var span3 = document.createElement('span');
            span3.innerText = "Overall";
            span2.appendChild(span3);

            var col_lg_10 = document.createElement('div');
            col_lg_10.className = "col-lg-10 col-md-10 col-sm-10 col-xs-10";

            var ul = document.createElement('ul');


            for(var i = 0; i < review.productDTO.productReviewDTOs[j].featureDTOList.length; i++){


                var li = document.createElement('li');
                li.className = "ratings-bar-style";

                var featureWrap = document.createElement('div');
                featureWrap.className = "feature-wrap";

                var span4 = document.createElement('span');
                span4.innerText = review.productDTO.productReviewDTOs[j].featureDTOList[i].featureName;

                var strong = document.createElement('strong');
                strong.className = "pull-right";
                strong.innerText = review.productDTO.productReviewDTOs[j].featureDTOList[i].overallRating;

                featureWrap.appendChild(span4);
                featureWrap.appendChild(strong);

                var barWrap = document.createElement('div');
                barWrap.className = "bar-wrap";

                var a = document.createElement('a');
                a.className = "votes-wrap";

                var ratings = review.productDTO.productReviewDTOs[j].featureDTOList[i].overallRating;

                if(ratings == 5){
                    a.style.width = "93%";
                }
                else if(ratings == 4){
                    a.style.width = "70%";
                }

                else if(ratings == 3){
                    a.style.width = "50%";
                }

                else if(ratings == 2){
                    a.style.width = "30%";
                }

                else {
                    a.style.width = "10%";
                }

                //var span5 = document.createElement('span');
                //span5.className = "votes";
                //a.appendChild(span5);

                barWrap.appendChild(a);

                li.appendChild(featureWrap);
                li.appendChild(barWrap);

                ul.appendChild(li);
            }
            col_lg_10.appendChild(ul);
            col_lg_2.appendChild(span2);
            panel_body.appendChild(col_lg_2);
            panel_body.appendChild(col_lg_10);
            panel_heading.appendChild(span1);
            panel_default.appendChild(panel_heading);
            panel_default.appendChild(panel_body);
            col_lg_6.appendChild(panel_default);
            row.appendChild(col_lg_6);
        }
        container.appendChild(row);
        section.appendChild(productName);
        section.appendChild(container);
    }
}

loadDetailedReviews();