package com.webizera.finance_tracker.repository;

import com.webizera.finance_tracker.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
