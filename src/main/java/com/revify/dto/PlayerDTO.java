package com.revify.dto;

/**
 * Created by jchengottusseriy on 4/25/2015.
 */
public class PlayerDTO {

    private String userID;
    private int noOfProductsReviewed;
    private int totalScore;

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public int getNoOfProductsReviewed() {
        return noOfProductsReviewed;
    }

    public void setNoOfProductsReviewed(int noOfProductsReviewed) {
        this.noOfProductsReviewed = noOfProductsReviewed;
    }

    public int getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }
}
