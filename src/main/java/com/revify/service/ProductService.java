package com.revify.service;

import com.ebay.sdk.ApiContext;
import com.ebay.soap.eBLBaseComponents.ItemType;

import java.util.List;

/**
 * Created by Vijaya on 4/3/2015.
 */
public interface ProductService {

    public void extractAndSaveProductInfo(ApiContext apiContext);

}
