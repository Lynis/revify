
var reviewPath = "/revify/services/reviews?categoryID={cid}&range=aggregated";
var detailedReviewPath = "/revify/services/reviews?productID={pid}&range=individual";
var aggReviewsResponse;
var individualReviewResponse;
var pid;

var loadAggReviews = function(){
    var url_aggregated = extractBaseUrl() + reviewPath;
    var cid = location.href.split('=')[2];
    url_aggregated = url_aggregated.replace('{cid}', cid);
    jQuery.ajax(url_aggregated, {
        dataType : "json",
        success : reviewAggOnSuccess,
        error : reviewAggOnError
    });
};

var loadIndiReview = function(){
    var url_individual = extractBaseUrl() + detailedReviewPath;
    var pid_temp_1 = location.href.split('=')[1];
    pid = pid_temp_1.split('&')[0];

    url_individual = url_individual.replace('{pid}', pid);
    jQuery.ajax(url_individual, {
        dataType : "json",
        success : reviewIndividualOnSuccess,
        error : reviewIndividualOnError
    });
}

var extractBaseUrl = function(){
    var urlArr = location.href.split('/');
    var protocol = urlArr[0];
    var host = urlArr[2];
    return protocol + '//' + host;
}

var reviewAggOnSuccess = function (response, status, xhr){
    aggReviewsResponse = response;
    loadReviews();
}

var reviewAggOnError = function(xhr, status, e){
    console.log(e);
    alert("Error in loading aggreagted reviews. Please try again");
};


var reviewIndividualOnError = function(xhr, status, e){
    console.log(e);
    alert("Error in loading individual reviews. Please try again");
};

var reviewIndividualOnSuccess = function (response, status, xhr){
    individualReviewResponse = response;
    loadAggReviews();
}


