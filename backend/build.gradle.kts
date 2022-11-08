import java.util.regex.Pattern.compile
import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar
import com.google.cloud.tools.gradle.appengine.appyaml.AppEngineAppYamlExtension

val kotlin_version: String by project
val ktor_version: String by project
val ktor_shadow_version: String by project
val logback_version: String by project
val google_calendar_version: String by project
val dotenv_version: String by project
val kmongo_version: String by project

buildscript {
    repositories {
        jcenter()
    }
    
    dependencies {
        classpath ("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version")
        classpath ("com.github.jengelman.gradle.plugins:shadow:$ktor_shadow_version")
    }
}

plugins {
    id("com.google.cloud.tools.appengine") version "2.4.2"
    // Fat jar packaging from https://ktor.io/servers/deploy/packing/fatjar.html
    id("com.github.johnrengelman.shadow") version "7.1.2"
    "kotlin"
    "kotlin-dsl"
    "application"
}


// Fat jar packaging from https://ktor.io/servers/deploy/packing/fatjar.html
// apply(plugin = "com.github.johnrengelman.shadow")


group = "com.sguzmanm"

// This task will generate your fat JAR and put it in the ./build/libs/ directory
/*shadowJar {
    manifest {
        attributes ("Main-Class": mainClassName)
    }
}*/
tasks.withType<ShadowJar>() {
    manifest {
        attributes["Main-Class"] = mainClassName
    }
}

application {
    mainClass.set("io.ktor.server.netty.EngineMain")
}

tasks{
    register("stage"){
        dependsOn("build", "clean")
    }

    register("build"){
        mustRunAfter("clean")
    }
}

/*
sourceSets {
    main.kotlin.srcDirs = main.java.srcDirs = ["src"]
    test.kotlin.srcDirs = test.java.srcDirs = ["test"]
    main.resources.srcDirs = ["resources"]
    test.resources.srcDirs = ["testresources"]
}*/

sourceSets {
    main {
        java.srcDir("src")
        kotlin.srcDir("src")
        resources.srcDir("resources")
    }

    test {
        java.srcDir("test")
        kotlin.srcDir("test")
        resources.srcDir("testresources")
    }
}

val compileKotlin: KotlinCompile by tasks
val compileTestKotlin: KotlinCompile by tasks

compileKotlin.kotlinOptions {
    jvmTarget = "1.8"
}
compileTestKotlin.kotlinOptions {
    jvmTarget = "1.8"
}

configure<AppEngineAppYamlExtension>{
    deploy {
        version = "GCLOUD_CONFIG"
        projectId = "GCLOUD_CONFIG"
    }
}

repositories {
    mavenLocal()
    jcenter()
    maven ("https://kotlin.bintray.com/ktor")
}

val implementation by configurations
val testImplementation by configurations

dependencies {
    implementation ("org.jetbrains.kotlin:kotlin-stdlib-jdk8:$kotlin_version")

    // Dotenv
    implementation ("io.github.cdimascio:java-dotenv:$dotenv_version")

    // Google calendar
    compile("com.google.api-client:google-api-client:$google_calendar_version")
    compile("com.google.oauth-client:google-oauth-client-jetty:$google_calendar_version")
    compile("com.google.apis:google-api-services-calendar:v3-rev305-$google_calendar_version")

    // Ktor Server
    implementation("io.ktor:ktor-server-netty:$ktor_version")
    implementation("ch.qos.logback:logback-classic:$logback_version")
    implementation("io.ktor:ktor-server-core:$ktor_version")
    implementation("io.ktor:ktor-gson:$ktor_version")
    implementation("io.ktor:ktor-auth-jwt:$ktor_version")
    testImplementation("io.ktor:ktor-server-tests:$ktor_version")

    // Ktor client
    implementation("io.ktor:ktor-client-core:$ktor_version")
    implementation("io.ktor:ktor-client-core-jvm:$ktor_version")
    implementation("io.ktor:ktor-client-cio:$ktor_version")
    implementation("io.ktor:ktor-client-json:$ktor_version")
    implementation("io.ktor:ktor-client-gson:$ktor_version")
    implementation("io.ktor:ktor-client-auth:$ktor_version")


    // KMongo
    compile ("org.litote.kmongo:kmongo-coroutine:$kmongo_version")

}