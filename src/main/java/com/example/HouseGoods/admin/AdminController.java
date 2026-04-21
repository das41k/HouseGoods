package com.example.HouseGoods.admin;

import com.example.HouseGoods.admin.dto.UpdateCreateBrandRequest;
import com.example.HouseGoods.admin.dto.UpdateCreateCategoryRequest;
import com.example.HouseGoods.admin.dto.UpdateCreateProductRequest;
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

    @PostMapping("/brands")
    public ResponseEntity<?> createBrand(@RequestBody UpdateCreateBrandRequest request){
        log.debug("POST /api/admin/brands");
        adminService.createBrand(request);
        return ResponseEntity.ok("Бренд был успешно создан");
    }

    @PutMapping("/brands/{id}")
    public ResponseEntity<?> updateBrand(@PathVariable Long id,
             @RequestBody UpdateCreateBrandRequest request) {
        log.debug("PUT /api/admin/brands/" + id);
        adminService.updateBrand(id, request);
        return ResponseEntity.ok("Бренд успешно изменен");
    }

    @DeleteMapping("/brands/{id}")
    public ResponseEntity<?> deleteBrand(@PathVariable Long id) {
        log.debug("DELETE /api/admin/brands/" + id);
        adminService.deleteBrand(id);
        return ResponseEntity.ok("Бренд был успешно удален");
    }
    @PostMapping("/products")
    public ResponseEntity<?> createProduct(@RequestBody UpdateCreateProductRequest request){
        log.debug("POST /api/admin/products");
        adminService.createProduct(request);
        return ResponseEntity.ok("Товар был успешно создан");
    }

    @PutMapping("/products/{sku}")
    public ResponseEntity<?> updateProduct(@PathVariable String sku,
               @RequestBody UpdateCreateProductRequest request ) {
        log.debug("PUT /api/admin/product/" + sku);
        adminService.updateProduct(sku, request);
        return ResponseEntity.ok("Товар был успешно обновлен");
    }

    @DeleteMapping("/products/{sku}")
    public ResponseEntity<?> deleteProduct(@PathVariable String sku) {
        log.debug("DELETE /api/admin/product/" + sku);
        adminService.deleteProduct(sku);
        return ResponseEntity.ok("Товар был успешно удален");
    }
}
