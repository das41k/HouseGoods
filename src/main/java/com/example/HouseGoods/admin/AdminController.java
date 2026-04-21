package com.example.HouseGoods.admin;

import com.example.HouseGoods.admin.dto.UpdateCategoryRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminService adminService;

    @PutMapping("/categories/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id,
                        @RequestBody UpdateCategoryRequest request) {
        log.debug("PUT /api/admin/categories/" + id);
        adminService.updateCategory(id, request);
        return ResponseEntity.ok("Категория была успешно обновлена!");
    }
}
