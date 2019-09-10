package com.ministore.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
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
	@RequestMapping("/user/credentials/{username}/{hash}")
	public void getCredentials(@PathVariable String username, @PathVariable String hash, HttpServletResponse res) throws IOException {
		res.setContentType("application/json");
		PrintWriter out = res.getWriter();
		if (us.validHash(username, hash)) {
			out.print(String.format("{\"name\": \"%s\", \"privledge\": %d}", us.getName(username), us.getPrivledge(username)));
		}
		else {
			out.print(String.format("{\"name\": \"%s\", \"privledge\": %d}", "", -1));
		}
		out.close();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/nonMasterUsers/{username}/{hash}")
	public void getNonMasterUsers(@PathVariable String username, @PathVariable String hash, HttpServletResponse res) throws IOException {
		if (us.isUserAllowed(username, hash, User.MASTER)) {
			PrintWriter out = res.getWriter();
			res.setContentType("application/json");
			List<Object []> users = us.getNonMasterUsers();
			out.print("{\"list\": [");
			Object[] u;
			for (int i = 0; i < users.size() - 1; i++) {
				u = users.get(i);
				out.print(String.format("{\"username\": \"%s\", \"name\": \"%s\", \"privledge\": %d}, ", (String) u[0], (String) u[1], (int) u[2]));
			}
			u = users.get(users.size() - 1);
			out.print(String.format("{\"username\": \"%s\", \"name\": \"%s\", \"privledge\": %d}]}", (String) u[0], (String) u[1], (int) u[2]));
			out.close();
		}
		else {
			res.sendError(HttpServletResponse.SC_UNAUTHORIZED);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.POST, value ="/user/add")
	public void add(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String name = req.getParameter("name");
		String username = req.getParameter("username");
		String password = req.getParameter("password");
		PrintWriter out = res.getWriter();
		if (us.hasUser(username)) {
			out.print(HttpServletResponse.SC_CONFLICT);
		}
		else {
			us.add(username, password.getBytes(), name);
			out.print((new String(us.updateHash(username))));
		}
		out.close();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.POST, value ="/user/changePrivledge")
	public void changePrivledge(HttpServletRequest req, HttpServletResponse res) throws IOException {
		if (us.isMaster(req)) {
			String user = req.getParameter("user");
			int privledge = Integer.parseInt(req.getParameter("privledge"));
			us.changePrivledge(user, privledge);
		}
		else {
			res.sendError(HttpServletResponse.SC_UNAUTHORIZED);
		}
	}
}
