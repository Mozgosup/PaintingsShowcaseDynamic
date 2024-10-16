package com.paintings.showcase.backend.controller

import com.paintings.showcase.backend.dto.PaintingDTO
import com.paintings.showcase.backend.model.Painting
import com.paintings.showcase.backend.repository.PaintingRepository
import com.paintings.showcase.backend.service.FileStorageService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/files")
class FileController @Autowired constructor(
    private val fileStorageService: FileStorageService,
    private val paintingRepository: PaintingRepository
) {

    @PostMapping("/upload")
    fun uploadFile(@ModelAttribute paintingDTO: PaintingDTO): ResponseEntity<String> {
        return try {

            val fileUrl = fileStorageService.uploadFile(paintingDTO.file)

            val newPainting = Painting(
                name = paintingDTO.name,
                description = paintingDTO.description,
                imageUrl = fileUrl
            )
            paintingRepository.save(newPainting)

            ResponseEntity.ok("Картина успешно загружена с URL: $fileUrl")
        } catch (ex: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Ошибка загрузки файла: ${ex.message}")
        }
    }
}
