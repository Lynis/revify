package com.revify.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Vijaya on 3/16/2015.
 */

@Entity
@Table(name = "user")
public class User {

    @Id
    @Column(name = "user_id", nullable = false)
    private String userID;

   /* @ManyToMany(mappedBy = "userList")
    private List<PurchasedProduct> purchasedProductList;*/

    @OneToMany(mappedBy = "user")
    private List<PurchasedProductUser> productUsers;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "reviewer", targetEntity = ProductReview.class)
    private List<ProductReview> productReviewList;

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    /*public List<PurchasedProduct> getPurchasedProductList() {
        return purchasedProductList;
    }

    public void setPurchasedProductList(List<PurchasedProduct> purchasedProductList) {
        this.purchasedProductList = purchasedProductList;
    }*/

    public List<ProductReview> getProductReviewList() {
        return productReviewList;
    }

    public void setProductReviewList(List<ProductReview> productReviewList) {
        this.productReviewList = productReviewList;
    }

    public List<PurchasedProductUser> getProductUsers() {
        return productUsers;
    }

    public void setProductUsers(List<PurchasedProductUser> productUsers) {
        this.productUsers = productUsers;
    }
}
