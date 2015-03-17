package com.revify.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by Vijaya on 3/16/2015.
 */
@Entity
@Table(name = "feature")
public class Feature implements Serializable{

    @Id
    @Column(name = "feature_id", nullable = false)
    private Long featureID;

    @Column(name = "feature_name")
    private String featureName;

    @Column(name = "icon")
    private String icon;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "feature", targetEntity = FeatureReview.class)
    private List<FeatureReview> featureReviewList;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "category_id")
    private Category category;

    public Long getFeatureID() {
        return featureID;
    }

    public void setFeatureID(Long featureID) {
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
