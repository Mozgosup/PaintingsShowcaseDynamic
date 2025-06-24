package com.paintings.showcase.backend.model

import jakarta.persistence.*


@Entity
data class Painting(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    var year: Int? = null,
    var height: Int? = null,
    var width: Int? = null,

    var imageUrl: String,

    @OneToMany(mappedBy = "painting", cascade = [CascadeType.ALL], orphanRemoval = true, fetch = FetchType.LAZY)
    val translations: MutableList<PaintingTranslation> = mutableListOf()
)
