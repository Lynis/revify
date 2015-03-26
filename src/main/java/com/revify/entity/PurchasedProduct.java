package com.revify.entity;


import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by Vijaya on 3/16/2015.
 */
@Entity
@Table(name = "purchased_product")
public class PurchasedProduct implements Serializable {

    @Id
    @Column(name = "product_id", nullable = false)
    private String productID;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "image")
    private String image;

    @Column(name = "price")
    private double price;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "category_id")
    private Category category;

    @OneToMany(cascade = CascadeType.ALL, targetEntity = ProductReview.class, mappedBy = "product")
    private List<ProductReview> reviews;

    @ManyToMany
    @JoinTable(name = "purchased_product_user",
               joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "product_id"),
               inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    )
    private List<User> userList;

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    public List<ProductReview> getReviews() {
        return reviews;
    }

    public void setReviews(List<ProductReview> reviews) {
        this.reviews = reviews;
    }

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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PurchasedProduct that = (PurchasedProduct) o;

        if (!productID.equals(that.productID)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return productID.hashCode();
    }
}
