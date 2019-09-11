package com.ministore.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ministore.model.User;
import com.ministore.service.ProductService;
import com.ministore.service.UserService;

@RestController
public class TransactionController {
	@Autowired
	private UserService us;
	@Autowired
	private ProductService ps;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.POST, value = "transaction/deposit")
	public void deposit(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String username = req.getParameter("username");
		String hash = req.getParameter("hash");
		double deposit = Double.parseDouble(req.getParameter("deposit"));
		if (deposit < 0) {
			res.sendError(HttpServletResponse.SC_FORBIDDEN);
		}
		else if (us.isUserAllowed(username, hash, User.CUSTOMER)) {
			us.deposit(username, deposit);
		}
		else {
			res.sendError(HttpServletResponse.SC_NOT_FOUND);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.POST, value = "transaction/buy")
	public void buy(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String username = req.getParameter("username");
		String hash = req.getParameter("hash");
		long id = Long.parseLong(req.getParameter("id"));
		int quantity = Integer.parseInt(req.getParameter("quantity"));
		PrintWriter out = res.getWriter();
		if (quantity <= 0) {
			out.print((HttpServletResponse.SC_FORBIDDEN));
		}
		if (us.isUserAllowed(username, hash, User.CUSTOMER)) {
			if(!us.buy(username, ps.getById(id).getPrice() , quantity)) {
				out.print((HttpServletResponse.SC_FORBIDDEN));
			}
			else {
				out.print(String.format("{\"wallet\": %.2f}", us.getWallet(username)));
			}
		}
		else {
			res.sendError(HttpServletResponse.SC_NOT_FOUND);
		}
		out.close();
	}
}
