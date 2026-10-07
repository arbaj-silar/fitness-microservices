package com.fitness.activity.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitness.activity.dto.ActivityRequest;
import com.fitness.activity.dto.ActivityResponse;
import com.fitness.activity.service.ActivityService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/activities")
@AllArgsConstructor
public class ActivityController {

	private final ActivityService service;
	
	@PostMapping
	public ResponseEntity<ActivityResponse> trackActivity(
			@RequestBody ActivityRequest request,
			@RequestHeader("X-User-ID") String userId) {
		
		if(userId != null) {
			request.setUserId(userId);
		}
		return ResponseEntity.ok(service.trackActivity(request));
	}
	
	@GetMapping
	public ResponseEntity<List<ActivityResponse>> getUserActivities(
			@RequestHeader("X-User-ID") String userId) {
		return ResponseEntity.ok(service.getUserActivities(userId));
	}
	
	@GetMapping("/{activityId}")
	public ResponseEntity<ActivityResponse> getActivityById(
			@PathVariable("activityId") String activityId) {
		return ResponseEntity.ok(service.getActivityById(activityId));
	}
}
