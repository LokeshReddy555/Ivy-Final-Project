package com.project.fruits.controllers;

import com.project.fruits.models.Score;
import com.project.fruits.models.User;
import com.project.fruits.repository.ScoreRepository;
import com.project.fruits.request.SignupRequest;
import com.project.fruits.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 4800)
@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	ScoreRepository scoreRepository;
	@GetMapping("/all")
	public MessageResponse allAccess() {
		return new MessageResponse("Server is up.....");
	}

	@GetMapping("/greeting")
	@PreAuthorize("isAuthenticated()")
	public MessageResponse userAccess() {

		return new MessageResponse("Congratulations! You are an authenticated user.");
	}

	@GetMapping("/user")
	public MessageResponse userContent() {
		return new MessageResponse("User Content");
	}


	@PreAuthorize("isAuthenticated()")
	@GetMapping("/getScores/{id}")
	@ResponseBody
	public List<Integer> getScores(@PathVariable String id) {
		List<Score> li = scoreRepository.findAllById(Long.parseLong(id));
		List<Integer> score_list = new ArrayList<Integer>();
		for(int i=0;i<li.size();i++) {
			score_list.add(li.get(i).getScore());
		}
		return score_list;
	}

	@PostMapping("/sendScore")
	public void sendScore(@RequestBody Score score) {
		scoreRepository.save(score);
	}
}
