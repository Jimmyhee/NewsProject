package com.nepu.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.nepu.entity.Choice;
import com.nepu.entity.Question;
import com.nepu.entity.TurnPage;

@Repository("questionDao")
public class QuestionDao extends BaseDao{
	public void addQuestion(String qno,int qtype) throws Exception{
		String sql="insert into tques(qno,qtype) values(?,?)";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1,qno);
		ps.setInt(2,qtype);
		ps.executeUpdate();
		ps.close();
	}
	
	
	public void completeQuestion(String qname,String qanswer,String qexplain,String qno) throws Exception{
		String sql="update tques set qname=?,qanswer=?,qexplain=? where qno=?";
		Connection conn = this.openConnection();
		PreparedStatement ps =conn.prepareStatement(sql);
		ps.setString(1,qname);
		ps.setString(2,qanswer);
		ps.setString(3,qexplain);
		ps.setString(4,qno);		
		ps.executeUpdate();
		ps.close();
	}
	
	
	public void addQuesknow(String kqid,String qno,String kno) throws Exception{
		String sql="insert into tquesknow values(?,?,?)";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1,kqid);
		ps.setString(2,kno);
		ps.setString(3,qno);
		ps.executeUpdate();
		ps.close();
	}
	
	
	public List<Question> QuerybyCon(String qname,String qtype,TurnPage tp) throws Exception{
		List<Question> list = null;
		String sql = "select * from tques";
		if(qname!=null && !qname.equals("") && (qtype==null||qtype.equals(""))){
			sql=sql+" where qname like '%"+qname+"%'";
		}
		if(qtype!=null && !qtype.equals("") && (qname==null||qname.equals(""))){
			sql=sql+" where qtype='"+Integer.parseInt(qtype)+"'";
		}
		if(qname!=null && !qname.equals("") && qtype!=null && !qtype.equals("")){
			sql=sql+" where qtype='"+Integer.parseInt(qtype)+"' and qname like '%"+qname+"%'";
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
		list = new ArrayList<Question>();
		ResultSet rs = ps.executeQuery();
		while (rs.next()) {
			Question question = new Question();
			question.setQno(rs.getString("qno"));
			question.setQname(rs.getString("qname"));
			question.setQanswer(rs.getString("qanswer"));
			question.setQexplain(rs.getString("qexplain"));
			question.setQtype(rs.getInt("qtype"));
			list.add(question);
		}
		ps.close();
		rs.close();
		return list;
	}
	
	
	public void delQuestion(String qno)throws Exception{
		String sql ="delete from tques where qno=?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, qno);
		ps.executeUpdate();
		ps.close();
	}
	
	public void delQuesKnow(String qno)throws Exception{
		String sql ="delete from tquesknow where qno=?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, qno);
		ps.executeUpdate();
		ps.close();
	}
	
	public void delChoice(String qno)throws Exception{
		String sql ="delete from tchoice where qno=?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, qno);
		ps.executeUpdate();
		ps.close();
	}
	
	public Question queryQuesByqno(String qno)throws Exception{
		Question question = null;
		String sql ="select * from tques where qno=?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, qno);
		ResultSet rs = ps.executeQuery();
		while(rs.next()){
			question=new Question();
			question.setQno(rs.getString("qno"));
			question.setQname(rs.getString("qname"));
			question.setQanswer(rs.getString("qanswer"));
			question.setQexplain(rs.getString("qexplain"));
			question.setQtype(rs.getInt("qtype"));
		}
		return question;
	}
	
	
	public List<Choice> queryChoiceByqno(String qno)throws Exception{
		List<Choice> list = null;
		Choice choice = null;
		String sql ="select * from tchoice where qno=?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, qno);
		ResultSet rs = ps.executeQuery();
		list = new ArrayList<Choice>();
		while(rs.next()){
			choice = new Choice();
			choice.setOid(rs.getString("oid"));
			choice.setQno(rs.getString("qno"));
			choice.setOno(rs.getString("ono"));
			choice.setOname(rs.getString("oname"));
			list.add(choice);			
		}
		return list;
	}
	
	
	public void updateQues(Question question)throws Exception{
		String sql="update tques set qname=?,qanswer=?,qexplain=? where qno=?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, question.getQname());
		ps.setString(2, question.getQanswer());
		ps.setString(3, question.getQexplain());
		ps.setString(4, question.getQno());
		ps.executeUpdate();
		ps.close();
	}
	
	
	public List<Question> QuerybyKon(String qno, String qname, TurnPage tp) throws Exception{
		List<Question> list = new ArrayList<Question>();
		String sql = "select * from tques";
		if ((qno == null || qno.equals("")) && (qname != null && !qname.equals(""))) {
			sql = sql + " where qname like'%" + qname + "%'";

		}
		if ((qname == null || qname.equals("")) && (qno != null && !qno.equals(""))) {
			sql = sql + " where qno='" + qno + "'";

		}
		if (qname != null && !qname.equals("") && qno != null && !qno.equals("")) {
			sql = sql + " where qname like'%" + qname + "%' and pno='" + qno + "'";
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
			Question question = new Question();
			question.setQno(rs.getString("qno"));
			question.setQname(rs.getString("qname"));
			question.setQanswer(rs.getString("qanswer"));
			question.setQexplain(rs.getString("qexplain"));
			question.setQtype(rs.getInt("qtype"));
			list.add(question);
		}
		ps.close();
		rs.close();
		return list;
		
	}


}
