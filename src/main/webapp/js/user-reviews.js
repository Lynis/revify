/**
 * Created by kalyaninirmal on 3/28/2015.
 */

function loadFeatures(){
    var section = document.getElementById('section');
    var container =  document.getElementById('container');
    var review_wrapper = document.createElement('div');
    review_wrapper.className  = "review-wrapper";
    var row = document.createElement('div');
    row.className = "row";
    var colmd_3 = document.createElement('col-md-3');
    colmd_3.className = "col-md-3";
    var image = document.createElement('img');
    image.src = "images/products/nikon-d7200.jpg";
    image.className = "img-responsive";
    var product_heading = document.createElement('div');
    product_heading.className = "text-center product-heading";
    product_heading.innerText = "Nikon D7200";
    colmd_3.appendChild(product_heading);
    colmd_3.appendChild(image);
    var col_md_5 = document.createElement('div');
    col_md_5.className = "col-md-5";
    var product_overall_rating = document.createElement('div');
    product_overall_rating.className = "col-md-3 product-overall-rating";
    product_overall_rating.href = "detailedReviews.html";
    var rating = document.createElement('div');
    rating.className = "rating green";
    var span = document.createElement('span');
    span.innerText = "4";
    rating.appendChild(span);
    product_overall_rating.appendChild(rating);
    col_md_5.appendChild(product_overall_rating);
    row.appendChild(colmd_3);
    var col_md_9 = document.createElement('div');
    col_md_9.className = "col-md-9";
    var ul = document.createElement('ul');
    ul.className = "feature-review-bars";

    for(var i = 1; i < 6; i++){

        var li  = document.createElement('li');
        var feature_label = document.createElement('div');
        feature_label.className = "feature-label";
        feature_label.innerText = "Lens";
        var feature_review_bar = document.createElement('div');
        feature_review_bar.className = "feature-review-bar";
        var fill = document.createElement('div');
        fill.className = "fill-green fill";
        fill.width = 300;
        fill.createAttribute("data-width");
        fill.setAttribute("data-width", "300");
        var feature_rating = document.createElement('div');
        feature_rating.className = "feature-rating green";
        feature_rating.innerText = i;
        var clear = document.createElement('div');
        clear.className = "clear";
        li.appendChild(feature_label);
        feature_review_bar.appendChild(fill);
        li.appendChild(feature_review_bar);
        li.appendChild(feature_rating);
        li.appendChild(clear);
        ul.appendChild(li);
    }
    col_md_9.appendChild(ul);
    col_md_5.appendChild(col_md_9);
    row.appendChild(col_md_5);
    review_wrapper.appendChild(row);
    container.appendChild(review_wrapper);
    section.appendChild(container);
}