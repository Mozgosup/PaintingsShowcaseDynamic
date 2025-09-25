package com.paintings.showcase.backend.repository

import com.paintings.showcase.backend.model.Language
import com.paintings.showcase.backend.model.Painting
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface PaintingRepository : JpaRepository<Painting, Long> {

    @Query(
        """
        SELECT p FROM Painting p
        JOIN FETCH p.translations t
        WHERE t.language = :language
    """
    )
    fun findAllByLanguage(@Param("language") language: Language): List<Painting>

    @Query(
        """
        SELECT p FROM Painting p
        JOIN FETCH p.translations t
        WHERE p.id = :id AND t.language = :language
"""
    )
    fun findByIdAndLanguage(
        @Param("id") id: Long,
        @Param("language") language: Language
    ): Optional<Painting>

    fun findBySlug(slug: String): Optional<Painting>
    fun existsBySlug(slug: String): Boolean
}
