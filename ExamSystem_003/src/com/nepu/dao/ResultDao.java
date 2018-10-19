package com.nepu.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.nepu.dto.Resultdto;
import com.nepu.entity.TurnPage;

@Repository("resultDao")
public class ResultDao extends BaseDao{
	public void addResult(String said,String uno,String pno)throws Exception{
		String sql = "insert into tsturesult values(?,?,?,?,?)";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, said);
		ps.setString(2, uno);
		ps.setString(3, pno);
		ps.setDouble(4, 0);
		ps.setInt(5,0);
		ps.executeUpdate();
		ps.close();
	}
	
	public List<Resultdto> queryResult(String uno,String ptitle,TurnPage tp)throws Exception{
		List<Resultdto> list = null;
		String sql = "select r.*,p.ptitle from tsturesult r,tpaper p where r.uno='"+uno+"' and r.pno=p.pno and ischecked=1";
		if(ptitle!=null && !ptitle.equals("")){
			sql = sql + " and p.ptitle like '%"+ptitle+"%'"; 
		}
		Connection conn = this.openConnection();
		tp.allRows=this.getSqlAllRows(sql);		
		tp.allPages=(tp.allRows-1)/tp.rows+1;
		if(tp.page>tp.allPages){
			tp.page=tp.allPages;
		}
		
		int iStart = (tp.page-1)*tp.rows;
		String newSql=this.getTurnPageSql(sql, iStart, tp.rows);		
		PreparedStatement ps =conn.prepareStatement(newSql);
		list = new ArrayList<Resultdto>();
		ResultSet rs = ps.executeQuery();
		while (rs.next()) {
			Resultdto result = new Resultdto();
			result.setSaid(rs.getString("said"));
			result.setUno(rs.getString("uno"));
			result.setPno(rs.getString("pno"));
			result.setAllpoint(rs.getDouble("allpoint"));
			result.setIschecked(rs.getInt("ischecked"));
			result.setPtitle(rs.getString("ptitle"));
			list.add(result);			
		}
		ps.close();
		rs.close();
		
		return list;
	}
}
