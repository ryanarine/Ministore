package com.ministore;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepo extends CrudRepository<Product, Long>{
	public Product findOneById(long id);
	
	@Query("select p from Product p where category = ?1 order by name")
	public List<Product> filterCategory(String category);
	
	@Query("select p from Product p where name like ?1% order by name")
	public List<Product> filterSearch(String search);
	
	@Query("select p from Product p where category = ?1 and name like ?2% order by name")
	public List<Product> filterCategoryAndSearch(String category, String search);
}
