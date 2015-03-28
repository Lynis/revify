package com.revify.repository;

import com.revify.entity.PurchasedProductUser;
import com.revify.entity.PurchasedProductUserId;
import com.revify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Vijaya on 3/24/2015.
 */
public interface PurchasedProductUserRepository extends JpaRepository<PurchasedProductUser, PurchasedProductUserId>{

    public List<PurchasedProductUser> findByUser(User user);
}
