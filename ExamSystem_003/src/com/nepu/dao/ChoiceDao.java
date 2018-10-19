package com.nepu.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import org.springframework.stereotype.Repository;

import com.nepu.entity.Choice;

@Repository("choiceDao")
public class ChoiceDao extends BaseDao{
	public void addChoice (Choice choice) throws Exception{
		String sql="insert into tchoice values(?,?,?,?)";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1,choice.getOid());
		ps.setString(2,choice.getQno());
		ps.setString(3,choice.getOno());
		ps.setString(4,choice.getOname());
		ps.executeUpdate();
		ps.close();
	}
	
	
	public void updateChoice(String oid,String oname)throws Exception{
		String sql="update tchoice set oname=? where oid=?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, oname);
		ps.setString(2, oid);
		ps.executeUpdate();
		ps.close();
	}
}
