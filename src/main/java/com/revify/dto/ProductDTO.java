package com.revify.dto;

import java.util.List;

/**
 * Created by jchengottusseriy on 3/18/2015.
 */
public class ProductDTO {

    private String productID;
    private String productName;
    private String image;
    private List<FeatureDTO> features;
    private boolean reviewed;

    public String getProductID() {
        return productID;
    }

    public void setProductID(String productID) {
        this.productID = productID;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<FeatureDTO> getFeatures() {
        return features;
    }

    public void setFeatures(List<FeatureDTO> features) {
        this.features = features;
    }

    public void setReviewed(boolean reviewed) {
        this.reviewed = reviewed;
    }

    public boolean isReviewed() {
        return reviewed;
    }
}
