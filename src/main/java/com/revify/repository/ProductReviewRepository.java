package com.revify.repository;

import com.revify.entity.ProductReview;
import com.revify.entity.PurchasedProduct;
import com.revify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by jchengottusseriy on 4/21/2015.
 */
public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {

    public ProductReview findByReviewerAndProduct(User user, PurchasedProduct product);
}
