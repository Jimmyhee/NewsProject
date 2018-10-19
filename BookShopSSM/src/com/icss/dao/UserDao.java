package com.icss.dao;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.icss.dao.batis.IUserMapper;
import com.icss.dto.Buyinfo;
import com.icss.dto.TurnPage;
import com.icss.entity.TOrder;
import com.icss.entity.TOrderDetail;
import com.icss.entity.TUser;

@Repository("userDao")
public class UserDao  extends BaseDao{
	@Autowired
	private IUserMapper userMapper;
	
	/**
	 * 用户购买记录查询
	 * @param uname
	 * @param beginDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public List<Buyinfo> getUserBuyinfo(String uname,
			       Date beginDate,Date endDate,TurnPage tp) throws Exception {
		List<Buyinfo> blist=null;
			
		tp.allRows = userMapper.getBuyinfoAllRows(uname, beginDate, endDate);
		tp.allPages=(tp.allRows-1)/tp.rows+1;
		if(tp.page>tp.allPages){
			tp.page=tp.allPages;
		}
		int iStart = (tp.page-1)*tp.rows;
		int iRows =tp.rows;
		blist = userMapper.getUserBuyinfo(uname, beginDate, endDate, iStart, iRows);
		
		return blist;
	}
	
	/**
	 * 用户充值或扣款
	 * @param money  money>0表示充值  ， money<0表示扣款
	 */
	public int updateUserAccout(String uname, double money) throws Exception{
		
		return userMapper.updateUserAccout(uname, money);
	}
	
	/**
	 * 添加订单
	 * @param order
	 * @throws Exception
	 */
	public void addOrder(TOrder order) throws Exception{
		
		userMapper.addOrder(order);
	}
	
	/**
	 * 添加订单明细
	 * @param detail
	 * @throws Exception
	 */
	public void addOrderDetail(TOrderDetail detail)throws Exception{	
		
		userMapper.addOrderDetail(detail);
	}
	
	 /**
	  * 用户登陆
	  * @param uname
	  * @param pwd
	  * @return
	  * @throws Exception
	  */
	 public TUser login(String uname,String pwd) throws Exception {
		return userMapper.login(uname, pwd);
	 }
	
	/**
	 * 读取所有用户
	 * @return
	 * @throws Exception
	 *//*
	public List<TUser> getAllUser() throws Exception {
		List<TUser> allUser;
		
		String sql = "select * from tuser";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery();
		allUser = new ArrayList<>();
		while(rs.next()) {
			TUser user = new TUser();
			user.setUname(rs.getString("uname"));
			user.setPwd(rs.getString("pwd"));	
			user.setRole(rs.getInt("role"));			
			allUser.add(user);
		}
		rs.close();
		ps.close();
		
		return allUser;
		
	}
	
	
	*//**
	 * 删除用户
	 * @param uname
	 * @return
	 * @throws Exception
	 *//*
    public int deleteUser(String uname) throws Exception {
    	int iRet;
    	
    	String sql = "delete from tuser where uname=?";
    	Connection conn = this.openConnection();
    	PreparedStatement ps = conn.prepareStatement(sql);
    	ps.setString(1, uname);
    	iRet =  ps.executeUpdate();
		ps.close();
		
		return iRet;
		
	}
	
	*//**
	 * 
	 * @param uname
	 * @param pwd
	 * @return  int表示更新的记录数量
	 * @throws Exception
	 *//*
	public int updateUserPwd(String uname,String pwd) throws Exception{
		int iRet;
		
		String sql = "update tuser set pwd=? where uname=?";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, pwd);
		ps.setString(2, uname);
		iRet = ps.executeUpdate();
		ps.close();		
		
		return iRet;
	}
 
	
	*//**
	 * 用户注册
	 * @param user
	 * @throws Exception
	 *//*
	public void regist(TUser user) throws SQLIntegrityConstraintViolationException,Exception {		
		String sql = "insert into tuser values(?,?,?,?,?)";
		Connection conn = this.openConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, user.getUname());
		ps.setString(2, user.getPwd());
		ps.setInt(3, user.getRole());	
		ps.executeUpdate();
		ps.close();
	}
	
	 *//**
	  * 用户登陆
	  * @param uname
	  * @param pwd
	  * @return
	  * @throws Exception
	  *//*
	 public TUser login(String uname,String pwd) throws Exception {
		 TUser user = null;
		 
		 String sql = "select * from tuser where uname='" + uname + "' and pwd='" + pwd + "'";
		 Connection conn = this.openConnection();
		 Statement st = conn.createStatement();
		 ResultSet rs = st.executeQuery(sql);
		 while(rs.next()) {
		     //如果进入这个循环，说明已经登陆成功
			 int role = rs.getInt("role");
			 user = new TUser();
			 user.setUname(uname);
			 user.setPwd(pwd);
			 user.setRole(role);
			 user.setAccount(rs.getDouble("account"));
			 user.setAddress(rs.getString("address"));
		 }	
		 rs.close();
		 
		 return user;
		 
		 
	 }*/
	
	
	 

}
