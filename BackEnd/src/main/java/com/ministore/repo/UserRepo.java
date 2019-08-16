package com.ministore.repo;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.ministore.model.User;

public interface UserRepo extends CrudRepository<User, String> {
	@Query("select u.salt from User u where username = ?1")
	public byte[] getSalt(String username);
	@Query("select u.password from User u where username = ?1")
	public byte[] getPassword(String username);
	@Query("select u.name from User u where username = ?1")
	public String getName(String username);
	
	@Transactional
	@Modifying
	@Query("update User u set u.hash = ?2 where u.username = ?1")
	public void setHash(String username, byte[] hash);
}
