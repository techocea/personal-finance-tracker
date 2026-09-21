package com.webizera.finance_tracker.service;

import com.webizera.finance_tracker.dto.TransactionRequestDto;
import com.webizera.finance_tracker.entity.Category;
import com.webizera.finance_tracker.entity.Transaction;
import com.webizera.finance_tracker.entity.User;
import com.webizera.finance_tracker.exception.TransactionNotFoundException;
import com.webizera.finance_tracker.repository.CategoryRepository;
import com.webizera.finance_tracker.repository.TransactionRepository;
import com.webizera.finance_tracker.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class TransactionService {
    @Autowired
    private final TransactionRepository transactionRepository;

    @Autowired
    private  UserRepository userRepository;

    @Autowired
    private  CategoryRepository categoryRepository;

    public TransactionService (TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getAllTransactions(){
        return transactionRepository.findAll();
    }

    public Transaction createTransaction(TransactionRequestDto request){
//        User user = userRepository.findById(request.getUserId())
//                .orElseThrow(()->new RuntimeException("User not found"));
//        Category category = categoryRepository.findById(request.getCategoryId())
//                .orElseThrow(()->new RuntimeException("Category not found"));

        Transaction transaction = new Transaction();
        transaction.setDescription(request.getDescription());
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
//        transaction.setUser(user);
//        transaction.setCategory(category);

       return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id){
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(()-> new TransactionNotFoundException(id));
        transactionRepository.delete(transaction);
    }
}
