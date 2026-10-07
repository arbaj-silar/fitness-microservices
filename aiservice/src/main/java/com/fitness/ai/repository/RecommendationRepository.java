package com.fitness.ai.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fitness.ai.model.Recommendation;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, String> {

	Optional<Recommendation> findByActivityId(String activityId);

	List<Recommendation> findByUserId(String userId);

}
