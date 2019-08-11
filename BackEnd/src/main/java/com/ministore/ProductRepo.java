package com.ministore;

import org.springframework.data.repository.CrudRepository;

public interface ProductRepo extends CrudRepository<Product, Long>{
	public Product findOneById(long id);
}
