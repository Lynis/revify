package com.revify.controller;

import com.revify.entity.Category;

import com.revify.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;


/**
 * Created by jchengottusseriy on 3/8/2015.
 */
@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @RequestMapping(value = "/categories", method = RequestMethod.GET, produces="application/json")
    public List<Category> getCategories(){
        List<Category> categories = categoryService.findAllCategories();
        return categories;
    }

}
