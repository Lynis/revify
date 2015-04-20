package com.revify.dto;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created by jchengottusseriy on 3/18/2015.
 */
public class ProductReviewDTO {

    private String productID;

    private String reviewerID;

    private double overallRating;

    private Timestamp reviewDate;

    private List<FeatureDTO> featureDTOList;

    public Timestamp getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(Timestamp reviewDate) {
        this.reviewDate = reviewDate;
    }

    public List<FeatureDTO> getFeatureDTOList() {
        return featureDTOList;
    }

    public void setFeatureDTOList(List<FeatureDTO> featureDTOList) {
        this.featureDTOList = featureDTOList;
    }

    //private FeatureRatingDTO featureRatingInfo;

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

    public double getOverallRating() {
        return overallRating;
    }

    public void setOverallRating(double overallRating) {
        this.overallRating = overallRating;
    }

//    public FeatureRatingDTO getFeatureRatingInfo() {
//        return featureRatingInfo;
//    }
//
//    public void setFeatureRatingInfo(FeatureRatingDTO featureRatingInfo) {
//        this.featureRatingInfo = featureRatingInfo;
//    }
}
