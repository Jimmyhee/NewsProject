package  com.nepu.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class BaseDao extends JdbcDaoSupport{

	
	@Autowired
	public void setMyDataSource(org.springframework.jdbc.datasource.DriverManagerDataSource dataSource){
		super.setDataSource(dataSource);
	}

	public Connection openConnection() throws ClassNotFoundException, SQLException, Exception {

		return this.getConnection();
	}

	

	
	/**
	 * get turnpage sql
	 * @param sql
	 * @param iStart
	 * @param rowcount
	 * @return
	 */
	public String getTurnPageSql(String sql, int iStart, int rows) {

		String newSql = sql + " limit " + iStart + "," + rows;

		return newSql;
	}
	/**
	 * get all rows
	 * @param sql
	 * @return
	 * @throws Exception
	 */
	public int getSqlAllRows(String sql) throws Exception{
		int rows=0;
		String newSql="select count(*) from ("+sql+") dto";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(newSql);
		ResultSet rs = ps.executeQuery();
		while(rs.next()){
			rows = rs.getInt(1);
		}
		rs.close();
		ps.close();
		return rows;
	}

}
