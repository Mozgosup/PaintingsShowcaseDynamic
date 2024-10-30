package com.paintings.showcase.backend.dto

import jakarta.validation.constraints.Max
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.Size

data class PaintingUpdateDTO(

    @field:Size(max = 100, message = "Name cannot exceed 255 characters")
    val name: String?,

    @field:Min(1900, message = "A year too far in the past")
    @field:Max(2100, message = "Year cannot be in the future")
    val year: Int?,

    @field:Min(1, message = "Height must be at least 1 cm")
    @field:Max(500, message = "Height cannot exceed 500 cm")
    val height: Int?,

    @field:Min(1)
    val width: Int?
)
