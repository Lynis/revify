package com.revify.repository;

import com.revify.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by jchengottusseriy on 3/11/2015.
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
