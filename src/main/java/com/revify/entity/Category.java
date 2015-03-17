package com.revify.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by jchengottusseriy on 3/8/2015.
 */
@Entity
@Table(name = "category")
public class Category implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "category_id", nullable = false)
    private Long categoryID;

    @Column(name = "category_name")
    private String categoryName;

    @Column(name="icon")
    private String icon;

    @OneToMany(cascade = CascadeType.ALL, targetEntity = PurchasedProduct.class, mappedBy = "category")
    private List<PurchasedProduct> productList;

    @OneToMany(cascade = CascadeType.ALL, targetEntity = Feature.class, mappedBy = "category")
    private List<Feature> featureList;

    public List<Feature> getFeatureList() {
        return featureList;
    }

    public void setFeatureList(List<Feature> featureList) {
        this.featureList = featureList;
    }

    public List<PurchasedProduct> getProductList() {
        return productList;
    }

    public void setProductList(List<PurchasedProduct> productList) {
        this.productList = productList;
    }

    public void setCategoryID(Long categoryID) {
        this.categoryID = categoryID;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Long getCategoryID() {
        return categoryID;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public String getIcon() {
        return icon;
    }
}
