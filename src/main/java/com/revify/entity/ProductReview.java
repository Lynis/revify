package com.revify.entity;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

/**
 * Created by Vijaya on 3/16/2015.
 */

@Entity
@Table(name = "product_review")
public class ProductReview {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "product_review_id", nullable = false)
    private Long productReviewID;

    @Column(name = "review_date")
    private Date reviewDate;

    @Column(name = "overall_rating")
    private int overallRating;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User reviewer;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id", referencedColumnName = "product_id")
    private PurchasedProduct product;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "productReview" , targetEntity = FeatureReview.class)
    private List<FeatureReview> featureReviewList;


    public Long getProductReviewID() {
        return productReviewID;
    }

    public void setProductReviewID(Long productReviewID) {
        this.productReviewID = productReviewID;
    }

    public Date getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(Date reviewDate) {
        this.reviewDate = reviewDate;
    }

    public int getOverallRating() {
        return overallRating;
    }

    public void setOverallRating(int overallRating) {
        this.overallRating = overallRating;
    }

    public User getReviewer() {
        return reviewer;
    }

    public void setReviewer(User reviewer) {
        this.reviewer = reviewer;
    }

    public PurchasedProduct getProduct() {
        return product;
    }

    public void setProduct(PurchasedProduct product) {
        this.product = product;
    }

    public List<FeatureReview> getFeatureReviewList() {
        return featureReviewList;
    }

    public void setFeatureReviewList(List<FeatureReview> featureReviewList) {
        this.featureReviewList = featureReviewList;
    }
}
