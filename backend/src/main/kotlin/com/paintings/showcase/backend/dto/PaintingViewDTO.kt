package com.paintings.showcase.backend.dto

data class PaintingViewDTO(
    val id: Long,
    val name: String,
    val year: Int?,
    val height: Int?,
    val width: Int?,
    val imageUrl: String
)
