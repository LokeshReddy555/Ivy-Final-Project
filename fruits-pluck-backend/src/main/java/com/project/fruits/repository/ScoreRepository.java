package com.project.fruits.repository;

import com.project.fruits.models.Score;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findAllById(Long id);
}
