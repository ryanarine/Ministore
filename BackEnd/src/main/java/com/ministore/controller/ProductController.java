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

import com.ministore.model.Product;
import com.ministore.model.User;
import com.ministore.service.ProductService;
import com.ministore.service.UserService;

@RestController
public class ProductController {
	@Autowired
	private ProductService ps;
	@Autowired
	private UserService us;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.POST, value ="/product/add")
	public void add(HttpServletRequest req, HttpServletResponse res) throws IOException {
		if (us.isStaff(req)) {
			String name = req.getParameter("name");
			String category = req.getParameter("category");
			String price = req.getParameter("price");
			String weight = req.getParameter("weight");
			Product p = new Product(name, weight, category, price);
			ps.add(p, category);
		}
		else {
			res.sendError(HttpServletResponse.SC_UNAUTHORIZED);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/product/all")
	public List<Product> get() {
		return ps.getAll();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.DELETE, value ="/product/delete")
	public void delete(HttpServletRequest req, HttpServletResponse res) throws IOException {
		if (us.isStaff(req)) {
			long id = Long.parseLong(req.getParameter("id"));
			if (ps.getById(id) != null) {
				ps.delete(id);
			}
			else {
				PrintWriter out = res.getWriter();
				out.print(HttpServletResponse.SC_NOT_FOUND);
			}
		}
		else {
			res.sendError(HttpServletResponse.SC_UNAUTHORIZED);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/product/category/{category}")
	public List<Product> filterProductsByCategory(@PathVariable String category){
		return ps.filterCategory(category);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/product/search/{search}")
	public List<Product> filterProductsbySearch(@PathVariable String search){
		return ps.filterSearch(search);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/product/categorysearch/{category}/{search}")
	public List<Product> filterProductsbySearch(@PathVariable String category, @PathVariable String search){
		return ps.filterCategoryAndSearch(category, search);
	}
}
