/**
 * Created by kalyaninirmal on 3/28/2015.
 */

var loadSortedReviews = function(){
    var featureName = sessionStorage.getItem("featureName");
    var categoryId = sessionStorage.getItem("categoryID");
    var sortedReviewPath = "/revify/services/reviews?categoryID="+categoryId+"&featureName="+featureName;
    var url = extractBaseUrl() + sortedReviewPath;
    jQuery.ajax(url, {
        dataType : "json",
        success : sortedReviewOnSuccess,
        error : sortedReviewOnError
    });
};


var extractBaseUrl = function(){
    var urlArr = location.href.split('/');
    var protocol = urlArr[0];
    var host = urlArr[2];
    return protocol + '//' + host;
}

var sortedReviewOnError = function(xhr, status, e){
    console.log(e);
    alert("Error in loading sorted reviews. Please try again");
};

var sortedReviewOnSuccess = function (response, status, xhr){

    var products = response;
    var section = document.getElementById('section');
    var container =  document.getElementById('container');
    var heading = document.getElementById('heading');
    var span_heading = document.createElement('span');
    span_heading.style.marginLeft = "10%";
    span_heading.innerText = products[0].categoryName + " Reviews";
    heading.appendChild(span_heading);
    container.appendChild(heading);

    products = products.sort(function(a, b){
        if(b.productDTO.features.length != 0 && a.productDTO.features.length != 0)
            return b.productDTO.features[0].overallRating - a.productDTO.features[0].overallRating;
        else
            return 0;
    })

    if(products[0].productDTO.features != null){

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
            image.width = 200;
            image.height = 200;
            image.onclick = function(){
                var productId = this.id;
                sessionStorage.setItem("productID", productId);
                window.location.href = "detailedReviews.html";
            };

            var product_heading = document.createElement('div');
            product_heading.className = "text-center product-heading";
            product_heading.innerText = product.productDTO.productName;
            product_heading.id = product.productDTO.productID;

            col_md_3.appendChild(image);
            col_md_3.appendChild(product_heading);


            var col_md_5 = document.createElement('div');
            col_md_5.className = "col-md-5";

            row.appendChild(col_md_3);

            var col_md_9 = document.createElement('div');
            col_md_9.className = "col-md-9";

            var ul_1 = document.createElement('ul');
            ul_1.className = "feature-review-bars";

            //for(var i = 0; i < product.productDTO.features.length; i++){

                var overallRating = product.productDTO.features[0].overallRating;
                var li  = document.createElement('li');
                var feature_label = document.createElement('div');
                feature_label.className = "feature-label";
                feature_label.innerText = product.productDTO.features[0].featureName;
                var feature_review_bar = document.createElement('div');
                feature_review_bar.className = "feature-review-bar";
                var fill = document.createElement('div');
                document.createAttribute("data-width");

                var feature_rating = document.createElement('div');
                if(overallRating == 5){
                    feature_rating.className = "feature-rating blue";
                    fill.className = "fill-green fill";
                    fill.style.width = "100%";
                    fill.setAttribute("data-width", '100');
                }
                else if(overallRating == 4){
                    feature_rating.className = "feature-rating blue";
                    fill.className = "fill-light-green fill";
                    fill.style.width = "80%";
                    fill.setAttribute("data-width", '80');
                }
                else if(overallRating == 3){
                    feature_rating.className = "feature-rating blue";
                    fill.className = "fill-yellow fill";
                    fill.style.width = "60%";
                    fill.setAttribute("data-width", '60');
                }
                else if(overallRating == 2){
                    feature_rating.className = "feature-rating blue";
                    fill.className = "fill-light-red fill";
                    fill.style.width = "20%";
                    fill.setAttribute("data-width", '20');
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
            //}

            var col_md_4 = document.createElement('div');
            col_md_4.className = "col-md-4";

            var ul_2 = document.createElement('ul');
            ul_2.className = "feature-review-bars";
            col_md_9.appendChild(ul_1);
            col_md_5.appendChild(col_md_9);

            var priceDiv = document.createElement('div');
            priceDiv.className = "product-heading";
            priceDiv.innerText = "$" + product.productDTO.price ;
            col_md_4.appendChild(priceDiv);

            //col_md_5.appendChild(product_heading);
            row.appendChild(col_md_5);
            row.appendChild(col_md_4);
            review_wrapper.appendChild(row);
            container.appendChild(review_wrapper);
            section.appendChild(container);
        }
    }
}

loadSortedReviews();