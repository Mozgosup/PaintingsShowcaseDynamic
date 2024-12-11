package com.paintings.showcase.backend.controller

import com.paintings.showcase.backend.service.FileStorageService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@CrossOrigin(origins = ["http://localhost:3000", "http://frontend"])
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
        try {
            val fileKeys = fileStorageService.listFilesInFolder(folder)

            val images = fileKeys.map { fileKey ->
                mapOf(
                    "url" to fileStorageService.getFileUrl(fileKey),
                    "alt" to fileKey.substringAfterLast("/")
                )
            }

            return ResponseEntity.ok(images)
        } catch (e: Exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }

    @GetMapping("/test-s3")
    fun testS3Connection(): ResponseEntity<List<String>> {
        val fileKeys = fileStorageService.listFilesInFolder("biography/images/")
        return ResponseEntity.ok(fileKeys)
    }
}

