package com.revify.service;

import com.revify.dto.FeatureDTO;
import java.util.List;

/**
 * Created by kalyaninirmal on 3/26/2015.
 */
public interface FeatureService {
    public List<FeatureDTO> getFeatures(Long categoryID);
}
