package com.revify.dto;

/**
 * Created by Vijaya on 3/16/2015.
 */
public class CategoryDTO {

    private Long categoryID;

    private String categoryName;

    private String icon;

    public Long getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(Long categoryID) {
        this.categoryID = categoryID;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
