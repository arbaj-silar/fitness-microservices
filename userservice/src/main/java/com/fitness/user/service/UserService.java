package com.fitness.user.service;

import org.springframework.stereotype.Service;

import com.fitness.user.dto.RegisterRequest;
import com.fitness.user.dto.UserResponse;
import com.fitness.user.exception.UserNotFoundException;
import com.fitness.user.model.User;
import com.fitness.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

	private final UserRepository repository;
	
	public UserResponse getUserProfile(String userId) {
		User user = repository.findById(userId)
	            .orElseThrow(() ->
                new UserNotFoundException(
                        "User not found with id: " + userId
                )
        );
		
		return mapToResponse(user);
	}

	public UserResponse register(RegisterRequest request) {
		if (repository.existsByEmail(request.getEmail())) {
		    User existingUser = repository.findByEmail(request.getEmail());
		    return mapToResponse(existingUser);
		}

		
		User user = User.builder()
				.email(request.getEmail())
				.password(request.getPassword())
				.keycloakId(request.getKeycloakId())
				.firstName(request.getFirstName())
				.lastName(request.getLastName())
				.build();
		
		return mapToResponse(repository.save(user));
	}
	
	public UserResponse mapToResponse(User user) {
	    UserResponse response = new UserResponse();

	    response.setId(user.getId());
	    response.setEmail(user.getEmail());
	    response.setKeycloakId(user.getKeycloakId());
	    response.setPassword(user.getPassword());
	    response.setFirstName(user.getFirstName());
	    response.setLastName(user.getLastName());
	    response.setCreatedAt(user.getCreatedAt());
	    response.setUpdatedAt(user.getUpdatedAt());

	    return response;
	}

	public Boolean existByUserId(String userId) {
		log.info("Calling User Validation Api for userId: {}", userId);
		return repository.existsByKeycloakId(userId);
	}

	
	
}
