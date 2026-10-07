package com.fitness.ai.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitness.ai.model.Recommendation;
import com.fitness.ai.service.RecommendationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recommendations")
public class RecommendationController {

	private final RecommendationService service;
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Recommendation>> getUserRecommendation(
			@PathVariable("userId") String userId) {
		return ResponseEntity.ok(service.getUserRecommendation(userId));
	}
	
	@GetMapping("/activity/{activityId}")
	public ResponseEntity<Recommendation> getActivityRecommendation(
			@PathVariable("activityId") String activityId) {
		return ResponseEntity.ok(service.getActivityRecommendation(activityId));
	}
}
