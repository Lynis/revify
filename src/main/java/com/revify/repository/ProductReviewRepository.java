package com.revify.repository;

import com.revify.entity.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by jchengottusseriy on 4/21/2015.
 */
public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {
}
