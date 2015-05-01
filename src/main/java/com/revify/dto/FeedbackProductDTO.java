package com.revify.dto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by MohulT430 on 4/12/2015.
 */
public class FeedbackProductDTO {

    private Map<Integer, Integer> reviewCountMap;

    private Map<Integer,Float> productReviewMap;

    //private FeedbackFeatureDTO feedbackFeatureDTO;

    private Map<Integer,List<FeedbackFeatureDTO>> featureRatingMap;

    public Map<Integer, Integer> getReviewCountMap() {
        return reviewCountMap;
    }

    public void setReviewCountMap(Map<Integer, Integer> reviewCountMap) {
        this.reviewCountMap = reviewCountMap;
    }

    public Map<Integer, Float> getProductReviewMap() {
        return productReviewMap;
    }

    public void setProductReviewMap(Map<Integer, Float> productReviewMap) {
        this.productReviewMap = productReviewMap;
    }

    /*public FeedbackFeatureDTO getFeedbackFeatureDTO() {
        return feedbackFeatureDTO;
    }

    public void setFeedbackFeatureDTO(FeedbackFeatureDTO feedbackFeatureDTO) {
        this.feedbackFeatureDTO = feedbackFeatureDTO;
    }*/

    public Map<Integer, List<FeedbackFeatureDTO>> getFeatureRatingMap() {
        return featureRatingMap;
    }

    public void setFeatureRatingMap(Map<Integer, List<FeedbackFeatureDTO>> featureRatingMap) {
        this.featureRatingMap = featureRatingMap;
    }


}
