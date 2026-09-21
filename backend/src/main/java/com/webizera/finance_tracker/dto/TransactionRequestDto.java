package com.webizera.finance_tracker.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TransactionRequestDto {
    private String description;
    private BigDecimal amount;
    private String type;
    private LocalDate date;
    private Long userId;
    private Long categoryId;
}
