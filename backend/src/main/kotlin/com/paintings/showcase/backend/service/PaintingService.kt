package com.paintings.showcase.backend.service

import com.paintings.showcase.backend.dto.NewPaintingDTO
import com.paintings.showcase.backend.dto.PaintingUpdateDTO
import com.paintings.showcase.backend.dto.PaintingViewDTO
import com.paintings.showcase.backend.model.Language
import com.paintings.showcase.backend.model.Painting

interface PaintingService {
    fun createPainting(dto: NewPaintingDTO): Painting
    fun getAllPaintings(language: Language): List<Painting>
    fun getById(id: Long): Painting?
    fun updatePainting(id: Long, dto: PaintingUpdateDTO): Painting?
    fun deletePainting(id: Long): Boolean
    fun getAllView(language: Language): List<PaintingViewDTO>
    fun getViewById(id: Long, language: Language): PaintingViewDTO?
    fun getBySlug(slug: String): Painting?
    fun getViewBySlug(slug: String, language: Language): PaintingViewDTO?
}
