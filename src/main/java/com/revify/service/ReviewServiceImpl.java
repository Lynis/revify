package com.revify.service;

import com.revify.dto.*;
import com.revify.entity.Feature;
import com.revify.entity.FeatureReview;
import com.revify.entity.ProductReview;
import com.revify.entity.PurchasedProduct;
import com.revify.repository.PurchasedProductRepository;
import com.revify.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by Vijaya on 3/23/2015.
 */
@Service
public class ReviewServiceImpl implements ReviewService {

    private final PurchasedProductRepository productRepository;

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewServiceImpl(PurchasedProductRepository productRepository, ReviewRepository reviewRepository){
        this.productRepository = productRepository;
        this.reviewRepository  = reviewRepository;

    }

    @Override
    @Transactional
    public List<LatestReviewDTO> getLatestReviews(Long categoryID) {
        List<LatestReviewDTO> reviewDTOList = new ArrayList<LatestReviewDTO>();

        Date endDate = new Date();
        Timestamp endTime = new Timestamp(endDate.getTime());

        Calendar cal = Calendar.getInstance();
        cal.setTime(endDate);
        cal.add(Calendar.DATE, -30);
        Date startDate = cal.getTime();
        Timestamp startTime = new Timestamp(startDate.getTime());

        List<ProductReview> reviewList = reviewRepository.findByReviewDateBetweenOrderByReviewDateDesc(startTime, endTime);

        for(ProductReview review: reviewList){
            if(review.getProduct().getCategory().getCategoryID().equals(categoryID)) {

                System.out.println(review.getProduct().getProductName());
                LatestReviewDTO reviewDTO = new LatestReviewDTO();
                reviewDTO.setProductID(review.getProduct().getProductID());
                reviewDTO.setProductName(review.getProduct().getProductName());
                reviewDTO.setImage(review.getProduct().getImage());
                reviewDTO.setOverallRating(review.getOverallRating());
                reviewDTO.setReviewDate(review.getReviewDate());
                reviewDTO.setReviwer(review.getReviewer().getUserID());

                reviewDTOList.add(reviewDTO);
            }
        }

        return reviewDTOList;
    }

    @Override
    @Transactional
    public List<ReviewDTO> getAggregatedReviews(Long categoryID){

        List<ReviewDTO> aggReviewDTOList = new ArrayList<ReviewDTO>();

        List<PurchasedProduct> purchasedProductList = productRepository.findAll();

        System.out.println("purchasedProductList : " + purchasedProductList.size());

        for(PurchasedProduct purchasedProduct : purchasedProductList){

            if(purchasedProduct.getCategory().getCategoryID().equals(categoryID)){

                ReviewDTO reviewDTO = new ReviewDTO();
                reviewDTO.setProductID(purchasedProduct.getProductID());
                reviewDTO.setProductName(purchasedProduct.getProductName());
                reviewDTO.setImage(purchasedProduct.getImage());
                reviewDTO.setNoOfReviews(purchasedProduct.getReviews().size());

                List<ProductReview> productReviewList = purchasedProduct.getReviews();
                List<FeatureDTO> featureDTOList = null;

                int productOverAllRating = 0;

                for(ProductReview productReview : productReviewList){

                    featureDTOList = new ArrayList<>();

                    productOverAllRating = productOverAllRating + productReview.getOverallRating();
                    productOverAllRating = productOverAllRating/(productReviewList.size());
                    reviewDTO.setOverallRating(productOverAllRating);

                    List<FeatureReview> featureReviewList = productReview.getFeatureReviewList();

                    for(FeatureReview featureReview : featureReviewList){

                        FeatureDTO featureDTO = new FeatureDTO();
                        featureDTO.setFeatureID(featureReview.getFeature().getFeatureID());
                        featureDTO.setFeatureName(featureReview.getFeature().getFeatureName());
                        featureDTO.setOverallRating(featureReview.getRating());
                        featureDTO.setIcon(featureReview.getFeature().getIcon());
                        featureDTOList.add(featureDTO);
                    }
                }
                reviewDTO.setFeatureDTOs(featureDTOList);
                aggReviewDTOList.add(reviewDTO);
            }
        }
        return aggReviewDTOList;
    }

    @Override
    @Transactional
    public List<ReviewDTO> getIndividualReview(Long productID){

        List<ReviewDTO> individualReviewDTOList = new ArrayList<ReviewDTO>();
        List<PurchasedProduct> reviewsList = productRepository.findAll();
        System.out.println("reviewsList : " + reviewsList.size());

        for(PurchasedProduct purchasedProduct : reviewsList){

            if(purchasedProduct.getProductID().equals(Long.toString(productID))){

                System.out.println("productID : " + productID);
                ReviewDTO reviewDTO = new ReviewDTO();
                reviewDTO.setProductID(purchasedProduct.getProductID());
                reviewDTO.setProductName(purchasedProduct.getProductName());
                reviewDTO.setImage(purchasedProduct.getImage());

                List<ProductReview> productReviewList = purchasedProduct.getReviews();
                List<FeatureDTO> featureDTOList = null;
                List<ProductReviewDTO> productReviewDTOList = new ArrayList<>();

                int productOverAllRating = 0;

                for(ProductReview productReview : productReviewList){

                    featureDTOList = new ArrayList<>();
                    ProductReviewDTO productReviewDTO = new ProductReviewDTO();

                    productOverAllRating = productOverAllRating + productReview.getOverallRating();
                    productOverAllRating = productOverAllRating/(productReviewList.size());
                    reviewDTO.setOverallRating(productOverAllRating);

                    productReviewDTO.setOverallRating(productReview.getOverallRating());
                    productReviewDTO.setReviewerID(productReview.getReviewer().getUserID());
                    productReviewDTO.setReviewDate(productReview.getReviewDate());

                    List<FeatureReview> featureReviewList = productReview.getFeatureReviewList();

                    for(FeatureReview featureReview : featureReviewList){

                        FeatureDTO featureDTO = new FeatureDTO();
                        featureDTO.setFeatureID(featureReview.getFeature().getFeatureID());
                        featureDTO.setOverallRating(featureReview.getRating());
                        featureDTO.setFeatureName(featureReview.getFeature().getFeatureName());
                        featureDTO.setIcon(featureReview.getFeature().getIcon());
                        featureDTOList.add(featureDTO);
                    }
                    productReviewDTO.setFeatureDTOList(featureDTOList);
                    productReviewDTOList.add(productReviewDTO);
                }
                reviewDTO.setProductReviewDTOs(productReviewDTOList);
                individualReviewDTOList.add(reviewDTO);
            }
        }
        return individualReviewDTOList;
    }
}
