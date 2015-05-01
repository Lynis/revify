package com.revify.service;

import com.revify.dto.*;
import com.revify.entity.*;
import com.revify.repository.FeatureReviewRepository;
import com.revify.repository.PurchasedProductUserRepository;
import com.revify.repository.ReviewRepository;
import com.revify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.*;

/**
 * Created by MohulT430 on 4/4/2015.
 */
@Service
public class FeedbackserviceImpl implements FeedbackService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PurchasedProductUserRepository purchasedProductUserRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private FeatureReviewRepository featureReviewRespository;

    @Override
    @Transactional
    public List<FeedbackDTO> getNumberOfReviews(String userID) {

        User user = userRepository.findOne(userID);
        List<PurchasedProductUser> purchasedProductUserList = purchasedProductUserRepository.findByUser(user);

        List<FeedbackDTO> feedbackDTOList = new ArrayList<FeedbackDTO>();

        for (PurchasedProductUser purchasedProductUser : purchasedProductUserList) {
            PurchasedProduct product = purchasedProductUser.getProduct();

            FeedbackDTO feedbackDTO = getFeedbackDto(product);
            feedbackDTOList.add(feedbackDTO);
        }

        return feedbackDTOList;
    }

    @Transactional
    public FeedbackDTO getFeedbackDto(PurchasedProduct product){

        FeedbackDTO feedbackDTO = new FeedbackDTO();

        feedbackDTO.setProductName(product.getProductName());
        feedbackDTO.setProductID(product.getProductID());


        Date endDate = new Date();
        Timestamp endTime = new Timestamp(endDate.getTime());

        Calendar cal = Calendar.getInstance();
        cal.setTime(endDate);
        cal.add(Calendar.DATE, -365);
        Date startDate = cal.getTime();
        Timestamp startTime = new Timestamp(startDate.getTime());

        List<ProductReview> productReviews = reviewRepository.findReviewByProductId(product.getProductID(),startTime, endTime);

        FeedbackProductDTO feedbackProductDTO = getFeedbackProductDTO(productReviews);
        feedbackDTO.setFeedbackProductDTO(feedbackProductDTO);
        return feedbackDTO;
    }

    @Transactional
    public FeedbackProductDTO getFeedbackProductDTO(List<ProductReview> productReviews){
        FeedbackProductDTO productDTO = new FeedbackProductDTO();

        Map<Integer, Integer> reviewCountMap = new HashMap<Integer, Integer>();

        Map<Integer,Float> productReviewMap = new HashMap<Integer, Float>();

        Map<Integer,List<ProductReview>> productReviewMonthMap = new HashMap<Integer, List<ProductReview>>();

        for(ProductReview review: productReviews){

            Calendar cal = Calendar.getInstance();
            cal.setTimeInMillis(review.getReviewDate().getTime());
            int month = cal.get(Calendar.MONTH);

            if(productReviewMonthMap.containsKey(month)){
                productReviewMonthMap.get(month).add(review); //Add review  if month exists
            } else{
                List<ProductReview> productReviewList = new ArrayList<ProductReview>();
                productReviewList.add(review);
                productReviewMonthMap.put(month,productReviewList);
            }
        }
        int month = 0;
        List<ProductReview> monthlyProductReview;

        Map<Integer, List<FeedbackFeatureDTO>> featureRatingMap = new HashMap<Integer, List<FeedbackFeatureDTO>>();

        int [] featureRatingArray;

        List<FeedbackFeatureDTO> featureDTOList;

        Iterator entries = productReviewMonthMap.entrySet().iterator();
        while(entries.hasNext()){
            Map.Entry thisEntry = (Map.Entry) entries.next();
            month = (Integer) thisEntry.getKey();
            monthlyProductReview = (List<ProductReview>) thisEntry.getValue();

            int total = 0;
            List<FeatureReview> featureReviewList = monthlyProductReview.get(0).getFeatureReviewList();
            featureRatingArray = new int[featureReviewList.size()];
            featureDTOList = getFeedbackFeatureDTOList(featureReviewList);
            for(ProductReview review: monthlyProductReview){
                total = total + review.getOverallRating();

                List<FeatureReview> featureReviewList1 = review.getFeatureReviewList();

                for(int i=0;i<featureReviewList.size();i++){
                    featureRatingArray[i] = featureRatingArray[i] + featureReviewList1.get(i).getRating();
                }
            }
            int count = monthlyProductReview.size();

            for(int i=0;i<featureRatingArray.length;i++){
                float featureRatingAverage = featureRatingArray[i]/count;
                featureDTOList.get(i).setAverageRating(featureRatingAverage);
            }
            float average = total/monthlyProductReview.size();

            reviewCountMap.put(month,count);
            productReviewMap.put(month,average);
            featureRatingMap.put(month,featureDTOList);
        }

        productDTO.setReviewCountMap(reviewCountMap);
        productDTO.setProductReviewMap(productReviewMap);
        productDTO.setFeatureRatingMap(featureRatingMap);

        return productDTO;
    }

    @Transactional
    public List<FeedbackFeatureDTO> getFeedbackFeatureDTOList(List<FeatureReview> featureReviews) {

        List<FeedbackFeatureDTO> feedbackFeatureDTOList = new ArrayList<FeedbackFeatureDTO>();

        for(FeatureReview featureReview: featureReviews){
            FeedbackFeatureDTO feedbackFeatureDTO = new FeedbackFeatureDTO();
            feedbackFeatureDTO.setFeatureID(featureReview.getFeature().getFeatureID());
            feedbackFeatureDTO.setFeatureName(featureReview.getFeature().getFeatureName());
            feedbackFeatureDTOList.add(feedbackFeatureDTO);
        }
        return feedbackFeatureDTOList;
    }
}
