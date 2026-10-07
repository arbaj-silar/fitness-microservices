package com.fitness.activity.model;

import java.time.LocalDateTime;
import java.util.Map;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "activities")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;
	
	private String userId;
	private ActivityType type;
	private Integer duration; 
	private Integer caloriesBurned;
	private LocalDateTime startTime;
	
	@JdbcTypeCode(SqlTypes.JSON)
	@Column(name = "metrics", columnDefinition = "NVARCHAR(MAX)")
	private Map<String, Object> additionalMetrics;

	@CreationTimestamp
	private LocalDateTime createdAt;
	
	@UpdateTimestamp
	private LocalDateTime updatedAt;
}
