package com.paintings.showcase.backend.service

import com.paintings.showcase.backend.dto.NewPaintingDTO
import com.paintings.showcase.backend.dto.PaintingUpdateDTO
import com.paintings.showcase.backend.dto.PaintingViewDTO
import com.paintings.showcase.backend.mapper.PaintingMapper
import com.paintings.showcase.backend.model.Language
import com.paintings.showcase.backend.model.Painting
import com.paintings.showcase.backend.model.PaintingTranslation
import com.paintings.showcase.backend.repository.PaintingRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class PaintingServiceImpl(
    private val paintingRepository: PaintingRepository,
    private val fileStorageService: FileStorageService,
    private val paintingMapper: PaintingMapper
) : PaintingService {

    override fun createPainting(dto: NewPaintingDTO): Painting {
        val fileUrl = fileStorageService.uploadFile(dto.file)
        val painting = paintingMapper.toEntity(dto, fileUrl)
        painting.slug = generateUniqueSlug(
            baseName = dto.nameEn.ifBlank { null } ?: dto.nameRu.ifBlank { null },
        )
        return paintingRepository.save(painting)
    }

    override fun getAllPaintings(language: Language): List<Painting> {
        return paintingRepository.findAllByLanguage(language)
    }

    override fun getById(id: Long): Painting? {
        return paintingRepository.findById(id).orElse(null)
    }

    @Transactional
    override fun updatePainting(id: Long, dto: PaintingUpdateDTO): Painting? {
        val painting = paintingRepository.findById(id).orElse(null) ?: return null

        dto.year?.let { painting.year = it }
        dto.height?.let { painting.height = it }
        dto.width?.let { painting.width = it }

        if (dto.nameEn.isMeaningful()) upsertTranslation(painting, Language.EN, dto.nameEn!!.trim())
        if (dto.nameRu.isMeaningful()) upsertTranslation(painting, Language.RU, dto.nameRu!!.trim())

        return painting
    }

    private fun String?.isMeaningful(): Boolean = this != null && this.isNotBlank()

    private fun upsertTranslation(painting: Painting, language: Language, newName: String) {
        val existing = painting.translations.firstOrNull { it.language == language }
        if (existing != null) {
            existing.name = newName
        } else {
            painting.translations.add(
                PaintingTranslation(
                    painting = painting,
                    language = language,
                    name = newName
                )
            )
        }
    }

    override fun deletePainting(id: Long): Boolean {
        val painting = paintingRepository.findById(id).orElse(null) ?: return false
        fileStorageService.deleteFile(painting.imageUrl)
        paintingRepository.deleteById(id)
        return true
    }

    override fun getAllView(language: Language): List<PaintingViewDTO> {
        val paintings = paintingRepository.findAllByLanguage(language)
        return paintings.map { paintingMapper.toViewDTO(it, language) }
    }

    override fun getViewById(id: Long, language: Language): PaintingViewDTO? {
        val painting = paintingRepository.findByIdAndLanguage(id, language).orElse(null) ?: return null
        return paintingMapper.toViewDTO(painting, language)
    }

    override fun getBySlug(slug: String): Painting? =
        paintingRepository.findBySlug(slug).orElse(null)

    override fun getViewBySlug(slug: String, language: Language): PaintingViewDTO? {
        val painting = getBySlug(slug) ?: return null
        return paintingMapper.toViewDTO(painting, language)
    }

    private fun asciiSlugBase(name: String?): String =
        (name ?: "p")
            .lowercase()
            .replace(Regex("[^a-z0-9]+"), "-")
            .trim('-')
            .ifBlank { "p" }

    private fun generateUniqueSlug(baseName: String?): String {
        var candidate = asciiSlugBase(baseName)
        while (paintingRepository.existsBySlug(candidate)) {
            val suffix = java.util.UUID.randomUUID().toString().substring(0, 4)
            candidate = "$candidate-$suffix"
        }
        return candidate
    }
}
