package com.icss.dao;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.icss.dao.batis.IBookMapper;
import com.icss.entity.TBook;
import com.icss.entity.TBookType;

@Repository("bookDao")
public class BookDao extends BaseDao{
	@Autowired
	private IBookMapper bookMapper;
	/**
	 * ��ȡͼ��������Ϣ
	 * @return
	 * @throws Exception
	 */
	public List<TBookType> getBookType() throws Exception{
		return bookMapper.getBookType();		
	}
	
	
	
	/**
	 * ͼ���ϴ�
	 * @param book
	 * @throws Exception
	 */
	public void addBook(TBook book) throws Exception{
		bookMapper.addBook(book);
	}
	
	
	/**
	 * ���ӿ�� ����ٿ�� 
	 * @param isbn
	 * @param bcount     bcount>0Ϊ�ӿ��,bcount<0Ϊ�����
	 * @return
	 * @throws Exception
	 */
	public int updateBookCount(String isbn,int bcount)throws Exception{
		return bookMapper.updateBookCount(isbn, bcount);
	}
	
	/**
	 * ��ȡ���ﳵ�е�ͼ����Ϣ ������ͼƬ��
	 * @return
	 * @throws Exception
	 */
	public List<TBook> getCarBooks(Set<String> isbns) throws Exception{
		return bookMapper.getCarBooks(isbns);
	}
	
	/**
	 * ��ȡͼ������ (����������ͼƬ)
	 * @param isbn
	 * @return
	 * @throws Exception
	 */
	public TBook getBookInfo(String isbn) throws Exception{
		return bookMapper.getBookInfo(isbn);
	}
	
	/**
	 * ����ͼ���isbn����ȡ����
	 * @param isbn
	 * @return
	 * @throws Exception
	 */
	public byte[] getPic(String isbn) throws Exception{
		TBook book =  bookMapper.getPic(isbn);
		return book.getPic();
	}
	
	
	/**
	 * ��ȡ����ͼ����Ϣ(������ͼƬ��Ϣ)
	 * @return
	 * @throws Exception
	 */
	public List<TBook> getAllBooks() throws Exception{
		return bookMapper.getAllBooks();
	}
}
