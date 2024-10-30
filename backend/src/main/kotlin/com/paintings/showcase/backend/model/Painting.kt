package com.paintings.showcase.backend.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id


@Entity
data class Painting(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String,
    val year: Int? = null,
    val height: Int? = null,
    val width: Int? = null,
    val imageUrl: String
)
