package com.revify.dto;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created by kalyaninirmal on 3/26/2015.
 */
public class ReviewDTO {

    private String productName;

    private String productID;

    private String image;

    private int overallRating;

    private Timestamp reviewDate;

    private String reviewer;

    private int noOfReviews;

    private List<FeatureDTO> featureDTOs;

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

    public String getReviewer() {
        return reviewer;
    }

    public void setReviewer(String reviewer) {
        this.reviewer = reviewer;
    }

    public int getNoOfReviews() {
        return noOfReviews;
    }

    public void setNoOfReviews(int noOfReviews) {
        this.noOfReviews = noOfReviews;
    }

    public List<FeatureDTO> getFeatureDTOs() {
        return featureDTOs;
    }

    public void setFeatureDTOs(List<FeatureDTO> featureDTOs) {
        this.featureDTOs = featureDTOs;
    }



}
