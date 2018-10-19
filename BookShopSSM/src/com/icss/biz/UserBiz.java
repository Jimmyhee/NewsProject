package com.icss.biz;

import java.sql.SQLIntegrityConstraintViolationException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.icss.dao.BookDao;
import com.icss.dao.UserDao;
import com.icss.dto.Buyinfo;
import com.icss.dto.TurnPage;
import com.icss.entity.TBook;
import com.icss.entity.TOrder;
import com.icss.entity.TOrderDetail;
import com.icss.entity.TUser;
import com.icss.exception.InputNullException;
import com.icss.exception.MoneyNotEnoughException;
import com.icss.exception.OverLengthException;
import com.icss.util.Log;

@Service("userBiz")
@Transactional(readOnly=true)
public class UserBiz {
	@Autowired
	private UserDao userDao;
	@Autowired
	private BookDao bookDao;
	
	/**
	 * �û������¼��ѯ
	 * @param uname
	 * @param beginDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public List<Buyinfo> getUserBuyinfo(String uname,
			              Date beginDate,Date endDate,TurnPage tp) throws Exception {
	
		return userDao.getUserBuyinfo(uname, beginDate, endDate,tp);	
		
	}
	
	/**
	 * �û����鸶��
	 * @param user      �û���Ϣ
	 * @param books   ���ﳵ����
	 * @throws Exception
	 */
	@Transactional(readOnly=false,rollbackFor=Throwable.class)
	public void payMoney(TUser user,List<TBook> books,double allMoney)throws Exception{
		if(user.getAccount() < allMoney){
			throw new MoneyNotEnoughException("�˻����㣬�뼰ʱ��ֵ");
		}		
		userDao.updateUserAccout(user.getUname(), -allMoney);       //�û��ۿ�
		TOrder order = getOrder(user.getUname(),allMoney);
		userDao.addOrder(order);                                    //��Ӷ���
		for(TBook bk : books){
			TOrderDetail detail = new TOrderDetail();
			detail.setBcount(bk.getMcount());
			detail.setBprice(bk.getPrice());
			detail.setDno(order.getDno());
			detail.setIsbn(bk.getIsbn());
			userDao.addOrderDetail(detail);                         //��Ӷ�����ϸ
			bookDao.updateBookCount(bk.getIsbn(),-bk.getMcount());    //����ͼ����
		}	
	}
	
	/**
	 * ��ȡ�û�������Ϣ
	 * @param uname
	 * @param allMoney
	 * @return
	 */
	private TOrder getOrder(String uname,double allMoney){
		TOrder order = new TOrder();
		SimpleDateFormat sd = new SimpleDateFormat("yyyyMMdd");
		order.setDno("d" + sd.format(new Date()) + "-"+ new Date().getTime());
		order.setAllprice(allMoney);
		order.setBtime(new Date());
		order.setUname(uname);		
		
		return order;
	}
	
	/**
	 * ��ȡ�����û�
	 * @return
	 * @throws Exception
	 *//*
	public List<TUser> getAllUser() throws Exception {		
		return userDao.getAllUser();		
	}
	
	
	public boolean deleteUser(String uname) throws Exception {
		boolean bRet = false;
		
		if(uname == null || uname.equals("")) {
			throw new InputNullException("����û���Ϊ��");
		}	
		int iRet = userDao.deleteUser(uname);
		if(iRet>0) {
			bRet = true;
		}		
		
		return bRet;		
	}
	
	*//**
	 * �û�ע��
	 * @param user
	 * @throws Exception
	 *//*
	public void regist(TUser user) throws SQLIntegrityConstraintViolationException,Exception {
		if(user == null) {
			throw new InputNullException("userΪnull");
		}else {
			if(user.getUname()==null) {
				throw new InputNullException("�û���Ϊnull");
			}
			if(user.getUname().length() > 30) {
				throw new OverLengthException("�û����������������30���ַ�");
			}			
			userDao.regist(user);									
		}		
	}
	
	
	
	
	*/
	
	
	 /**
	  * �û���½
	  * @param uname
	  * @param pwd
	  * @return
	  * @throws Exception
	  */
	 public TUser login(String uname,String pwd) throws OverLengthException,InputNullException,Exception {
		 TUser user = null;		 
		 
		 Log.logger.info("login : uname=" + uname  + "---pwd=" + pwd);		
		 if(uname != null && pwd!= null && !uname.equals("") && !pwd.equals("")) {
			if(uname.length() > 30) {
				throw new OverLengthException("�û������ܳ���30�ַ�������������");
			}
			if(pwd.length() > 20 ) {
				throw new OverLengthException("���벻�ܳ���20�ַ�������������");
			}			
			user = userDao.login(uname, pwd);				 
			
		 }else {
			 throw new InputNullException("�û���������Ϊ�գ�����������");
		 }		 
		 
		 return user;
	 }
	 
	 
/*
		public int updatePassword(String uname,String oldPwd,String newPwd) throws Exception{
			int iRet = 0 ;
			
			if(uname== null || oldPwd == null || newPwd==null
					|| uname.equals("") || oldPwd.equals("") || newPwd.equals("")) {
				throw new InputNullException("��Σ��û���������Ϊ��");
			}		
			boolean bRet = validatePassword(userDao,uname,oldPwd);
			if(bRet) {
				iRet = updateUserPwd(userDao,uname,newPwd);
			}				
		
			return iRet;			
		}*/
		
	/*	*//**
		 * 
		 * @param uname
		 * @param pwd
		 * @return  int��ʾ���µļ�¼����
		 * @throws Exception
		 *//*
		private int updateUserPwd(UserDao dao,String uname,String pwd) throws Exception{		
		    return dao.updateUserPwd(uname, pwd);			
		}
	 */
		/**
		 * У�������Ƿ�
		 * @param uname
		 * @param oldPwd
		 * @return
		 * @throws Exception
		 */
	 private boolean validatePassword(UserDao dao, String uname,String pwd) throws Exception{		
			boolean bRet;					
		
			TUser user = dao.login(uname, pwd);
			if(user == null) {
				bRet = false;
			}else {
				bRet = true;
			}			
			
			return bRet;		 		 
	 }

}
