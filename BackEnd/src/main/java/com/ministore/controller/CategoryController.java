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

@RestController
public class CategoryController {
	@Autowired
	private CategoryService cs;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.POST, value ="/category/add")
	public void add(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String name = req.getParameter("name");
		if (cs.has(name)) {
			PrintWriter out = res.getWriter();
			out.print(409);
		}
		else {
			Category c = new Category(name);
			cs.add(c);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.DELETE, value ="/category/delete")
	public void delete(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String name = req.getParameter("name");
		if (!cs.has(name)) {
			PrintWriter out = res.getWriter();
			out.print(412);
		}
		else if (!cs.delete(name)) {
			PrintWriter out = res.getWriter();
			out.print(403);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/category/all")
	public List<Category> get() {
		return cs.getAll();
	}
}
