package com.revify.dto;

/**
 * Created by jchengottusseriy on 3/18/2015.
 */
public class FeatureRatingDTO {

    private long featureID;

    private int featureRating;

    public void setFeatureID(long featureID) {
        this.featureID = featureID;
    }

    public void setFeatureRating(int featureRating) {
        this.featureRating = featureRating;
    }

    public long getFeatureID() {
        return featureID;
    }

    public int getFeatureRating() {
        return featureRating;
    }
}
