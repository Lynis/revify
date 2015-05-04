var feedbackPath = "/revify/services/feedback?userID=1";

var loadFeedback = function(){
    var url = extractBaseUrl() + feedbackPath;
    jQuery.ajax(url,{
        dataType : "json",
        success : feedbackOnSuccess,
        error : feedbackOnError
    });
};

var extractBaseUrl = function(){
    var urlArr = location.href.split('/');
    var protocol = urlArr[0];
    var host = urlArr[2];
    return protocol + '//' + host;
};

var feedbackOnError = function(xhr, status, e){
    console.log(e);
    alert("Error in loading feedback. Please try again");
};
var getMonthName = function(month){
    var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthArray[month];
}

var getMonthIndex = function(monthName){
    var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for(var j = 0; j < monthArray.length; j++){
        if(monthArray[j] == monthName){
            return j;
        }
    }
}

var productNameList = new Array();
var productMap = new Object();
var reviewMap = new Object();
var numberRatingMap = new Object();



var feedbackOnSuccess = function(response,status,xhr){
    var feedbackData = response;

    for (var i in feedbackData){
        var feedback = feedbackData[i];
        var productName = feedback.productName;
        productNameList.push(productName);
        var monthlyRatingArray = new Array(12);
        var monthlyFeatureRatingArray = new Array(12);
        var monthlyRatingCountArray = new Array(12);
        var feedback = feedbackData[i];
        var overallProductRating = feedback.feedbackProductDTO.productReviewMap;
        var monthlyReviewCount = feedback.feedbackProductDTO.reviewCountMap;
        var monthlyFeatureReviewCount = feedback.feedbackProductDTO.featureRatingMap;
        for (var m in monthlyReviewCount){
            var monthlyRatingCount = monthlyReviewCount[m];
            monthlyRatingCountArray[m] = monthlyRatingCount;
            var temp;
            for(var key in monthlyFeatureReviewCount){
                temp = monthlyFeatureReviewCount[key];
            }
            monthlyFeatureRatingArray[m] = temp;
            reviewMap[productName] = monthlyFeatureRatingArray;
            monthlyRatingArray[m] = overallProductRating[m];
            var productValue = monthlyRatingArray;
            productMap[productName] = productValue; //****This map will store Product Name as a key and an array of all monthly ratings with Index.
            numberRatingMap[productName] = monthlyRatingCountArray;
        }
    }

    //****Gives Rating of all months for all Products
    for(var k = 0; k < productNameList.length; k++) {
        var name = productNameList[k];
        var list = getProductList(name);  //****This is the array which contains monthly rating as Index
        for(var i=0 ; i<list.length;i++){
           // alert("Product Name : " + name + "Month : " + getMonthName(parseInt(i)) + ". Overall rating : " + list[i]);
        }
    }

    series_1 = [];
    for(var k = 0; k < productNameList.length; k++){
        var list_1  = getProductList(productNameList[k]);
        var list_2 = getReviewCountList(productNameList[k]);
        var seriesInput_1 = new Array(12);
        var seriesInput_2 = new Array(12);
        for(var i = 0 ; i < list_1.length ;i++){
            if(typeof list_1[i] == 'undefined') {
                seriesInput_1[i] = 0;
            }
            else {
                seriesInput_1[i] = list_1[i];
            }
        }
        series_1.push({
            name : productNameList[k],
            type : 'spline',
            data: seriesInput_1
        })

        for(var i = 0 ; i < list_2.length ;i++){
            if(typeof list_2[i] == 'undefined') {
                seriesInput_2[i] = 0;
            }
            else {
                seriesInput_2[i] = list_2[i];
            }
        }
        series_1.push({
            name : productNameList[k],
            type : 'column',
            yAxis: 1,
            data: seriesInput_2
        })
    }
    plotGraph();
}

var getProductList = function (k){
    return productMap[k];
}

var getReviewList = function(k){
    return reviewMap[k];
}

var getReviewCountList = function(k){
    return numberRatingMap[k];
}



var plotGraph = function () {
    $('#chart1').highcharts({
        title: {
            text: 'Average Ratings of all products in one year',
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: [{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }],
        yAxis: [{ //Primary y axis
            min: 0,
            title: {
                text: 'Average Product Rating'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },{ //Secondary y axis
            title : {
                text: 'Number of Product Ratings'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: false
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },

        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            //plotGauge(this.category, this.y);
                            plotFeatureChart(this.category, this.series.name);
                        }
                    }
                }
            },
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: series_1
    });
}

// Feature chart
var plotFeatureChart = function (monthName, productName) {
    var monthIndex = getMonthIndex(monthName);
    var productNameIndex;
    for(var p = 0;p < productNameList.length; p++){
        if(productNameList[p] == productName){
            productNameIndex = p;
            break;
        }
    }
    var list_2 = getReviewList(productNameList[productNameIndex]);
    var seriesInput_2 = new Array(12);
    for(var i = 0 ; i < list_2.length ; i++) {
        if(typeof list_2[i] == 'undefined') {
            seriesInput_2[i] = 0;
        }
        else {
            seriesInput_2[i] = list_2[i];
        }
        //alert("Product : " + name + ". Feature : " + list[i].featureName + ". Rating : " + list[i].averageRating);
    }

    var featureRatingList = seriesInput_2[monthIndex];
    var yAxisRating = new Array();
    var xAxisFeatures = new Array();

    for(var m = 0; m < featureRatingList.length; m++){
        yAxisRating[m] = featureRatingList[m].averageRating;
        xAxisFeatures[m] = featureRatingList[m].featureName;
    }

    $('#chart2').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Average Feature Rating of '+ productName
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: xAxisFeatures,
            title: {
                text: 'Rating for '+ productName
            },
            min: 0,
            title: {
                text: null,
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rating for '+ productName,
            },
            labels: {
                overflow: 'justify'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '',
            data: yAxisRating
        }]
    });
}

//Gauge

/*var plotGauge = function (monthName, rating) {

    $('#gauge').highcharts({
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: 'Average monthly rating'
        },

        pane: {
            startAngle: -160,
            endAngle: 160,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '120%',
                innerRadius: '120%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 10,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'Rating'
            },
            plotBands: [{
                from: 0,
                to: 3,
                color: '#55BF3B' // green
            }, {
                from: 3,
                to: 7,
                color: '#DDDF0D' // yellow
            }, {
                from: 7,
                to: 10,
                color: '#DF5353' // red
            }]
        },
        series: [{
            name: monthName,
            data: [rating],
            tooltip: {
                valueSuffix: ''
            }
        }]
    });
}*/

loadFeedback();