/**
 * Created by kalyaninirmal on 3/28/2015.
 */


var reviewPath = "/revify/services/reviews?categoryID=1&range=aggregated";

var loadAggrReviews = function(){
    document.getElementById('featureDropdownValue').innerHTML = "";
    var url = extractBaseUrl() + reviewPath;
    jQuery.ajax(url, {
        dataType : "json",
        success : reviewOnSuccess,
        error : reviewOnError
    });
};


var extractBaseUrl = function(){
    var urlArr = location.href.split('/');
    var protocol = urlArr[0];
    var host = urlArr[2];
    return protocol + '//' + host;
}

var reviewOnError = function(xhr, status, e){
    console.log(e);
    alert("Error in loading reviews. Please try again");
};

var reviewOnSuccess = function (response, status, xhr){

    var products = response;
    var section = document.getElementById('section');
    var container =  document.getElementById('container');

    if(products[0].productDTO.features != null){

        populateFeatureDropdown(products[0].productDTO.features);

        for(var p in products)
        {
            var product = products[p];
            var review_wrapper = document.createElement('div');
            review_wrapper.className  = "review-wrapper";
            var row = document.createElement('div');
            row.className = "row";
            var col_md_3 = document.createElement('col-md-3');
            col_md_3.className = "col-md-3";

            var image = document.createElement('img');
            image.src = product.productDTO.image;
            image.className = "img-responsive";
            image.id = product.productDTO.productID;
            image.onclick = function(){
                var productId = this.id;
                sessionStorage.setItem("productID", productId);
                window.location.href = "detailedReviews.html";
            };
            var product_heading = document.createElement('div');
            product_heading.className = "text-center product-heading";
            product_heading.innerText = product.productDTO.productName;

            col_md_3.appendChild(image);
            col_md_3.appendChild(product_heading);
            var col_md_5 = document.createElement('div');
            col_md_5.className = "col-md-5";
            var product_overall_rating = document.createElement('div');
            product_overall_rating.className = "col-md-3 product-overall-rating";
            var a = document.createElement('a');
            //a.href = "detailedReviews.html";
            var span1 = document.createElement('span');
            span1.className = "review-count";
            if(product.productDTO.noOfReviews > 1)
                span1.innerText = product.productDTO.noOfReviews + " Reviews";
            else
                span1.innerText = product.productDTO.noOfReviews + " Review";
            a.appendChild(span1);
            var rating = document.createElement('div');
            var span1 = document.createElement('span');
            span1.innerText = product.productDTO.overallRating;
            if(product.productDTO.overallRating == 5)
                rating.className = "rating green";
            else if(product.productDTO.overallRating == 4)
                rating.className = "rating light-green";
            else if(product.productDTO.overallRating == 3)
                rating.className = "rating yellow";
            else if(product.productDTO.overallRating == 2)
                rating.className = "rating light-red";
            else if(product.productDTO.overallRating == 1)
                rating.className = "rating red";
            rating.appendChild(span1);
            product_overall_rating.appendChild(rating);
            product_overall_rating.appendChild(a);
            col_md_5.appendChild(product_overall_rating);
            row.appendChild(col_md_3);
            var col_md_9 = document.createElement('div');
            col_md_9.className = "col-md-9";
            var ul_1 = document.createElement('ul');
            ul_1.className = "feature-review-bars";

            for(var i = 0; i < product.productDTO.features.length/2; i++){

                var overallRating = product.productDTO.features[i].overallRating;
                var li  = document.createElement('li');
                var feature_label = document.createElement('div');
                feature_label.className = "feature-label";
                feature_label.innerText = product.productDTO.features[i].featureName;
                var feature_review_bar = document.createElement('div');
                feature_review_bar.className = "feature-review-bar";
                var fill = document.createElement('div');
                document.createAttribute("data-width");
                var feature_rating = document.createElement('div');
                if(overallRating == 5){
                    feature_rating.className = "feature-rating green";
                    fill.className = "fill-green fill";
                    fill.style.width = "300px";
                    fill.setAttribute("data-width", '300');
                }
                else if(overallRating == 4){
                    feature_rating.className = "feature-rating light-green";
                    fill.className = "fill-light-green fill";
                    fill.style.width = "250px";
                    fill.setAttribute("data-width", '250');
                }
                else if(overallRating == 3){
                    feature_rating.className = "feature-rating yellow";
                    fill.className = "fill-yellow fill";
                    fill.style.width = "200px";
                    fill.setAttribute("data-width", '200');
                }
                else if(overallRating == 2){
                    feature_rating.className = "feature-rating light-red";
                    fill.className = "fill-light-red fill";
                    fill.style.width = "150px";
                    fill.setAttribute("data-width", '150');
                }
                else {
                    feature_rating.className = "feature-rating red";
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

            var ul_2 = document.createElement('ul');
            ul_2.className = "feature-review-bars";

            if(product.productDTO.features.length > 1){
                var initialValue = Math.floor(product.productDTO.features.length/2);
                for(var i = initialValue; i < product.productDTO.features.length; i++){
                    var overallRating = product.productDTO.features[i].overallRating;
                    var li  = document.createElement('li');
                    var feature_label = document.createElement('div');
                    feature_label.className = "feature-label";
                    feature_label.innerText = product.productDTO.features[i].featureName;
                    var feature_review_bar = document.createElement('div');
                    feature_review_bar.className = "feature-review-bar";
                    var fill = document.createElement('div');
                    document.createAttribute("data-width");
                    var feature_rating = document.createElement('div');
                    feature_rating.innerText = overallRating;
                    if(overallRating == 5){
                        feature_rating.className = "feature-rating green";
                        fill.className = "fill-green fill";
                        fill.style.width = "300px";
                        fill.setAttribute("data-width", '300');
                    }
                    else if(overallRating == 4){
                        feature_rating.className = "feature-rating light-green";
                        fill.className = "fill-light-green fill";
                        fill.style.width = "250px";
                        fill.setAttribute("data-width", '250');
                    }
                    else if(overallRating == 3){
                        feature_rating.className = "feature-rating yellow";
                        fill.className = "fill-yellow fill";
                        fill.style.width = "200px";
                        fill.setAttribute("data-width", '200');
                    }
                    else if(overallRating == 2){
                        feature_rating.className = "feature-rating light-red";
                        fill.className = "fill-light-red fill";
                        fill.style.width = "150px";
                        fill.setAttribute("data-width", '150');
                    }
                    else {
                        feature_rating.className = "feature-rating red";
                        fill.className = "fill-red fill";
                        fill.style.width = "100px";
                        fill.setAttribute("data-width", '100');
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

            col_md_9.appendChild(ul_1);
            col_md_4.appendChild(ul_2);
            col_md_5.appendChild(col_md_9);
            row.appendChild(col_md_5);
            row.appendChild(col_md_4);
            review_wrapper.appendChild(row);
            container.appendChild(review_wrapper);
            section.appendChild(container);
        }
    }
    else{
        reviewOnError();
    }
}

function populateFeatureDropdown(featuresArray){

    removeFeatureDropDownOptions();

    // populate feature list
    if(featuresArray != null){
        for(var i = 0; i < featuresArray.length ; i++){
            var featureDropdown = document.getElementById('featureDropdown');
            var opt = document.createElement("option");
            opt.value = featuresArray[i].featureName;
            featureDropdown.appendChild(opt);
        }
    }
}

function showButton(){
    var filter = document.getElementById('filter');
    filter.disabled = false;
}

function selectedValue(){
    var selectedFeature = document.getElementById('featureDropdownValue');
    if(selectedFeature.value != "") {
        sessionStorage.setItem("featureName", selectedFeature.value);
        sessionStorage.setItem("categoryID", "1");
        window.location.href = "sortedReviews.html";
    }
}

function removeFeatureDropDownOptions(){
    var featureDropdownList = document.getElementById('featureDropdown').children;
    if ( featureDropdownList.length > 0 ) {
        document.getElementById('featureDropdown').removeChild( featureDropdownList[0]);
        removeFeatureDropDownOptions('featureDropdown');
    }
}

loadAggrReviews();