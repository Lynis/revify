package com.revify.dto;

/**
 * Created by jchengottusseriy on 3/18/2015.
 */
public class ProductReviewDTO {

    private String productID;

    private String reviewerID;

    private int overallRating;

    private FeatureRatingDTO featureRatingInfo;

    public String getProductID() {
        return productID;
    }

    public void setProductID(String productID) {
        this.productID = productID;
    }

    public String getReviewerID() {
        return reviewerID;
    }

    public void setReviewerID(String reviewerID) {
        this.reviewerID = reviewerID;
    }

    public int getOverallRating() {
        return overallRating;
    }

    public void setOverallRating(int overallRating) {
        this.overallRating = overallRating;
    }

    public FeatureRatingDTO getFeatureRatingInfo() {
        return featureRatingInfo;
    }

    public void setFeatureRatingInfo(FeatureRatingDTO featureRatingInfo) {
        this.featureRatingInfo = featureRatingInfo;
    }
}
