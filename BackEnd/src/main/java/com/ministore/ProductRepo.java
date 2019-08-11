package com.ministore;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ProductRepo extends CrudRepository<Product, Long>{
	public Product findOneById(long id);
	
	public List<Product> findByCategory(String category);
}
