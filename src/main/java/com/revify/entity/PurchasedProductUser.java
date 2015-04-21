package com.revify.entity;

import javax.persistence.*;

/**
 * Created by Vijaya on 3/23/2015.
 */
@Entity
@Table(name = "purchased_product_user")
@IdClass(PurchasedProductUserId.class)
public class PurchasedProductUser {

    @Id
    @Column(name = "user_id")
    private String userID;

    @Id
    @Column(name = "product_id")
    private String productID;

    @ManyToOne
    @PrimaryKeyJoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @ManyToOne
    @PrimaryKeyJoinColumn(name = "product_id", referencedColumnName = "product_id")
    private PurchasedProduct product;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PurchasedProduct getProduct() {
        return product;
    }

    public void setProduct(PurchasedProduct product) {
        this.product = product;
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
