package com.paintings.showcase.backend.repository

import com.paintings.showcase.backend.model.Painting
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PaintingRepository : JpaRepository<Painting, Long>
