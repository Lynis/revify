package com.revify.dto;

/**
 * Created by jchengottusseriy on 3/18/2015.
 */
public class FeatureDTO {

    private long featureID;
    private String featureName;
    private String icon;

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

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
