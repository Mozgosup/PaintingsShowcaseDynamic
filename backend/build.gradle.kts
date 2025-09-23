plugins {
	kotlin("jvm")
	kotlin("plugin.spring")
	id("org.springframework.boot")
	id("io.spring.dependency-management")
	id("org.jetbrains.kotlin.plugin.jpa") version "1.9.25"
}

group = "com.paintings.showcase"
version = rootProject.version.toString()

java {
	toolchain {
		languageVersion.set(JavaLanguageVersion.of(17))
	}
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")

	// AWS SDK for S3
	implementation("software.amazon.awssdk:s3:2.28.21")
	implementation("software.amazon.awssdk:auth:2.28.21")
	implementation("software.amazon.awssdk:core:2.28.21")

	// Flyway
	implementation("org.flywaydb:flyway-core:10.20.1")
	runtimeOnly("org.flywaydb:flyway-database-postgresql:10.20.1")

	// PostgreSQL driver
	implementation("org.postgresql:postgresql:42.7.4")

	// Dev and test dependencies
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

kotlin {
	compilerOptions {
		freeCompilerArgs.add("-Xjsr305=strict")
	}
}

springBoot {
	mainClass.set("com.paintings.showcase.backend.BackendApplicationKt")
}

tasks.withType<Test> {
	useJUnitPlatform()
}


