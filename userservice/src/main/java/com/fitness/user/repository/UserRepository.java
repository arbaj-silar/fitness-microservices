package com.fitness.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fitness.user.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

	boolean existsByEmail(String email);

	Boolean existsByKeycloakId(String userId);

	User findByEmail(String email);

}
