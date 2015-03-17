package com.revify.service;


import com.revify.dto.CategoryDTO;
import com.revify.entity.Category;
import com.revify.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by jchengottusseriy on 3/11/2015.
 */
@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional
    public List<CategoryDTO> findAllCategories(){
        List<CategoryDTO> categoryDTOs = new ArrayList<CategoryDTO>();
        List<Category> categories = categoryRepository.findAll();
        for(Category category : categories){
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setCategoryID(category.getCategoryID());
            categoryDTO.setCategoryName(category.getCategoryName());
            categoryDTO.setIcon(category.getIcon());
            categoryDTOs.add(categoryDTO);
        }
        return categoryDTOs;
    }
}
