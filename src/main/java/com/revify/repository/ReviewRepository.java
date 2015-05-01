package com.revify.repository;

import com.revify.dto.ProductDTO;
import com.revify.entity.FeatureReview;
import com.revify.entity.ProductReview;
import com.revify.entity.PurchasedProductUserId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created by Vijaya on 3/23/2015.
 */
public interface ReviewRepository extends JpaRepository<ProductReview, Long> {

    List<ProductReview> findByReviewDateBetweenOrderByReviewDateDesc(Timestamp startTime, Timestamp endTime);

    @Query(value = "select pr from ProductReview pr where pr.product.productID in :productID and pr.reviewDate between :startDate and :endDate")
    List<ProductReview> findReviewByProductIds(@Param("productID") List<String> productID, @Param("startDate") Timestamp startDate, @Param("endDate") Timestamp endDate);

    @Query(value = "select pr from ProductReview pr where pr.product.productID = :productID and pr.reviewDate between :startDate and :endDate")
    List<ProductReview> findReviewByProductId(@Param("productID") String productID, @Param("startDate") Timestamp startDate, @Param("endDate") Timestamp endDate);


}
