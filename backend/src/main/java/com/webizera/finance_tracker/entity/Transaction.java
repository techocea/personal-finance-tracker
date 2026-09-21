package com.webizera.finance_tracker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data //getters, setters, toString
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private String type; //INCOME , EXPENSE, SAVINGS

    private LocalDateTime date;

//    @ManyToOne
//    @JoinColumn(name = "category_id", nullable = false)
//    private Category category;

    @PrePersist
    protected void onCreate(){
        this.date = LocalDateTime.now();
    }
}
