package com.revify.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Vijaya on 3/16/2015.
 */

@Entity
@Table(name = "feature_review")
public class FeatureReview implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "feature_review_id", nullable = false)
    private Long featureReviewID;

    @Column(name = "rating")
    private int rating;

    @ManyToOne(optional = false)
    @JoinColumn(name = "feature_id", referencedColumnName = "feature_id")
    private Feature feature;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_review_id", referencedColumnName = "product_review_id")
    private ProductReview productReview;

    public Long getFeatureReviewID() {
        return featureReviewID;
    }

    public void setFeatureReviewID(Long featureReviewID) {
        this.featureReviewID = featureReviewID;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Feature getFeature() {
        return feature;
    }

    public void setFeature(Feature feature) {
        this.feature = feature;
    }

    public ProductReview getProductReview() {
        return productReview;
    }

    public void setProductReview(ProductReview productReview) {
        this.productReview = productReview;
    }
}
