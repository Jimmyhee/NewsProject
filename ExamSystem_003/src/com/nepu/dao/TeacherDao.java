package  com.nepu.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.nepu.entity.StuResult;
import com.nepu.entity.Teacher;
import com.nepu.entity.TurnPage;

@Repository("teacherDao")
public class TeacherDao extends BaseDao{

	/**
	 * all teachers
	 * @return
	 * @throws Exception
	 */
	public List<Teacher> getAllTeachers() throws Exception{
		List<Teacher> teachers = null;
		String sql ="select * from teacher ";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ResultSet rs  = ps.executeQuery();
		teachers = new ArrayList<Teacher>();
		while(rs.next()){
			Teacher teacher = new Teacher();
			teacher.setUno(rs.getString("uno"));
			teacher.setTname(rs.getString("tname"));
			teacher.setTphone(rs.getString("tphone"));
			teachers.add(teacher);
		}
		rs.close();
		ps.close();
		return teachers;
	}

	/**
	 * add teacher
	 * @param uno
	 * @param tname
	 * @param tphone
	 * @throws Exception
	 */
	public void addTeacher(Teacher teacher) throws Exception {
		
		String sql="insert into teacher values (?,?,?)";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, teacher.getUno());
		ps.setString(2, teacher.getTname());
		ps.setString(3, teacher.getTphone());
		ps.execute();
		ps.close();
	}
	
	/**
	 * delete teacher
	 * @param uno
	 */
	public void deleteTeacher(String uno) throws Exception{
		String sql ="delete from teacher where uno=?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, uno);
		ps.executeUpdate();
		ps.close();
		
	}
	/**
	 * get teacher by uno
	 * @param uno
	 * @return
	 * @throws Exception 
	 */
	public Teacher getTeacherByUno(String uno) throws Exception {
		Teacher teacher = null;
		String sql = "select * from teacher where uno=?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, uno);
		ResultSet rs = ps.executeQuery();
		while(rs.next()){
			teacher = new Teacher();
			teacher.setUno(rs.getString("uno"));
			teacher.setTname(rs.getString("tname"));
			teacher.setTphone(rs.getString("tphone"));		
		}
		rs.close();
		ps.close();
		return teacher;
	}
	
	
	/**
	 * update teacher
	 * @param uno
	 * @param tname
	 * @param tphone
	 * @throws Exception
	 */
	public void updateTeacher(String uno, String tname, String tphone) throws Exception{
		String sql="update teacher set tname=?,tphone=? where uno=?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, tname);
		ps.setString(2, tphone);
		ps.setString(3, uno);
		ps.executeUpdate();
		ps.close();
		
	}
	
	
	/**
	 * get teacher information display by page
	 * @param uno
	 * @param tname
	 * @param tp
	 * @return
	 * @throws Exception
	 */
	public List<Teacher> QuerybyCon(String uno, String tname, TurnPage tp) throws Exception {
		List<Teacher> list = new ArrayList<Teacher>();
		String sql = "select * from teacher";
		if ((uno == null || uno.equals("")) && (tname != null && !tname.equals(""))) {
			sql = sql + " where tname like'%" + tname + "%'";

		}
		if ((tname == null || tname.equals("")) && (uno != null && !uno.equals(""))) {
			sql = sql + " where uno='" + uno + "'";

		}
		if (tname != null && !tname.equals("") && uno != null && !uno.equals("")) {
			sql = sql + " where tname like'%" + tname + "%' and uno='" + uno + "'";

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
		ResultSet rs = ps.executeQuery();
		while (rs.next()) {
			Teacher teacher = new Teacher();
			teacher.setUno(rs.getString("uno"));
			teacher.setTname(rs.getString("tname"));
			teacher.setTphone(rs.getString("tphone"));
			list.add(teacher);
		}
		ps.close();
		rs.close();
		return list;
	}

	public List<StuResult>  QueryAllStuResult(String pno, String said, TurnPage tp) throws Exception{
		List<StuResult> list = new ArrayList<StuResult>();
		String sql = "select * from tsturesult";
		if ((said == null || said.equals("")) && (pno != null && !pno.equals(""))) {
			sql = sql + " where pno like'%" + pno + "%'";

		}
		if ((pno == null || pno.equals("")) && (said != null && !said.equals(""))) {
			sql = sql + " where said='" + said + "'";

		}
		if (pno != null && !pno.equals("") && said != null && !said.equals("")) {
			sql = sql + " where pno like'%" + pno + "%' and said='" + said + "'";

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
		ResultSet rs = ps.executeQuery();
		while (rs.next()) {
			StuResult sturesult = new StuResult();
			sturesult.setSaid(rs.getString("said"));
			sturesult.setPno(rs.getString("pno"));
			sturesult.setUno(rs.getString("uno"));
			sturesult.setIschecked(rs.getInt("ischecked"));
			sturesult.setAllpoint(rs.getDouble("allpoint"));
			list.add(sturesult);
		}
		ps.close();
		rs.close();
		return list;
		
	}

	public void checkStuPaper(String said, String pno, String uno, double allpoint) throws Exception {
		
		String sql = "update tsturesult set allpoint = ? ,ischecked =1 where said= ?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setDouble(1, allpoint);
		ps.setString(2, said);
		ps.executeUpdate();
		ps.close();
		
	}
}