var loadReviews = function(){

    var reviewsData = aggReviewsResponse;

    if(reviewsData.length == 0){
        alert("Sorry,latest reviews are not available");
    }

    var wrapper = document.getElementById('wrapper');
    var section = document.getElementById('section');
    var container =  document.getElementById('container');
    var heading = document.getElementById('heading');

    var collapse1 = document.createElement('div');
    collapse1.className = "collapse";
    collapse1.id = "user-reviews";

    var individualRow =  document.createElement('div');
    individualRow.className = "row";
    individualRow.style.borderTop = "1px solid #e7e7e7";

    var col_md_1 = document.createElement('div');
    col_md_1.className = "col-md-1";

    individualRow.appendChild(col_md_1);

    var col_md_10 =  document.createElement('div');
    col_md_10.className = "col-md-10";

    for(var r in reviewsData) {

        var review = reviewsData[r];

        if(review.productDTO.productID == pid){

            var span1 = document.createElement('span');
            span1.style.marginLeft = "10%";
            span1.innerText = review.productDTO.productName;
            heading.appendChild(span1);
            container.appendChild(heading);

            var review_wrapper = document.createElement('div');
            review_wrapper.className = "review-wrapper";

            var row = document.createElement('div');
            row.className = "row";

            var col_md_3 = document.createElement('div');
            col_md_3.className = "col-md-3";

            var image = document.createElement('img');
            image.className = "img-responsive";
            image.src = review.productDTO.image;

            col_md_3.appendChild(image);

            var col_md_5 = document.createElement('div');
            col_md_5.className = "col-md-5";
            col_md_5.style.borderLeft = "1px solid #e7e7e7";

            var col_md_3_overall  = document.createElement('div');
            col_md_3_overall.className = "col-md-3 product-overall-rating";

            var rating = document.createElement('div');

            var span2 = document.createElement('span');
            span2.innerText = review.productDTO.overallRating;

            if (review.productDTO.overallRating == 5)
                rating.className = "rating green";
            else if (review.productDTO.overallRating == 4)
                rating.className = "rating light-green";
            else if (review.productDTO.overallRating == 3)
                rating.className = "rating yellow";
            else if (review.productDTO.overallRating == 2)
                rating.className = "rating light-red";
            else if (review.productDTO.overallRating == 1)
                rating.className = "rating red";

            rating.appendChild(span2);
            col_md_3_overall.appendChild(rating);

            var text_center = document.createElement('div');
            text_center.className = "text-center";

            var button = document.createElement('button');
            button.type = "button";
            button.className = "btn btn-primary btn-sm";
            button.style.marginTop = "15px";
            if (review.productDTO.noOfReviews > 1)
                button.innerHTML  = review.productDTO.noOfReviews + " Reviews";
            else
                button.innerHTML = review.productDTO.noOfReviews + " Review";

            button.onclick = function(){
                $(".collapse").collapse('toggle');
            }

            text_center.appendChild(button);

            col_md_3_overall.appendChild(text_center);
            col_md_5.appendChild(col_md_3_overall);

            var feature_list_1 = document.createElement('div');
            feature_list_1.className = "col-md-9";

            var ul_1 = document.createElement('ul');
            ul_1.className = "feature-review-bars";

            for(var i = 0; i < review.productDTO.features.length / 2; i++){

                var overallRating = review.productDTO.features[i].overallRating;
                var li = document.createElement('li');
                var feature_label = document.createElement('div');
                feature_label.className = "feature-label";
                feature_label.innerText = review.productDTO.features[i].featureName;
                var feature_review_bar = document.createElement('div');
                feature_review_bar.className = "feature-review-bar";
                var fill = document.createElement('div');
                document.createAttribute("data-width");
                var feature_rating = document.createElement('div');
                if (overallRating == 5) {
                    feature_rating.className = "feature-rating blue";
                    fill.className = "fill-green fill";
                    fill.style.width = "300px";
                    fill.setAttribute("data-width", '300');
                }
                else if (overallRating == 4) {
                    feature_rating.className = "feature-rating blue";
                    fill.className = "fill-light-green fill";
                    fill.style.width = "250px";
                    fill.setAttribute("data-width", '250');
                }
                else if (overallRating == 3) {
                    feature_rating.className = "feature-rating blue";
                    fill.className = "fill-yellow fill";
                    fill.style.width = "200px";
                    fill.setAttribute("data-width", '200');
                }
                else if (overallRating == 2) {
                    feature_rating.className = "feature-rating blue";
                    fill.className = "fill-light-red fill";
                    fill.style.width = "150px";
                    fill.setAttribute("data-width", '150');
                }
                else {
                    feature_rating.className = "feature-rating blue";
                    fill.className = "fill-red fill";
                    fill.style.width = "100px";
                    fill.setAttribute("data-width", '100');
                }
                feature_rating.innerText = overallRating;
                var clear = document.createElement('div');
                clear.className = "clear";
                li.appendChild(feature_label);
                feature_review_bar.appendChild(fill);
                li.appendChild(feature_review_bar);
                li.appendChild(feature_rating);
                li.appendChild(clear);
                ul_1.appendChild(li);
            }

            var col_md_4 = document.createElement('div');
            col_md_4.className = "col-md-4";

            var feature_list_2 = document.createElement('div');
            feature_list_2.className = "col-md-3";

            var ul_2 = document.createElement('ul');
            ul_2.className = "feature-review-bars";
            ul_2.style.marginTop = "100px";

            if (review.productDTO.features.length > 1) {

                var initialValue = Math.floor(review.productDTO.features.length / 2);
                for (var i = initialValue; i < review.productDTO.features.length; i++) {
                    var overallRating = review.productDTO.features[i].overallRating;
                    var li = document.createElement('li');
                    var feature_label = document.createElement('div');
                    feature_label.className = "feature-label";
                    feature_label.innerText = review.productDTO.features[i].featureName;
                    var feature_review_bar = document.createElement('div');
                    feature_review_bar.className = "feature-review-bar";
                    var fill = document.createElement('div');
                    document.createAttribute("data-width");
                    var feature_rating = document.createElement('div');
                    feature_rating.innerText = overallRating;
                    if (overallRating == 5) {
                        feature_rating.className = "feature-rating blue";
                        fill.className = "fill-green fill";
                        fill.style.width = "100%";
                        fill.setAttribute("data-width", '100');
                    }
                    else if (overallRating == 4) {
                        feature_rating.className = "feature-rating blue";
                        fill.className = "fill-light-green fill";
                        fill.style.width = "80%";
                        fill.setAttribute("data-width", '80');
                    }
                    else if (overallRating == 3) {
                        feature_rating.className = "feature-rating blue";
                        fill.className = "fill-yellow fill";
                        fill.style.width = "60%";
                        fill.setAttribute("data-width", '60');
                    }
                    else if (overallRating == 2) {
                        feature_rating.className = "feature-rating blue";
                        fill.className = "fill-light-red fill";
                        fill.style.width = "40%";
                        fill.setAttribute("data-width", '40');
                    }
                    else {
                        feature_rating.className = "feature-rating blue";
                        fill.className = "fill-red fill";
                        fill.style.width = "20%";
                        fill.setAttribute("data-width", '20');
                    }
                    var clear = document.createElement('div');
                    clear.className = "clear";
                    li.appendChild(feature_label);
                    feature_review_bar.appendChild(fill);
                    li.appendChild(feature_review_bar);
                    li.appendChild(feature_rating);
                    li.appendChild(clear);
                    ul_2.appendChild(li);
                }
            }

            feature_list_1.appendChild(ul_1);
            feature_list_2.appendChild(ul_2);
            col_md_4.appendChild(feature_list_2);
            col_md_5.appendChild(feature_list_1);
            row.appendChild(col_md_3);
            row.appendChild(col_md_5);
            row.appendChild(col_md_4);
            review_wrapper.appendChild(row);
            container.appendChild(review_wrapper);
            section.appendChild(container);
            wrapper.appendChild(section);
        }
    }
    var userReviewsData = individualReviewResponse;

    for(var r in userReviewsData) {

        var userReview = userReviewsData[r];

        var row_indi = document.createElement('row');
        row_indi.className = "row";

        for(var j = 0; j < userReview.productDTO.productReviewDTOs.length; j++){

            var col_lg_6 = document.createElement('div');
            col_lg_6.className = "col-lg-6 col-md-6 col-sm-12 col-xs-12";

            var panel_default = document.createElement('div');
            panel_default.className = "panel panel-default";

            var panel_heading = document.createElement('div');
            panel_heading.className = "panel-heading";
            panel_heading.innerText = "User : " + userReview.productDTO.productReviewDTOs[j].reviewerID;

            var span1 = document.createElement('span');
            span1.className = "pull-right";
            var date = new Date(userReview.productDTO.productReviewDTOs[0].reviewDate);
            span1.innerText = date.toLocaleDateString();

            var panel_body = document.createElement('div');
            panel_body.className = "panel-body";

            var col_lg_2 = document.createElement('div');
            col_lg_2.className = "col-lg-2 col-md-2 col-sm-2 col-xs-2";

            var span2 = document.createElement('div');
            span2.className = "overall";
            span2.innerText = "3";

            var span3 = document.createElement('span');
            span3.innerText = "Overall";
            span2.appendChild(span3);

            var col_lg_10 = document.createElement('div');
            col_lg_10.className = "col-lg-10 col-md-10 col-sm-10 col-xs-10";

            var ul = document.createElement('ul');

            for(var i = 0; i < userReview.productDTO.productReviewDTOs[j].featureDTOList.length; i++){

                var li = document.createElement('li');
                li.className = "ratings-bar-style";

                var featureWrap = document.createElement('div');
                featureWrap.className = "feature-wrap";

                var span4 = document.createElement('span');
                span4.innerText = userReview.productDTO.productReviewDTOs[j].featureDTOList[i].featureName;

                var strong = document.createElement('strong');
                strong.className = "pull-right";
                strong.innerText = userReview.productDTO.productReviewDTOs[j].featureDTOList[i].overallRating;

                featureWrap.appendChild(span4);
                featureWrap.appendChild(strong);

                var barWrap = document.createElement('div');
                barWrap.className = "bar-wrap";

                var a = document.createElement('a');
                a.className = "votes-wrap";

                var ratings = userReview.productDTO.productReviewDTOs[j].featureDTOList[i].overallRating;

                if(ratings == 5){
                    a.style.width = "94%";
                    a.className = "votes-wrap-green";
                }
                else if(ratings == 4){
                    a.style.width = "80%";
                    a.className = "votes-wrap-light-green";
                }

                else if(ratings == 3){
                    a.style.width = "60%";
                    a.className = "votes-wrap-yellow";
                }

                else if(ratings == 2){
                    a.style.width = "40%";
                    a.className = "votes-wrap-light-red";
                }

                else {
                    a.style.width = "20%";
                    a.className = "votes-wrap-red";
                }

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
            row_indi.appendChild(col_lg_6);
            collapse1.appendChild(row_indi);
        }
        col_md_10.appendChild(collapse1);
        individualRow.appendChild(col_md_1);
        individualRow.appendChild(col_md_10);
        section.appendChild(individualRow);
    }


    //var collapse = document.getElementById('user-reviews');


}

loadIndiReview();
