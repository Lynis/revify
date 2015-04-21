package com.revify.service;

/**
 * Created by Vijaya on 4/1/2015.
 */

import com.ebay.sdk.ApiAccount;
import com.ebay.sdk.ApiContext;
import com.ebay.sdk.ApiCredential;

import java.util.Locale;
import java.util.PropertyResourceBundle;

public class AuthHelper {

    static{
        //extract api credentials from property file
    }

    static PropertyResourceBundle bundle;

    public static String getProperty(String propertyName){
        String value = "";

        if(bundle == null) {
            bundle = (PropertyResourceBundle) PropertyResourceBundle.getBundle("auth", Locale.US);
        }

        value = bundle.getString(propertyName);

        return value;
    }

    public static ApiContext createApiContext(String devId, String appId, String certId, String ApiServerUrl){
        ApiAccount ac = new ApiAccount();
        ac.setDeveloper(devId);
        ac.setApplication(appId);
        ac.setCertificate(certId);

        ApiCredential apiCred = new ApiCredential();
        apiCred.setApiAccount(ac);

        ApiContext apiContext = new ApiContext();
        apiContext.setApiCredential(apiCred);
        apiContext.setApiServerUrl(ApiServerUrl);

        return apiContext;
    }
}
