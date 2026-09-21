package com.webizera.finance_tracker.controller;

import com.webizera.finance_tracker.dto.TransactionRequestDto;
import com.webizera.finance_tracker.entity.Transaction;
import com.webizera.finance_tracker.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    public TransactionController(TransactionService transactionService){
        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions(){
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody TransactionRequestDto request){
        return ResponseEntity.ok(transactionService.createTransaction(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id){
        transactionService.deleteTransaction(id);
        return ResponseEntity.ok().build();
    }
}
