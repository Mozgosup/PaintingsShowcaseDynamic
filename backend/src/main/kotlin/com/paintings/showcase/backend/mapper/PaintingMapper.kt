package com.paintings.showcase.backend.mapper

import com.paintings.showcase.backend.dto.NewPaintingDTO
import com.paintings.showcase.backend.dto.PaintingViewDTO
import com.paintings.showcase.backend.model.Language
import com.paintings.showcase.backend.model.Painting
import com.paintings.showcase.backend.model.PaintingTranslation
import org.springframework.stereotype.Component

@Component
class PaintingMapper {

    fun toEntity(dto: NewPaintingDTO, imageUrl: String): Painting {
        val painting = Painting(
            year = dto.year,
            height = dto.height,
            width = dto.width,
            imageUrl = imageUrl
        )

        val translations = listOf(
            PaintingTranslation(
                painting = painting,
                language = Language.EN,
                name = dto.nameEn
            ),
            PaintingTranslation(
                painting = painting,
                language = Language.RU,
                name = dto.nameRu
            )
        )

        painting.translations.addAll(translations)

        return painting
    }

    fun toViewDTO(painting: Painting, language: Language): PaintingViewDTO {
        val name = resolveNameWithFallback(painting, language)
        return PaintingViewDTO(
            id = painting.id,
            name = name,
            year = painting.year,
            height = painting.height,
            width = painting.width,
            imageUrl = painting.imageUrl
        )
    }

    private fun resolveNameWithFallback(painting: Painting, language: Language): String {
        return painting.translations.firstOrNull { it.language == language }?.name
            ?: painting.translations.firstOrNull { it.language == Language.EN }?.name
            ?: painting.translations.firstOrNull()?.name
            ?: "Untitled"
    }
}
