package com.paintings.showcase.backend.service

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import software.amazon.awssdk.core.sync.RequestBody
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request
import software.amazon.awssdk.services.s3.model.PutObjectRequest
import java.util.*


@Service
class S3FileStorageService(
    private val s3Client: S3Client,
    @Value("\${aws.s3.bucket-name}") private val bucketName: String
) : FileStorageService {

    override fun uploadFile(file: MultipartFile): String {

        val fileName = UUID.randomUUID().toString() + "-" + file.originalFilename

        val putObjectRequest = PutObjectRequest.builder()
            .bucket(bucketName)
            .key(fileName)
            .contentType(file.contentType)
            .build()

        file.inputStream.use { inputStream ->
            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, file.size))
        }

        return s3Client.utilities().getUrl { builder ->
            builder.bucket(bucketName).key(fileName)
        }.toExternalForm()

    }

    override fun deleteFile(fileUrl: String) {
        val fileName = extractFileNameFromUrl(fileUrl)
        val deleteRequest = DeleteObjectRequest.builder()
            .bucket(bucketName)
            .key(fileName)
            .build()
        s3Client.deleteObject(deleteRequest)
    }

    override fun listFilesInFolder(folder: String): List<String> {
        val listObjectsRequest = ListObjectsV2Request.builder()
            .bucket(bucketName)
            .prefix(folder)
            .build()

        val response = s3Client.listObjectsV2(listObjectsRequest)

        return response.contents().map { it.key() }
    }

    override fun getFileUrl(fileKey: String): String {
        return s3Client.utilities().getUrl { builder ->
            builder.bucket(bucketName).key(fileKey)
        }.toExternalForm()
    }

    private fun extractFileNameFromUrl(fileUrl: String): String {
        return fileUrl.substringAfterLast("/")
    }
}
