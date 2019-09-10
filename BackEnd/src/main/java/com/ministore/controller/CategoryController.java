package com.ministore.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ministore.model.Category;
import com.ministore.service.CategoryService;
import com.ministore.service.UserService;

@RestController
public class CategoryController {
	@Autowired
	private CategoryService cs;
	@Autowired
	private UserService us;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.POST, value ="/category/add")
	public void add(HttpServletRequest req, HttpServletResponse res) throws IOException {
		if (us.isMaster(req)) {
			String name = req.getParameter("name");
			if (cs.has(name)) {
				PrintWriter out = res.getWriter();
				out.print(HttpServletResponse.SC_CONFLICT);
			}
			else {
				Category c = new Category(name);
				cs.add(c);
			}
		}	
		else {
			res.sendError(HttpServletResponse.SC_UNAUTHORIZED);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.DELETE, value ="/category/delete")
	public void delete(HttpServletRequest req, HttpServletResponse res) throws IOException {
		if (us.isMaster(req)) {
			String name = req.getParameter("name");
			PrintWriter out = res.getWriter();
			if (!cs.has(name)) {
				out.print(HttpServletResponse.SC_NOT_FOUND);
			}
			// Category still has products in it
			else if (!cs.delete(name)) {
				out.print(HttpServletResponse.SC_FORBIDDEN);
			}
			out.close();
		}
		else {
			res.sendError(HttpServletResponse.SC_UNAUTHORIZED);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/category/all")
	public List<Category> get() {
		return cs.getAll();
	}
}
