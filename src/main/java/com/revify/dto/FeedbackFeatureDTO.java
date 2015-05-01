package com.revify.dto;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by MohulT430 on 4/12/2015.
 */
public class FeedbackFeatureDTO {

    private long featureID;

    private String featureName;

    private float averageRating;

    public long getFeatureID() {
        return featureID;
    }

    public void setFeatureID(long featureID) {
        this.featureID = featureID;
    }

    public String getFeatureName() {
        return featureName;
    }

    public void setFeatureName(String featureName) {
        this.featureName = featureName;
    }

    public float getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(float averageRating) {
        this.averageRating = averageRating;
    }
}
