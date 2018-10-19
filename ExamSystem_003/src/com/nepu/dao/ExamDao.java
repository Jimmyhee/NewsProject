package com.nepu.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import org.springframework.stereotype.Repository;

@Repository("examDao")
public class ExamDao extends BaseDao{
	public void exam(String ano,String pno,String qno,String answers,String uno)throws Exception{
		String sql="insert into tanswer values(?,?,?,?,?)";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, ano);
		ps.setString(2, pno);
		ps.setString(3, qno);
		ps.setString(4, answers);
		ps.setString(5, uno);
		ps.executeUpdate();
		ps.close();
	}
}
