package com.revify.service;

import com.revify.dto.FeatureDTO;
import com.revify.dto.ProductDTO;
import com.revify.dto.ProductReviewDTO;
import com.revify.entity.*;
import com.revify.repository.PurchasedProductUserRepository;
import com.revify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public void saveProductFeatureRating(ProductReviewDTO productReviewDTO) {
        //1. Get product review id for the given product & reviewer from DB
        //2. If null, create a product review entry for the given product & reviewer; else go to step 3
        //3. If featureRatingDTO is null && overallRating != null
        //     save the overall rating for the product
        //   Else if featureRatingDTO != null
        //     save the featureRating in DB
    }
}
