package com.revify.hystrix;

import com.ebay.sdk.ApiContext;
import com.ebay.sdk.call.FetchTokenCall;
import com.ebay.sdk.call.GetSessionIDCall;
import com.netflix.hystrix.HystrixCommand;
import com.netflix.hystrix.HystrixCommandGroupKey;
import com.netflix.hystrix.HystrixCommandProperties;

/**
 * Created by jchengottusseriy on 5/2/2015.
 */
public class FetchTokenCommand extends  HystrixCommand<String> {

    public static final int TIMEOUT_VALUE = 30000;
    private FetchTokenCall api;

    public FetchTokenCommand(FetchTokenCall api){
        super(HystrixCommand.Setter.withGroupKey(HystrixCommandGroupKey.Factory.asKey("fetchToken"))
                .andCommandPropertiesDefaults(HystrixCommandProperties.Setter()
                        .withExecutionTimeoutInMilliseconds(TIMEOUT_VALUE)));
        this.api = api;
    }

    @Override
    protected String run() throws Exception {
        return api.fetchToken();
    }
}
