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
import java.util.*;


@Service
public class ReviewServiceImpl implements ReviewService {

    private final PurchasedProductRepository productRepository;

    private final ReviewRepository reviewRepository;

    private static final int REVIEWS_PER_ROW = 4;

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

        // Only the required number of reviews will be returned
        int cnt = REVIEWS_PER_ROW;
        for(ProductReview review: reviewList){
            if(review.getProduct().getCategory().getCategoryID().equals(categoryID) && cnt!=0) {
                LatestReviewDTO reviewDTO = new LatestReviewDTO();
                reviewDTO.setProductID(review.getProduct().getProductID());
                reviewDTO.setProductName(review.getProduct().getProductName());
                reviewDTO.setImage(review.getProduct().getImage());
                reviewDTO.setOverallRating(review.getOverallRating());
                reviewDTO.setReviewDate(review.getReviewDate());
                reviewDTO.setReviwer(review.getReviewer().getUserID());

                reviewDTOList.add(reviewDTO);
                cnt--;
            }
        }
        return reviewDTOList;
    }

    @Override
    @Transactional
    public List<ReviewDTO> getAggregatedReviews(Long categoryID){

        List<ReviewDTO> aggReviewDTOList = new ArrayList<ReviewDTO>();

        List<PurchasedProduct> purchasedProductList = productRepository.findAll();

        for(PurchasedProduct purchasedProduct : purchasedProductList){

            if(purchasedProduct.getCategory().getCategoryID().equals(categoryID)){

                Map<Long, Integer> featureReviewMap = new LinkedHashMap<>();

                ReviewDTO reviewDTO = new ReviewDTO();

                ProductDTO productDTO = new ProductDTO();
                productDTO.setProductID(purchasedProduct.getProductID());
                productDTO.setProductName(purchasedProduct.getProductName());
                productDTO.setImage(purchasedProduct.getImage());
                productDTO.setNoOfReviews(purchasedProduct.getReviews().size());

                List<ProductReview> productReviewList = purchasedProduct.getReviews();
                List<FeatureDTO> featureDTOList = null;

                int productOverAllRating = 0;
                int totalNoReviews = purchasedProduct.getReviews().size();


                for(ProductReview productReview : productReviewList){

                    featureDTOList = new ArrayList<>();

                    productOverAllRating = productOverAllRating + productReview.getOverallRating();
                    productOverAllRating = productOverAllRating/totalNoReviews;
                    productDTO.setOverallRating(productOverAllRating);

                    List<FeatureReview> featureReviewList = productReview.getFeatureReviewList();

                    for(FeatureReview featureReview : featureReviewList){

                        if(featureReviewMap.containsKey(featureReview.getFeature().getFeatureID())){
                            int value = featureReviewMap.get(featureReview.getFeature().getFeatureID());
                            value = value + featureReview.getRating();
                            featureReviewMap.put(featureReview.getFeature().getFeatureID(), value/totalNoReviews);
                        }
                        else {
                            int rating = featureReview.getRating();
                            featureReviewMap.put(featureReview.getFeature().getFeatureID(), rating);
                        }
                    }

                    for(FeatureReview featureReview : featureReviewList){
                        FeatureDTO featureDTO = new FeatureDTO();
                        featureDTO.setFeatureID(featureReview.getFeature().getFeatureID());
                        featureDTO.setFeatureName(featureReview.getFeature().getFeatureName());
                        featureDTO.setIcon(featureReview.getFeature().getIcon());
                        featureDTO.setOverallRating(featureReviewMap.get(featureReview.getFeature().getFeatureID()));
                        featureDTOList.add(featureDTO);
                    }
                }
                productDTO.setFeatures(featureDTOList);
                reviewDTO.setProductDTO(productDTO);
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
                ProductDTO productDTO = new ProductDTO();
                productDTO.setProductID(purchasedProduct.getProductID());
                productDTO.setProductName(purchasedProduct.getProductName());
                productDTO.setImage(purchasedProduct.getImage());

                List<ProductReview> productReviewList = purchasedProduct.getReviews();
                List<FeatureDTO> featureDTOList = null;
                List<ProductReviewDTO> productReviewDTOList = new ArrayList<>();

                int productOverAllRating = 0;

                    for(ProductReview productReview : productReviewList){

                    featureDTOList = new ArrayList<>();
                    ProductReviewDTO productReviewDTO = new ProductReviewDTO();

                    productOverAllRating = productOverAllRating + productReview.getOverallRating();
                    productOverAllRating = productOverAllRating/(productReviewList.size());
                    productDTO.setOverallRating(productOverAllRating);

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
                productDTO.setProductReviewDTOs(productReviewDTOList);
                reviewDTO.setProductDTO(productDTO);
                individualReviewDTOList.add(reviewDTO);
            }
        }
        return individualReviewDTOList;
    }

    @Override
    @Transactional
    public List<ReviewDTO> getSortedReviews(Long categoryID, String featureName){

        List<ReviewDTO> sortedReviewDTOList = new ArrayList<ReviewDTO>();

        List<PurchasedProduct> purchasedProductList = productRepository.findAll();

        for(PurchasedProduct purchasedProduct : purchasedProductList){

            if(purchasedProduct.getCategory().getCategoryID().equals(categoryID)){

                Map<Long, Integer> featureReviewMap = new LinkedHashMap<>();

                ReviewDTO reviewDTO = new ReviewDTO();
                ProductDTO productDTO = new ProductDTO();
                productDTO.setProductID(purchasedProduct.getProductID());
                productDTO.setPrice(purchasedProduct.getPrice());
                productDTO.setProductName(purchasedProduct.getProductName());
                productDTO.setImage(purchasedProduct.getImage());
                productDTO.setNoOfReviews(purchasedProduct.getReviews().size());

                List<ProductReview> productReviewList = purchasedProduct.getReviews();
                List<FeatureDTO> featureDTOList = null;

                int productOverAllRating = 0;
                int totalNoReviews = purchasedProduct.getReviews().size();


                for(ProductReview productReview : productReviewList){

                    featureDTOList = new ArrayList<>();

                    productOverAllRating = productOverAllRating + productReview.getOverallRating();
                    productOverAllRating = productOverAllRating/totalNoReviews;
                    productDTO.setOverallRating(productOverAllRating);

                    List<FeatureReview> featureReviewList = productReview.getFeatureReviewList();

                    for(FeatureReview featureReview : featureReviewList){
                        if(featureReview.getFeature().getFeatureName().equalsIgnoreCase(featureName)){
                            if(featureReviewMap.containsKey(featureReview.getFeature().getFeatureID())){
                                int value = featureReviewMap.get(featureReview.getFeature().getFeatureID());
                                value = value + featureReview.getRating();
                                featureReviewMap.put(featureReview.getFeature().getFeatureID(), value/totalNoReviews);
                            }
                            else {
                                int rating = featureReview.getRating();
                                featureReviewMap.put(featureReview.getFeature().getFeatureID(), rating);
                            }
                        }
                    }

                    for(FeatureReview featureReview : featureReviewList){
                        if(featureReview.getFeature().getFeatureName().equalsIgnoreCase(featureName)){
                            FeatureDTO featureDTO = new FeatureDTO();
                            featureDTO.setFeatureID(featureReview.getFeature().getFeatureID());
                            featureDTO.setFeatureName(featureReview.getFeature().getFeatureName());
                            featureDTO.setIcon(featureReview.getFeature().getIcon());
                            featureDTO.setOverallRating(featureReviewMap.get(featureReview.getFeature().getFeatureID()));
                            featureDTOList.add(featureDTO);
                        }
                    }
                }
                productDTO.setFeatures(featureDTOList);
                reviewDTO.setProductDTO(productDTO);
                sortedReviewDTOList.add(reviewDTO);
            }
        }
        return sortedReviewDTOList;
    }
}
