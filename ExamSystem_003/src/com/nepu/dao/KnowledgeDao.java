package com.nepu.dao;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.nepu.dto.Know;
import com.nepu.entity.Knowledge;
import com.nepu.entity.TurnPage;

@Repository("knowledgeDao")
public class KnowledgeDao extends BaseDao{

	public List<Know> QuerybyCon(String kname,String uno,TurnPage tp) throws Exception{
		List<Know> list = null;
		String sql = "select kno,kname,cname from tknow k,tcoutea ct,tcourse c where k.cno=ct.cno and  c.cno=k.cno and uno='"+uno+"'";
		if(kname!=null && !kname.equals("")){
			sql=sql+" and kname like '%"+kname+"%'";
		}
		Connection conn = this.openConnection();
		tp.allRows=this.getSqlAllRows(sql);		
		tp.allPages=(tp.allRows-1)/tp.rows+1;
		if(tp.page>tp.allPages){
			tp.page=tp.allPages;
		}
		int iStart = (tp.page-1)*tp.rows;
		String newSql=this.getTurnPageSql(sql, iStart, tp.rows);		
		PreparedStatement ps = conn.prepareStatement(newSql);
		list = new ArrayList<Know>();
		ResultSet rs = ps.executeQuery();
		while (rs.next()) {
			Know know = new Know();
			know.setKno(rs.getString("kno"));
			know.setKname(rs.getString("kname"));
			know.setCname(rs.getString("cname"));
			list.add(know);			
		}
		ps.close();
		rs.close();
		return list;
	}



	public void addknow(String kno, String cno, String kname) throws Exception{

		String sql = "insert into tknow values (?,?,?)";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, kno);
		ps.setString(2, cno);
		ps.setString(3, kname);
		ps.executeUpdate();
		ps.close();
	}



	public void deleteKnow(String kno) throws Exception{
		String sql ="delete from tknow where kno=?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, kno);
		ps.executeUpdate();
		ps.close();
		
	}



	public Knowledge getKnowBykno(String kno) throws Exception {
		Knowledge know = null;
		String sql = "select * from tknow where kno=?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, kno);
		ResultSet rs = ps.executeQuery();
		while(rs.next()){
			know = new Knowledge();
			know.setKno(kno);
			know.setKname(rs.getString("kname"));
			know.setCno(rs.getString("cno"));	
		}
		rs.close();
		ps.close();
		return know;
	}
	
	public void updateKnow(String kno, String kname) throws Exception{
		String sql="update tknow set kname=? where kno=?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, kname);
		ps.setString(2,kno);
		ps.executeUpdate();
		ps.close();
		
	}
	
	public List<Knowledge> getAllknowBycno(String cno) throws Exception {
		List<Knowledge> list = null;
		String sql = "select * from tknow where cno=?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, cno);
		ResultSet rs = ps.executeQuery();
		list = new ArrayList<Knowledge>();
		while(rs.next()){
			Knowledge know = new Knowledge();
			know.setCno(rs.getString("cno"));
			know.setKname(rs.getString("kname"));
			know.setKno(rs.getString("kno"));
			list.add(know);
		}
		rs.close();
		ps.close();
		return list;
	}


}
