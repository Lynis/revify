package com.revify.repository;

import com.revify.entity.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created by Vijaya on 3/23/2015.
 */
public interface ReviewRepository extends JpaRepository<ProductReview, Long> {

    List<ProductReview> findByReviewDateBetweenOrderByReviewDateDesc(Timestamp startTime, Timestamp endTime);
}
