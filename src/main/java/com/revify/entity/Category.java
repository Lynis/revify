package com.revify.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by jchengottusseriy on 3/8/2015.
 */
@Entity
@Table(name = "category")
public class Category implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "category_id")
    private Long categoryID;

    @Column(name = "category_name")
    private String categoryName;

    @Column(name="icon")
    private String icon;

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
