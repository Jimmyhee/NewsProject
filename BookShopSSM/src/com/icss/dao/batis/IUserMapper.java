package com.icss.dao.batis;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.icss.dto.Buyinfo;
import com.icss.entity.TOrder;
import com.icss.entity.TOrderDetail;
import com.icss.entity.TUser;

public interface IUserMapper {
	
	
	
	public int getBuyinfoAllRows(@Param("uname")String uname,
		      @Param("beginDate")Date beginDate,@Param("endDate")Date endDate) throws Exception;
	//获取所有用户的购买记录
	public List<Buyinfo> getUserBuyinfo(@Param("uname")String uname,
		       @Param("beginDate")Date beginDate,@Param("endDate")Date endDate,@Param("iStart")int iStart,@Param("iRows")int iRows) throws Exception;
	//用户扣款和充值
	public int updateUserAccout(@Param("uname")String uname, @Param("money")double money) throws Exception;
	//添加订单
	public void addOrder(TOrder order) throws Exception;
	//添加订单明细
	public void addOrderDetail(TOrderDetail detail)throws Exception;
	//用户登录
	public TUser login(@Param("uname")String uname,@Param("pwd")String pwd) throws Exception ;
}
