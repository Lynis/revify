package com.revify.repository;

import com.revify.entity.PurchasedProductUser;
import com.revify.entity.PurchasedProductUserId;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.*;
/**
 * Created by Vijaya on 3/24/2015.
 */
public interface PurchasedProductUserRepository extends JpaRepository<PurchasedProductUser, PurchasedProductUserId>{
}
