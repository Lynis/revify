package com.revify.repository;

import com.revify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by jchengottusseriy on 3/11/2015.
 */
public interface UserRepository extends JpaRepository<User, String> {
}
