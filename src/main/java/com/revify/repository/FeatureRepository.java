package com.revify.repository;

import com.revify.entity.Feature;
import com.revify.entity.FeatureReview;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by kalyaninirmal on 3/26/2015.
 */
public interface FeatureRepository extends JpaRepository<FeatureReview, Long> {
}
