package com.ministore.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ministore.model.User;
import com.ministore.service.UserService;

@RestController
public class UserController {
	@Autowired
	private UserService us;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.POST, value ="/user/add")
	public void add(@RequestBody User u, HttpServletResponse res) throws IOException {
		if (us.hasUser(u.getUsername())) {
			PrintWriter out = res.getWriter();
			out.println(401);
		}
		us.add(u.getUsername(), u.getPassword(), u.getName());
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/user/name/{username}")
	public void getName(@PathVariable String username, HttpServletResponse res) throws IOException {
		PrintWriter out = res.getWriter();
		out.print(us.getName(username));
	}
}
