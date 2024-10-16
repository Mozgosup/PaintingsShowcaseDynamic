package com.paintings.showcase.backend.dto

import org.springframework.web.multipart.MultipartFile

data class PaintingDTO(
    val name: String,
    val description: String,
    val file: MultipartFile
)