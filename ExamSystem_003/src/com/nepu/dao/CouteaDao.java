package com.nepu.dao;



import java.sql.Connection;
import java.sql.PreparedStatement;

import org.springframework.stereotype.Repository;

@Repository("couteaDao")
public class CouteaDao extends BaseDao{
	
	public void addArrange(String ctid,String cno,String uno) throws Exception{
		String sql="insert into tcoutea values(?,?,?)";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1,ctid);
		ps.setString(2,cno);
		ps.setString(3,uno);
		ps.executeUpdate();
		ps.close();
	}
	public void deleteCouage(String ctid, String cno, String uno) throws Exception{
		String sql = "delete from tcoutea";
		if ((cno == null || cno.equals("")) && (uno== null ||uno.equals(""))&&(ctid != null && !ctid.equals(""))) {
			sql = sql + " where ctid ='" + ctid + "'";

		} if ((cno == null || cno.equals("")) && (ctid == null ||ctid.equals(""))&&(uno != null && !uno.equals(""))) {
			sql = sql + " where uno='" + uno + "'";

		}if ((uno == null || uno.equals("")) && (ctid == null ||ctid.equals(""))&&(cno != null && !cno.equals(""))) {
			sql = sql + " where cno='" + cno + "'";
		}
		
		Connection conn = this.openConnection();
		PreparedStatement pst = conn.prepareStatement(sql);
		pst.executeUpdate();
		pst.close();
	}

}
