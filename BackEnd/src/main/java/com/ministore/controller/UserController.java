package com.ministore.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
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
	public void add(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String name = req.getParameter("name");
		String username = req.getParameter("username");
		String password = req.getParameter("password");
		PrintWriter out = res.getWriter();
		if (us.hasUser(username)) {
			out.println(401);
		}
		else {
			us.add(username, password.getBytes(), name);
			out.println((new String(us.updateHash(username))));
		}
		out.close();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/user/name/{username}")
	public void getName(@PathVariable String username, HttpServletResponse res) throws IOException {
		PrintWriter out = res.getWriter();
		out.print(us.getName(username));
	}
}
