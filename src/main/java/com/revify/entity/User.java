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

    private int score;

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

    public void setScore(int score) {
       this.score = score;
    }

    public int getScore() {
        return score;
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (!userID.equals(user.userID)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return userID.hashCode();
    }
}
