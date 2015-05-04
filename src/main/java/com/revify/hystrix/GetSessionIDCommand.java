package com.revify.hystrix;

import com.ebay.sdk.ApiContext;
import com.ebay.sdk.call.GetSessionIDCall;
import com.netflix.hystrix.HystrixCommand;
import com.netflix.hystrix.HystrixCommandGroupKey;
import com.netflix.hystrix.HystrixCommandKey;
import com.netflix.hystrix.HystrixCommandProperties;

/**
 * Created by jchengottusseriy on 5/2/2015.
 */
public class GetSessionIDCommand extends HystrixCommand<String> {

    public static final int TIMEOUT_VALUE = 30000;
    private ApiContext apiContext;
    private String runame;

    public GetSessionIDCommand(String runame, ApiContext apiContext){
        super(Setter.withGroupKey(HystrixCommandGroupKey.Factory.asKey("sessionID"))
                .andCommandPropertiesDefaults(HystrixCommandProperties.Setter()
                        .withExecutionTimeoutInMilliseconds(TIMEOUT_VALUE)));
        this.runame = runame;
        this.apiContext = apiContext;
    }

    @Override
    protected String run() throws Exception {
        GetSessionIDCall api = new GetSessionIDCall(apiContext);
        api.setRuName(runame);

        return api.getSessionID();
    }
}
