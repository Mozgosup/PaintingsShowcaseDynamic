plugins {
    id("base")
    kotlin("jvm") version "1.9.25" apply false
    kotlin("plugin.spring") version "1.9.25" apply false
    id("org.springframework.boot") version "3.3.4" apply false
    id("io.spring.dependency-management") version "1.1.6" apply false
}

val appVersion = rootProject.file("VERSION").readText().trim()

group = "com.paintings.showcase"
version = appVersion

allprojects {
    repositories {
        mavenCentral()
    }
}

subprojects {
    apply(plugin = "org.jetbrains.kotlin.jvm")
    apply(plugin = "org.jetbrains.kotlin.plugin.spring")
    apply(plugin = "io.spring.dependency-management")

    group = "com.paintings.showcase"
    version = appVersion

    tasks.withType<Test> {
        useJUnitPlatform()
    }
}




