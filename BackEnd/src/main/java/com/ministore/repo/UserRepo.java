package com.ministore.repo;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.ministore.model.User;

public interface UserRepo extends CrudRepository<User, String> {
	@Query("select u.name from User u where username = ?1")
	public String getName(String username);
	
	@Query("select u.hash from User u where username = ?1")
	public byte[] getHash(String username);
	
	@Query("select u.salt from User u where username = ?1")
	public byte[] getSalt(String username);
	
	@Query("select u.password from User u where username = ?1")
	public byte[] getPassword(String username);
	
	@Query("select u.privledge from User u where username = ?1")
	public int getPrivledge(String username);
	
	@Query("select u.money from User u where username = ?1")
	public double getMoney(String username);
	
	@Query("select u.username, u.name, u.privledge from User u where u.privledge != ?1")
	public List<Object[]> getNonMasterUsers(int masterPrivledge);
	
	@Query("select u.name, u.privledge from User u where u.username = ?1 and u.hash = ?2")
	public List<Object[]> getCredentials(String username, byte[] hash);
	
	@Transactional
	@Modifying
	@Query("update User u set u.hash = ?2 where u.username = ?1")
	public void setHash(String username, byte[] hash);
	
	@Transactional
	@Modifying
	@Query("update User u set u.privledge = ?2 where u.username = ?1")
	public void changePrivledge(String username, int privledge);
	
	@Transactional
	@Modifying
	@Query("update User u set u.money = ?2 + u.money where u.username = ?1")
	public void increaseMoney(String username, double deposit);
}
