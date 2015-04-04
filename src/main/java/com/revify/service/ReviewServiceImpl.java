package com.revify.service;

import com.revify.dto.FeatureDTO;
import com.revify.dto.LatestReviewDTO;
import com.revify.dto.ReviewDTO;
import com.revify.entity.FeatureReview;
import com.revify.entity.ProductReview;
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

        List<ProductReview> reviewsList = reviewRepository.findAll();

        System.out.println("reviewsList : " + reviewsList.size());

        for(ProductReview productReview : reviewsList){

            if(productReview.getProduct().getCategory().getCategoryID().equals(categoryID)){

                ReviewDTO reviewDTO = new ReviewDTO();

                reviewDTO.setProductID(productReview.getProduct().getProductID());
                reviewDTO.setProductName(productReview.getProduct().getProductName());
                reviewDTO.setImage(productReview.getProduct().getImage());
                reviewDTO.setOverallRating(productReview.getOverallRating());
                reviewDTO.setNoOfReviews(productReview.getProduct().getReviews().size());

                List<FeatureReview> featureReviewList = productReview.getFeatureReviewList();
                System.out.println("featureReviewList : " +featureReviewList.size());

                List<FeatureDTO> featureDTOList = new ArrayList<>();

                for(FeatureReview featureReview : featureReviewList){
                    FeatureDTO featureDTO = new FeatureDTO();
                    featureDTO.setFeatureID(featureReview.getFeature().getFeatureID());
                    featureDTO.setFeatureName(featureReview.getFeature().getFeatureName());
                    featureDTO.setOverallRating(featureReview.getRating());
                    featureDTO.setIcon(featureReview.getFeature().getIcon());
                    featureDTOList.add(featureDTO);
                }
                for(FeatureDTO featureDTO1 : featureDTOList ){
                    System.out.println("feature : " + featureDTO1.getFeatureName());
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
        List<ProductReview> reviewsList = reviewRepository.findAll();
        System.out.println("reviewsList : " + reviewsList.size());

        for(ProductReview productReview : reviewsList){

            if(productReview.getProduct().getProductID().equals(Long.toString(productID))){

                System.out.println("productID : " + productID);
                ReviewDTO reviewDTO = new ReviewDTO();
                reviewDTO.setProductID(productReview.getProduct().getProductID());
                reviewDTO.setProductName(productReview.getProduct().getProductName());
                reviewDTO.setImage(productReview.getProduct().getImage());
                reviewDTO.setOverallRating(productReview.getOverallRating());
                List<FeatureReview> featureReviewList = productReview.getFeatureReviewList();
                List<FeatureDTO> featureDTOList = new ArrayList<>();

                for(FeatureReview featureReview : featureReviewList){
                    FeatureDTO featureDTO = new FeatureDTO();
                    featureDTO.setFeatureID(featureReview.getFeature().getFeatureID());
                    featureDTO.setFeatureName(featureReview.getFeature().getFeatureName());
                    featureDTO.setOverallRating(featureReview.getRating());
                    featureDTO.setIcon(featureReview.getFeature().getIcon());
                    featureDTOList.add(featureDTO);
                }
                for(FeatureDTO featureDTO1 : featureDTOList ){
                    System.out.println("feature : " + featureDTO1.getFeatureName());
                }
                reviewDTO.setFeatureDTOs(featureDTOList);
                individualReviewDTOList.add(reviewDTO);
            }
        }
        return individualReviewDTOList;
    }
}
