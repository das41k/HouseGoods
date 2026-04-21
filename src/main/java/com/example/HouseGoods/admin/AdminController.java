package com.example.HouseGoods.admin;

import com.example.HouseGoods.admin.dto.UpdateCreateCategoryRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/categories")
    public ResponseEntity<?> createCategory(@RequestBody
                                   UpdateCreateCategoryRequest request){
        log.debug("POST /api/admin/categories");
        adminService.createCategory(request);
        return ResponseEntity.ok("Категория была успешно создана!");
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id,
                        @RequestBody UpdateCreateCategoryRequest request) {
        log.debug("PUT /api/admin/categories/" + id);
        adminService.updateCategory(id, request);
        return ResponseEntity.ok("Категория была успешно обновлена!");
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        log.debug("DELETE /api/admin/categories/" + id);
        adminService.deleteCategory(id);
        return ResponseEntity.ok("Категория была успешно удалена");
    }
}
