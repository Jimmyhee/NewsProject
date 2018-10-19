package com.icss.dao.batis;

import java.util.List;
import java.util.Set;

import org.apache.ibatis.annotations.Param;

import com.icss.entity.TBook;
import com.icss.entity.TBookType;

public interface IBookMapper {
	//��ȡ����ͼ������
	public List<TBookType> getBookType() throws Exception;
	//���ͼ��
	public void addBook(TBook book) throws Exception;
	//����ͼ����
	public int updateBookCount(@Param("isbn")String isbn,@Param("bcount")int bcount)throws Exception;
	//��ȡ���еĹ��ﳵ��Ϣ
	public List<TBook> getCarBooks(@Param("isbns")Set<String> isbns) throws Exception;
	//��ȡͼ����ϸ��Ϣ
	public TBook getBookInfo(@Param("isbn")String isbn) throws Exception;
	//��ȡͼƬ��Ϣ
	public TBook getPic(@Param("isbn")String isbn) throws Exception;
	//��ȡ����ͼ��
	public List<TBook> getAllBooks() throws Exception;
}
