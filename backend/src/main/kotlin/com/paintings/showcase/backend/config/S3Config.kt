package com.paintings.showcase.backend.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.s3.S3Client

@Configuration
class S3Config {

    @Bean
    fun s3Client(): S3Client {
        return S3Client.builder()
            .region(Region.of("eu-north-1"))
            .build()
    }
}
