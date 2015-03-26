package com.revify.dto;

import java.sql.Timestamp;

/**
 * Created by Vijaya on 3/24/2015.
 */
public class LatestReviewDTO {


    private String productName;

    private String productID;

    private String image;

    private int overallRating;

    private Timestamp reviewDate;

    private String reviwer;

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductID() {
        return productID;
    }

    public void setProductID(String productID) {
        this.productID = productID;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getOverallRating() {
        return overallRating;
    }

    public void setOverallRating(int overallRating) {
        this.overallRating = overallRating;
    }

    public Timestamp getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(Timestamp reviewDate) {
        this.reviewDate = reviewDate;
    }

    public String getReviwer() {
        return reviwer;
    }

    public void setReviwer(String reviwer) {
        this.reviwer = reviwer;
    }
}
