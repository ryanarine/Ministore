package com.ministore.repo;

import org.springframework.data.repository.CrudRepository;

import com.ministore.model.Category;

public interface CategoryRepo extends CrudRepository<Category, String>{
}
