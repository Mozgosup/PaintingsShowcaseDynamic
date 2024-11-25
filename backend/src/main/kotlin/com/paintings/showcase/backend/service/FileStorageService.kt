package com.paintings.showcase.backend.service

import org.springframework.web.multipart.MultipartFile

interface FileStorageService {

    fun uploadFile(file: MultipartFile): String
    fun deleteFile(fileUrl: String)
    fun getFileUrl(fileKey: String): String
    fun listFilesInFolder(folder: String): List<String>
}
