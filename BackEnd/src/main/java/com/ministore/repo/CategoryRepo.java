package com.ministore.repo;

import java.awt.print.Pageable;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.ministore.model.Category;

public interface CategoryRepo extends CrudRepository<Category, String>{
	@Query("select count(*) from Product p where p.category = ?1")
	public int countProducts(String category);
}
