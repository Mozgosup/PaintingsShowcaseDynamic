package com.paintings.showcase.backend.controller

import com.paintings.showcase.backend.dto.NewPaintingDTO
import com.paintings.showcase.backend.dto.PaintingUpdateDTO
import com.paintings.showcase.backend.dto.PaintingViewDTO
import com.paintings.showcase.backend.model.Language
import com.paintings.showcase.backend.model.Painting
import com.paintings.showcase.backend.service.PaintingService
import jakarta.validation.Valid
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@Validated
@RestController
@RequestMapping("/api/paintings")
class PaintingController @Autowired constructor(
    private val paintingService: PaintingService
) {

    @PostMapping("/upload")
    fun uploadFile(@Valid @ModelAttribute paintingDTO: NewPaintingDTO): ResponseEntity<String> {
        return try {
            paintingService.createPainting(paintingDTO)
            ResponseEntity.ok("The picture has been successfully uploaded.")
        } catch (ex: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("File upload error: ${ex.message}")
        }
    }

    @GetMapping
    fun getAllPaintings(
        @RequestParam(required = false) language: Language?,
        @RequestHeader(name = HttpHeaders.ACCEPT_LANGUAGE, required = false) acceptLang: String?
    ): List<PaintingViewDTO> {
        val lang = resolveLanguageParam(language, acceptLang)
        return paintingService.getAllView(lang)
    }

    private fun resolveLanguageParam(
        explicit: Language?,
        acceptLanguage: String?
    ): Language {
        if (explicit != null) return explicit

        val headerLang = acceptLanguage?.take(2)?.lowercase()
        return when (headerLang) {
            "ru" -> Language.RU
            else -> Language.EN
        }
    }

    @GetMapping("/{id}")
    fun getPaintingById(
        @PathVariable id: Long,
        @RequestParam(defaultValue = "EN") language: Language
    ): ResponseEntity<PaintingViewDTO> {
        val painting = paintingService.getViewById(id, language)
        return painting?.let { ResponseEntity.ok(it) } ?: ResponseEntity.notFound().build()
    }

    @GetMapping("/slug/{slug}")
    fun getPaintingBySlug(
        @PathVariable slug: String,
        @RequestParam(defaultValue = "EN") language: Language
    ): ResponseEntity<PaintingViewDTO> {
        val serviceImpl = paintingService
        val view = serviceImpl.getViewBySlug(slug, language)
        return view?.let { ResponseEntity.ok(it) } ?: ResponseEntity.notFound().build()
    }

    @PutMapping("/{id}")
    fun updatePainting(
        @PathVariable id: Long,
        @Valid @RequestBody dto: PaintingUpdateDTO
    ): ResponseEntity<Painting> {
        val updated = paintingService.updatePainting(id, dto)
        return updated?.let { ResponseEntity.ok(it) } ?: ResponseEntity.notFound().build()
    }

    @DeleteMapping("/{id}")
    fun deletePainting(@PathVariable id: Long): ResponseEntity<Void> {
        return if (paintingService.deletePainting(id)) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
}