package com.project.fruits.repository;

import com.project.fruits.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
	Optional<User> findByUsername(String username);

	User findById(Long id);
	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
}
