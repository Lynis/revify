package com.revify.hystrix;

import com.ebay.sdk.call.GetItemCall;
import com.ebay.soap.eBLBaseComponents.ItemType;
import com.netflix.hystrix.HystrixCommand;
import com.netflix.hystrix.HystrixCommandGroupKey;
import com.netflix.hystrix.HystrixCommandProperties;

/**
 * Created by jchengottusseriy on 5/2/2015.
 */
public class GetItemCommand extends HystrixCommand<ItemType> {
    public static final int TIMEOUT_VALUE = 30000;
    private GetItemCall itemApi;
    private String itemID;

    public GetItemCommand(GetItemCall itemApi, String itemID) {
        super(HystrixCommand.Setter.withGroupKey(HystrixCommandGroupKey.Factory.asKey("item"))
                .andCommandPropertiesDefaults(HystrixCommandProperties.Setter()
                        .withExecutionTimeoutInMilliseconds(TIMEOUT_VALUE)));
        this.itemApi = itemApi;
        this.itemID = itemID;
    }

    @Override
    protected ItemType run() throws Exception {
        return itemApi.getItem(itemID);
    }
}
