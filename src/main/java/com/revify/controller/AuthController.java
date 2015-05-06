package com.revify.controller;

/**
 * Created by Vijaya on 4/1/2015.
 */
import com.ebay.sdk.*;
import com.ebay.sdk.call.FetchTokenCall;
import com.revify.hystrix.FetchTokenCommand;
import com.revify.hystrix.GetSessionIDCommand;
import com.revify.service.AuthHelper;
import com.revify.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Date;

@RestController
public class AuthController {

    public static final String ENVIRONMENT = "environment";
    public static final String SANDBOX = "Sandbox";
    public static final String PRODUCTION = "Production";
    public static final String SANDBOX_SIGN_IN_URL = "sandboxSignInUrl";
    public static final String PRODUCTION_SIGN_IN_URL = "ebaySignInUrl";
    public static final String DEV_ID = "devId";
    public static final String APP_ID = "appId";
    public static final String CERT_ID = "certId";
    public static final String RUNAME = "runame";
    public static final String SANDBOX_API_URL = "sandboxAPIUrl";
    public static final String EBAY_API_URL = "ebayAPIUrl";
    public static final String COOKIE_SEPARATER = "###";
    public static final String REVIFY_COOKIE_NAME = "revifyCredentials";

    @Autowired
    ProductService productService;

    @RequestMapping(method = RequestMethod.GET, value = "/signin")
    public String signIn(HttpSession session, HttpServletResponse response) throws SdkException {

        String env = AuthHelper.getProperty(ENVIRONMENT);
        String signInURL = "";
        String devId;
        String appId;
        String certId;
        String runame;
        String ApiServerURL = "";

        if(env.equals(SANDBOX)){
            signInURL = AuthHelper.getProperty(SANDBOX_SIGN_IN_URL);
            ApiServerURL = AuthHelper.getProperty(SANDBOX_API_URL);
        }
        else if(env.equals(PRODUCTION)){
            signInURL = AuthHelper.getProperty(PRODUCTION_SIGN_IN_URL);
            ApiServerURL = AuthHelper.getProperty(EBAY_API_URL);
        }

        //Get the credential information
        devId = AuthHelper.getProperty(DEV_ID);
        if(devId.length() == 0){
            throw new SdkException("Developer ID is empty");
        }
        appId = AuthHelper.getProperty(APP_ID);
        if(appId.length() == 0){
            throw new SdkException("Application ID is empty");
        }
        certId = AuthHelper.getProperty(CERT_ID);
        if(certId.length() == 0){
            throw new SdkException("Certificate ID is empty");
        }

        runame = AuthHelper.getProperty(RUNAME);
        if(runame.length() == 0){
            throw new SdkException("RUNAME is empty");
        }

        System.out.println("appId:" + appId);
        System.out.println("devId:" + devId);
        System.out.println("certId" + certId);
        System.out.println("appserverurl" + ApiServerURL);

        ApiContext apiContext = AuthHelper.createApiContext(devId, appId, certId, ApiServerURL);
        ApiLogging apiLogging = new ApiLogging();
        apiContext.setApiLogging(apiLogging);

        session.setAttribute("apiContext", apiContext);

        //GetSessionIDCall api = new GetSessionIDCall(apiContext);
        //api.setRuName(runame);

        String ruParams = "params=" + runame + "-" + env;

        try {
            //String sessionID = api.getSessionID();
            GetSessionIDCommand getSessionIDCommand = new GetSessionIDCommand(runame, apiContext);
            String sessionID = getSessionIDCommand.execute();
            String encodedSessionIDString = URLEncoder.encode(sessionID, "UTF-8");

            session.setAttribute("sessionID", sessionID);

            String redirectURL = signInURL + "&RuName=" + runame + "&SessID=" + encodedSessionIDString + "&ruparams=" + ruParams;
            return redirectURL;
            //response.sendRedirect(redirectURL);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "";
    }


    @RequestMapping(method = RequestMethod.GET, value = "/logout")
    public void logout(HttpServletResponse response) throws IOException {
        // save token information in cookie
        Cookie cookie = new Cookie(REVIFY_COOKIE_NAME, "");
        //cookie.setSecure(true);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
        response.sendRedirect("/revify/home.html");
    }

    @RequestMapping(method = RequestMethod.GET, value = "/authsuccess", produces = "application/json")
    public void onAuthSuccess(HttpSession session, @Param("username") String username, HttpServletResponse response) throws IOException {
        // Get fetch token
        ApiContext apiContext = (ApiContext) session.getAttribute("apiContext");
        String sessionID = (String) session.getAttribute("sessionID");

        FetchTokenCall api = new FetchTokenCall(apiContext);
        api.setSessionID(sessionID);

        String eBayToken = null;
        try {
            eBayToken = new FetchTokenCommand(api).execute();

        } catch (Exception e) {
            e.printStackTrace();
        }

        long tokenExpiry = (api.getHardExpirationTime().getTime().getTime()- new Date().getTime())/1000;

        //Set eBayToken
        apiContext.getApiCredential().seteBayToken(eBayToken);

        //Get products purchased by the user and save
        productService.extractAndSaveProductInfo(apiContext);

        // save token information in cookie
        Cookie cookie = new Cookie(REVIFY_COOKIE_NAME, username + COOKIE_SEPARATER + eBayToken);
        //cookie.setSecure(true);
        cookie.setMaxAge((int) tokenExpiry);
        cookie.setPath("/");
        response.addCookie(cookie);

        System.out.println("Token expiration time in seconds:" + tokenExpiry);

        //redirect
        response.sendRedirect("/revify/start.html?un=" + username);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/authfailure")
    public void onAuthFailure(HttpServletResponse response) throws IOException {
        response.sendRedirect("/revify/home.html");
    }
}
