package  com.nepu.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.springframework.stereotype.Repository;

import com.nepu.entity.Manager;

@Repository("managerDao")
public class ManagerDao extends BaseDao{

	/**
	 * get manager by uno
	 * @param uno
	 * @return
	 * @throws Exception
	 */
	public Manager getManager( String uno) throws Exception{
		String sql = "select * from tmanager where uno = ?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, uno);
		ResultSet rs =ps.executeQuery();
		Manager manager = null;
		while(rs.next()){
			manager = new Manager();
			manager.setMname(rs.getString("mname"));
			manager.setMphone(rs.getString("mphone"));
			manager.setUno(uno);
		}
		rs.close();
		ps.close();
		return manager;
	}

	/**
	 * update manager
	 * @param manager
	 * @throws Exception
	 */
	public void UpdateManager(Manager manager) throws Exception{
		String sql = "update tmanager set mname=?,mphone=? where uno=?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, manager.getMname());
		ps.setString(2, manager.getMphone());
		ps.setString(3, manager.getUno());
		ps.executeUpdate();
		ps.close();
	}
}
