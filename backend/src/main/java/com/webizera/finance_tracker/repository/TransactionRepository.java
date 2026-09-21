package com.webizera.finance_tracker.repository;

import com.webizera.finance_tracker.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
