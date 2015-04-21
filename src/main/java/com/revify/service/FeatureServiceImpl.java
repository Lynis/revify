package com.revify.service;

import com.revify.dto.FeatureDTO;
import com.revify.entity.Feature;
import com.revify.entity.FeatureReview;
import com.revify.repository.FeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by kalyaninirmal on 3/26/2015.
 */
@Service
public class FeatureServiceImpl implements  FeatureService{

    @Autowired
    private FeatureRepository featureRepository;

    @Transactional
    @Override
    public List<FeatureDTO> getFeatures(Long categoryID) {

        List<FeatureDTO> featureDTOs = new ArrayList<FeatureDTO>();
        List<FeatureReview> features = featureRepository.findAll();

        for(FeatureReview featureReview : features){
            FeatureDTO featureDTO = new FeatureDTO();
            featureDTO.setIcon(featureReview.getFeature().getIcon());
            featureDTO.setFeatureName(featureReview.getFeature().getFeatureName());
            featureDTO.setFeatureID(featureReview.getFeature().getFeatureID());
            featureDTO.setOverallRating(featureReview.getRating());
            featureDTOs.add(featureDTO);
        }
        return featureDTOs;
    }
}
