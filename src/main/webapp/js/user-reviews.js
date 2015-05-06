
var reviewPath = "/revify/services/reviews?categoryID={cid}&range=aggregated";

var loadAggrReviews = function(){
    //document.getElementById('featureDropdownValue').innerHTML = "";
    var url = extractBaseUrl() + reviewPath;
    var cid = location.href.split('=')[1];//cid val
    if(cid != null){
        sessionStorage.setItem("categoryID", cid);
    }
    if(cid == null) {
        cid = sessionStorage.getItem("categoryID");
    }
    url = url.replace('{cid}',cid);
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

    //if(products[0].productDTO.features != null){

    populateFeatureDropdown(products[0].productDTO.features);

    for(var p in products)
    {
        var product = products[p];

        if(product.productDTO.features!=null) {

            var review_wrapper = document.createElement('div');
            review_wrapper.className = "review-wrapper";
            var row = document.createElement('div');
            row.className = "row";
            var col_md_3 = document.createElement('div');
            col_md_3.className = "col-md-3";
            col_md_3.style.borderTop = "1px solid #e7e7e7";
            col_md_3.style.borderLeft = "1px solid #e7e7e7";
            col_md_3.style.borderRight = "1px solid #e7e7e7";
            col_md_3.style.borderBottom = "1px solid #e7e7e7";
            col_md_3.style.boxShadow = "10px 10px 16px -12px rgba(0,0,0,0.75)";
            //col_md_3.style.border = "1px solid #e7e7e7";

            var image = document.createElement('img');
            image.src = product.productDTO.image;
            image.className = "img-responsive";
            image.id = product.productDTO.productID;

            var product_heading = document.createElement('div');
            product_heading.className = "text-center product-heading";
            product_heading.innerText = product.productDTO.productName;

            col_md_3.appendChild(image);
            col_md_3.appendChild(product_heading);

            var rating = document.createElement('div');
            rating.className = "rating";
            var span1 = document.createElement('span');
            span1.innerText = product.productDTO.overallRating;
            rating.appendChild(span1);


            var product_overall_rating = document.createElement('div');
            product_overall_rating.className = "col-md-1 product-overall-rating";

            var text_center = document.createElement('div');
            text_center.className = "text-center";

            var button = document.createElement('button');
            button.type = "button";
            button.id = product.productDTO.productID;
            button.className = "btn btn-primary btn-sm";
            button.style.marginTop = "15px";
            if (product.productDTO.noOfReviews > 1)
                button.innerHTML  = product.productDTO.noOfReviews + " Reviews";
            else
                button.innerHTML = product.productDTO.noOfReviews + " Review";

            button.onclick = function(){
                var productId = this.id;
                window.location.href = "detailedReviews.html?pid="+productId;
            }

            text_center.appendChild(button);
            product_overall_rating.appendChild(rating);
            product_overall_rating.appendChild(text_center);
            row.appendChild(col_md_3);
            row.appendChild(product_overall_rating);

            var feature_list_1 = document.createElement('div');
            feature_list_1.className = "col-md-4";

            var ul_1 = document.createElement('ul');
            ul_1.className = "feature-review-bars";


            if(product.productDTO.features.length >= 1) {

                feature_list_1.style.borderLeft = "1px solid #e7e7e7";
                feature_list_1.style.borderBottom = "1px solid #e7e7e7";
                feature_list_1.style.borderTop = "1px solid #e7e7e7";

                for (var i = 0; i < (product.productDTO.features.length + 1)/ 2; i++) {

                    var overallRating = product.productDTO.features[i].overallRating;
                    var li = document.createElement('li');
                    var feature_label = document.createElement('div');
                    feature_label.className = "feature-label";
                    feature_label.innerText = product.productDTO.features[i].featureName;
                    var feature_review_bar = document.createElement('div');
                    feature_review_bar.className = "feature-review-bar";
                    var fill = document.createElement('div');
                    document.createAttribute("data-width");
                    var feature_rating = document.createElement('div');
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
            }

            var feature_list_2 = document.createElement('div');
            feature_list_2.className = "col-md-4";

            var ul_2 = document.createElement('ul');
            ul_2.className = "feature-review-bars";
            ul_2.style.marginTop = "100px";

            if (product.productDTO.features.length > 1) {

                feature_list_2.style.borderRight = "1px solid #e7e7e7";
                feature_list_2.style.borderBottom = "1px solid #e7e7e7";
                feature_list_2.style.borderTop = "1px solid #e7e7e7";

                var initialValue = Math.floor((product.productDTO.features.length + 1) / 2) + 1;
                for (var i = initialValue; i < product.productDTO.features.length; i++) {
                    var overallRating = product.productDTO.features[i].overallRating;
                    var li = document.createElement('li');
                    var feature_label = document.createElement('div');
                    feature_label.className = "feature-label";
                    feature_label.innerText = product.productDTO.features[i].featureName;
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
            else  {
                feature_list_1.style.borderLeft = "1px solid gray";
                feature_list_1.style.borderBottom = "1px solid gray";
                feature_list_1.style.borderTop = "1px solid gray";
                feature_list_1.style.borderRight = "1px solid gray";
            }

            feature_list_1.appendChild(ul_1);
            feature_list_2.appendChild(ul_2);
            //col_md_5.appendChild(col_md_9);
            //row.appendChild(col_md_5);
            row.appendChild(feature_list_1);
            row.appendChild(feature_list_2);
            review_wrapper.appendChild(row);
            container.appendChild(review_wrapper);
            section.appendChild(container);
        }
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


