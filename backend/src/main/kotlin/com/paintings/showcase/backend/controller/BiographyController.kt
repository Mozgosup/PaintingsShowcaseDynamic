package com.paintings.showcase.backend.controller

import com.paintings.showcase.backend.service.FileStorageService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/biography")
class BiographyController @Autowired constructor(
    private val fileStorageService: FileStorageService
) {

    @GetMapping("/text")
    fun getBiographyText(): ResponseEntity<Map<String, String>> {
        val biographyJsonUrl = fileStorageService.getFileUrl("biography/text/biography.json")
        return ResponseEntity.ok(mapOf("url" to biographyJsonUrl))
    }

    @GetMapping("/images")
    fun getBiographyImages(): ResponseEntity<List<Map<String, String>>> {
        val folder = "biography/images/"
        val fileKeys = fileStorageService.listFilesInFolder(folder)

        val images = fileKeys.map { fileKey ->
            mapOf(
                "url" to fileStorageService.getFileUrl(fileKey),
                "alt" to fileKey.substringAfterLast("/") // Временный alt-тег
            )
        }
        return ResponseEntity.ok(images)
    }
}

