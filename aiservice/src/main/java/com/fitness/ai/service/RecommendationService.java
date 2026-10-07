package com.fitness.ai.service;

import java.util.List;
 
import org.springframework.stereotype.Service;

import com.fitness.ai.model.Recommendation;
import com.fitness.ai.repository.RecommendationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecommendationService {

	private final RecommendationRepository repository;
	
	public List<Recommendation> getUserRecommendation(String userId) {
		return repository.findByUserId(userId);
	}

	public Recommendation getActivityRecommendation(String activityId) {
		return repository.findByActivityId(activityId)
				.orElseThrow(() -> new RuntimeException(
						"No recommmendation found for this activity: "+activityId)
				);
	}

}
