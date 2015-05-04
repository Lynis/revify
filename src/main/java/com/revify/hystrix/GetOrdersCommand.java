package com.revify.hystrix;

import com.ebay.sdk.call.GetOrdersCall;
import com.ebay.soap.eBLBaseComponents.OrderType;
import com.netflix.hystrix.HystrixCommand;
import com.netflix.hystrix.HystrixCommandGroupKey;
import com.netflix.hystrix.HystrixCommandProperties;

/**
 * Created by jchengottusseriy on 5/2/2015.
 */
public class GetOrdersCommand extends HystrixCommand<OrderType[]> {

    public static final int TIMEOUT_VALUE = 30000;
    private GetOrdersCall api;

    public  GetOrdersCommand(GetOrdersCall api){
        super(HystrixCommand.Setter.withGroupKey(HystrixCommandGroupKey.Factory.asKey("orders"))
                .andCommandPropertiesDefaults(HystrixCommandProperties.Setter()
                        .withExecutionTimeoutInMilliseconds(TIMEOUT_VALUE)));
        this.api = api;
    }

    @Override
    protected OrderType[] run() throws Exception {
        return api.getOrders();
    }
}
