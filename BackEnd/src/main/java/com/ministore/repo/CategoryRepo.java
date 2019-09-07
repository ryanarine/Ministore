package com.ministore.repo;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.ministore.model.Category;

public interface CategoryRepo extends CrudRepository<Category, String>{
	@Transactional
	@Modifying
	@Query("update Category c set c.products = c.products + 1 where c.name = ?1")
	public void increment(String category);
	
	@Transactional
	@Modifying
	@Query("update Category c set c.products = c.products - 1 where c.name = ?1")
	public void decrement(String category);
	
	@Query("select c.products from Category c where c.name = ?1")
	public long countProducts(String category);
}
