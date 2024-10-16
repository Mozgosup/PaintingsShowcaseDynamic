package com.paintings.showcase.backend.service

import org.springframework.web.multipart.MultipartFile

interface FileStorageService {
    @Throws(Exception::class)
    fun uploadFile(file: MultipartFile): String
}
