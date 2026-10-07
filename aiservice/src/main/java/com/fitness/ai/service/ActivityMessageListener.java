package com.fitness.ai.service;

import com.fitness.ai.model.Activity;
import com.fitness.ai.model.Recommendation;
import com.fitness.ai.repository.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityMessageListener {

    private final ActivityAIService aiService;
    private final RecommendationRepository recommendationRepository;

    @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void processActivity(Activity activity) {
        if (activity == null || activity.getId() == null) {
            log.warn("Received invalid or null activity message.");
            return;
        }

        log.info("Received activity for processing: {}", activity.getId());
        try {
            Recommendation recommendation = aiService.generateRecommendation(activity);
            recommendationRepository.save(recommendation);
            log.info("Successfully saved recommendation for activity ID: {}", activity.getId());
        } catch (Exception e) {
            log.error("Error processing activity message for ID: {}", activity.getId(), e);
        }
    }
}