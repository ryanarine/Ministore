package com.ministore.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ministore.service.UserService;

@Controller
public class LoginController{
	
	@Autowired
	private UserService us;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.POST, value ="/login")
	public void login(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		String username = req.getParameter("username");
		String password = req.getParameter("password");
		PrintWriter out = res.getWriter();
		if (!us.isValidUser(username, password)) {
			out.println(401);
		}
		else {
			out.println((new String(us.updateHash(username))));
		}
		out.close();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/login/{username}")
	public void isUser(@PathVariable String username, HttpServletResponse res) throws IOException {
		res.getWriter().println(us.hasUser(username));
	}
	

}
