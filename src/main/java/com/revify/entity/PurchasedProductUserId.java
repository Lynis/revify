package com.revify.entity;

import java.io.Serializable;

/**
 * Created by Vijaya on 3/23/2015.
 */

public class PurchasedProductUserId implements Serializable{

    private String userID;

    private String productID;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PurchasedProductUserId that = (PurchasedProductUserId) o;

        if (!productID.equals(that.productID)) return false;
        if (!userID.equals(that.userID)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = userID.hashCode();
        result = 31 * result + productID.hashCode();
        return result;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getProductID() {
        return productID;
    }

    public void setProductID(String productID) {
        this.productID = productID;
    }
}
