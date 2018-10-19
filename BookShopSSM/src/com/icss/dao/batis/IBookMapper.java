package com.icss.dao.batis;

import java.util.List;
import java.util.Set;

import org.apache.ibatis.annotations.Param;

import com.icss.entity.TBook;
import com.icss.entity.TBookType;

public interface IBookMapper {
	//获取所有图书类型
	public List<TBookType> getBookType() throws Exception;
	//添加图书
	public void addBook(TBook book) throws Exception;
	//更改图书库存
	public int updateBookCount(@Param("isbn")String isbn,@Param("bcount")int bcount)throws Exception;
	//获取所有的购物车信息
	public List<TBook> getCarBooks(@Param("isbns")Set<String> isbns) throws Exception;
	//获取图书详细信息
	public TBook getBookInfo(@Param("isbn")String isbn) throws Exception;
	//获取图片信息
	public TBook getPic(@Param("isbn")String isbn) throws Exception;
	//获取所有图书
	public List<TBook> getAllBooks() throws Exception;
}
