var COOKIE_NAME = "revifyCredentials";

var eBayTokenInfo;
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();

    // extract cookie for user information
    eBayTokenInfo = $.cookie(COOKIE_NAME);
    loadNavBar();
    $('#login').click(signin);
});


var loadNavBar = function(){
    var tokenInfoArray;
    var userName;
    var eBayToken;

    if(eBayTokenInfo != null) {
        tokenInfoArray = eBayTokenInfo.split("###");
        userName = tokenInfoArray[0];
        eBayToken = tokenInfoArray[1];
    }
    var loginEle = $('.login');

    if(eBayTokenInfo!=null){
        var  welcomeText = "<a id=\"login\" href=\"#\">Welcome <span style=\"color:#b0c4de\">"  + userName + "</span> !</a>";

        var welcomeText1 = "<a id=\"container\" href=\"#\" data-popover=\"true\" data-placement=\"bottom\" data-html=true data-content=\"<ul>" +
            "<li><a id='logout' href='#' ><span style='color: #cb3b27;font-weight: bold'>Provide Reviews</span></a></li>" +
            "<li><a id='provide-review' href='http://www.wojt.eu' target='blank'><span style='color: #cb3b27;font-weight: bold'>Logout</span></a></li>"+ "</ul>\">" +
            "Welcome <span style=\"color:#b0c4de\">"  + userName + "</span> !</a>";

        var welcomeText2 = "<a href=\"#\" data-popover=\"true\" data-placement=\"bottom\" data-html=true data-content=\"<ul>" +
            "<li><a href='/revify/start.html?un={userName}' target='_self'>Provide Reviews</a></li>" +
            "<li><a href='/revify/services/logout' target='_self' >Logout</a></li>" +
            "</ul>\">Welcome " + "<span style=\"color:#b0c4de\">" + userName + "</span>" + " !</a>";
        welcomeText2 = welcomeText2.replace("{userName}", userName);
        loginEle.append(welcomeText2);

        var originalLeave = $.fn.popover.Constructor.prototype.leave;
        $.fn.popover.Constructor.prototype.leave = function(obj){
            var self = obj instanceof this.constructor ?
                obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
            var container, timeout;

            originalLeave.call(this, obj);

            if(obj.currentTarget) {
                container = $(obj.currentTarget).siblings('.popover')
                timeout = self.timeout;
                container.one('mouseenter', function(){
                    //We entered the actual popover – call off the dogs
                    clearTimeout(timeout);
                    //Let's monitor popover content instead
                    container.one('mouseleave', function(){
                        $.fn.popover.Constructor.prototype.leave.call(self, self);
                    });
                })
            }
        };

        $('body').popover({ selector: '[data-popover]', trigger: 'click hover', placement: 'bottom', delay: {show: 50, hide: 400}});

        $('#logout').click(function(){
            // delete cookie
            $.removeCookie(COOKIE_NAME);
            //redirect to home page
            window.location.href = "/revify/home.html";
        });

        /* $('#provide-review').click(function(){
         //redirect to game start page
         window.location.href = "/revify/start.html?un=" + userName;
         });*/

    }
    else{
        var  loginText = "<a id=\"login\" class=\"text-uppercase\" href=\"#\">Log In</a>";
        var loginIcon = "<img src=\"images/login-icon2.png\">";

        loginEle.append(loginText);
        loginEle.append(loginIcon);
    }
}
