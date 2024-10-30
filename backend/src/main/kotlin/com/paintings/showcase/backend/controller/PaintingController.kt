package com.paintings.showcase.backend.controller

import com.paintings.showcase.backend.dto.NewPaintingDTO
import com.paintings.showcase.backend.dto.PaintingUpdateDTO
import com.paintings.showcase.backend.model.Painting
import com.paintings.showcase.backend.repository.PaintingRepository
import com.paintings.showcase.backend.service.FileStorageService
import jakarta.validation.Valid
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@Validated
@RestController
@RequestMapping("/api/paintings")
class PaintingController @Autowired constructor(
    private val fileStorageService: FileStorageService,
    private val paintingRepository: PaintingRepository
) {

    @PostMapping("/upload")
    fun uploadFile(@Valid @ModelAttribute paintingDTO: NewPaintingDTO): ResponseEntity<String> {
        return try {
            val fileUrl = fileStorageService.uploadFile(paintingDTO.file)

            val newPainting = Painting(
                name = paintingDTO.name,
                year = paintingDTO.year,
                height = paintingDTO.height,
                width = paintingDTO.width,
                imageUrl = fileUrl
            )
            paintingRepository.save(newPainting)

            ResponseEntity.ok("The picture has been successfully downloaded from the URL: $fileUrl")
        } catch (ex: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("File upload error: ${ex.message}")
        }
    }

    @GetMapping
    fun getAllPaintings(): List<Painting> {
        return paintingRepository.findAll()
    }

    @GetMapping("/{id}")
    fun getPaintingById(@PathVariable id: Long): ResponseEntity<Painting> {
        val painting = paintingRepository.findById(id)
        return if (painting.isPresent) {
            ResponseEntity.ok(painting.get())
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PutMapping("/{id}")
    fun updatePainting(
        @PathVariable id: Long,
        @Valid @RequestBody updatedPainting: PaintingUpdateDTO
    ): ResponseEntity<Painting> {
        return paintingRepository.findById(id).map { existingPainting ->
            val updated = existingPainting.copy(
                name = updatedPainting.name ?: existingPainting.name,
                year = updatedPainting.year ?: existingPainting.year,
                height = updatedPainting.height ?: existingPainting.height,
                width = updatedPainting.width ?: existingPainting.width
            )
            ResponseEntity.ok(paintingRepository.save(updated))
        }.orElseGet {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{id}")
    fun deletePainting(@PathVariable id: Long): ResponseEntity<Void> {
        val painting = paintingRepository.findById(id)
        return if (painting.isPresent) {
            fileStorageService.deleteFile(painting.get().imageUrl)
            paintingRepository.deleteById(id)
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
}
