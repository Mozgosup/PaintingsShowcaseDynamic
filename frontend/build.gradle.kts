plugins {
    id("base")
}

tasks.register<Copy>("copyFrontend") {
    from("src/main/resources/static")
    into(layout.buildDirectory.dir("processed-frontend"))
}

tasks.named("build") {
    dependsOn("copyFrontend")
}
