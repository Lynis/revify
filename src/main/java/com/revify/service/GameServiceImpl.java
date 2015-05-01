package com.revify.service;

import com.revify.dto.FeatureDTO;
import com.revify.dto.PlayerDTO;
import com.revify.dto.ProductDTO;
import com.revify.dto.ProductReviewDTO;
import com.revify.entity.*;
import com.revify.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by jchengottusseriy on 3/18/2015.
 */
@Service
public class GameServiceImpl implements GameService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PurchasedProductUserRepository purchasedProductUserRepository;

    @Autowired
    private PurchasedProductRepository purchasedProductRepository;

    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private ProductReviewRepository productReviewRepository;

    @Autowired
    private FeatureReviewRepository featureReviewRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public List<ProductDTO> getProductsPurchasedByEbayUser(String userID, String token) {
        //1. Make a call to orders api using the user token to get list of user orders.
        //2. Extract the products in each order
        //3. For each product if the product is not in purchased products table, save the product and
        //   make an entry in purchased product user association
        //4. Get all reviewed products
        //5. Get all purchased products not reviewed yet
        //6. Merge 4 an 5.
        User user = userRepository.findOne(userID);
        List<ProductReview> reviewedProducts = user.getProductReviewList();
        List<PurchasedProductUser> purchasedProductUserList = purchasedProductUserRepository.findByUser(user);

        List<ProductDTO> productDTOs = new ArrayList<ProductDTO>();
        for (PurchasedProductUser purchasedProductUser: purchasedProductUserList){
            PurchasedProduct purchasedProduct = purchasedProductUser.getProduct();
            ProductDTO productDTO = new ProductDTO();
            productDTO.setImage(purchasedProduct.getImage());
            productDTO.setProductName(purchasedProduct.getProductName());
            productDTO.setProductID(purchasedProduct.getProductID());

            List<Feature> features = purchasedProduct.getCategory().getFeatureList();
            List<FeatureDTO> featureDTOs = new ArrayList<FeatureDTO>();

            for (Feature feature: features){
                FeatureDTO featureDTO = new FeatureDTO();
                featureDTO.setFeatureID(feature.getFeatureID());
                featureDTO.setFeatureName(feature.getFeatureName());
                featureDTO.setIcon(feature.getIcon());
                featureDTOs.add(featureDTO);
            }
            productDTO.setFeatures(featureDTOs);

            for(ProductReview review: reviewedProducts){
                if (review.getProduct().equals(purchasedProduct)){
                    productDTO.setReviewed(true);
                    break;
                }
            }
            productDTOs.add(productDTO);
        }
        return productDTOs;
    }

    @Override
    @Transactional
    public void saveProductFeatureRating(ProductReviewDTO productReviewDTO) {
        //1. Get product review id for the given product & reviewer from DB
        //2. If null, create a product review entry for the given product & reviewer; else go to step 3
        //3. If featureRatingDTO is null && overallRating != null
        //     save the overall rating for the product
        //   Else if featureRatingDTO != null
        //     save the featureRating in DB

        User reviewer = userRepository.findOne(productReviewDTO.getReviewerID());
        PurchasedProduct purchasedProduct = purchasedProductRepository.findOne(productReviewDTO.getProductID());

        ProductReview productReview = productReviewRepository.findByReviewerAndProduct(reviewer, purchasedProduct);
        if (productReview == null) { //create
            productReview = new ProductReview();
            productReview.setReviewer(reviewer);
            productReview.setProduct(purchasedProduct);
            productReview.setReviewDate(productReviewDTO.getReviewDate());
            productReview.setOverallRating((int)productReviewDTO.getOverallRating());
            productReviewRepository.save(productReview);
            entityManager.flush();


            for (FeatureDTO featureDTO: productReviewDTO.getFeatureDTOList()){
                FeatureReview featureReview = new FeatureReview();
                Feature feature = featureRepository.findOne(featureDTO.getFeatureID());
                featureReview.setFeature(feature);
                featureReview.setRating(featureDTO.getOverallRating());
                featureReview.setProductReview(productReview);

                featureReviewRepository.save(featureReview);
            }
            entityManager.flush();
        } else { //update
            productReview.setReviewDate(productReviewDTO.getReviewDate());
            productReview.setOverallRating((int)productReviewDTO.getOverallRating());
            List<FeatureReview> featureReviews = productReview.getFeatureReviewList();
            for (FeatureDTO featureDTO: productReviewDTO.getFeatureDTOList()){
                for (FeatureReview featureReview: featureReviews){
                    if (featureReview.getFeature().getFeatureID().equals(featureDTO.getFeatureID())){
                        featureReview.setRating(featureDTO.getOverallRating());
                    }
                }
            }

            productReviewRepository.save(productReview);
        }

        reviewer.setScore(productReviewDTO.getScore() + reviewer.getScore());//update the score
        userRepository.save(reviewer);
    }

    @Override
    @Transactional
    public List<PlayerDTO> getLeaderboard() {
        List<User> players = userRepository.findAll(new Sort(new Sort.Order(Sort.Direction.DESC, "score")));
        List<PlayerDTO> playerDTOs = new ArrayList<PlayerDTO>();
        int count = 0;
        for (User player: players){
            if (player.getScore() != 0) {
                PlayerDTO playerDTO = new PlayerDTO();
                playerDTO.setUserID(player.getUserID());
                playerDTO.setTotalScore(player.getScore());
                playerDTO.setNoOfProductsReviewed(player.getProductReviewList().size());
                playerDTOs.add(playerDTO);
                count ++;
                if (count == 10) //top ten
                   break;
            }
        }
        return playerDTOs;
    }
}
