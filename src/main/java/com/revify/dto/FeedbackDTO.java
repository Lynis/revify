package com.revify.dto;

import java.sql.Timestamp;

/**
 * Created by MohulT430 on 4/4/2015.
 */
public class FeedbackDTO {

    private String productID;

    private String productName;

    private FeedbackProductDTO feedbackProductDTO;

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

    public FeedbackProductDTO getFeedbackProductDTO() {
        return feedbackProductDTO;
    }

    public void setFeedbackProductDTO(FeedbackProductDTO feedbackProductDTO) {
        this.feedbackProductDTO = feedbackProductDTO;
    }
}
