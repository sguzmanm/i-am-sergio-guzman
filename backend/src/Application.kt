package com.sguzmanm

import io.ktor.application.*
import io.ktor.request.*
import io.ktor.features.*
import org.slf4j.event.*
import io.ktor.client.*
import io.ktor.client.engine.jetty.*
import io.ktor.http.ContentType
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.response.respondText
import io.ktor.routing.*
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import com.sguzmanm.resources.*
import io.ktor.gson.gson
import io.ktor.server.engine.commandLineEnvironment
import java.text.DateFormat

fun Routing.api(){
    apiMoods()
}

@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {
    install(CallLogging) {
        level = Level.INFO
        filter { call -> call.request.path().startsWith("/") }
    }

    install(CORS) {
        method(HttpMethod.Options)
        method(HttpMethod.Put)
        method(HttpMethod.Delete)
        method(HttpMethod.Patch)
        header(HttpHeaders.Authorization)
        header("MyCustomHeader")
        allowCredentials = true
        anyHost() // @TODO: Don't do this in production if possible. Try to limit it.
    }

    install(ContentNegotiation) {
        gson {
            setDateFormat(DateFormat.LONG)
            setPrettyPrinting()
        }
    }

    install(Routing) {
        api()
    }


    val client = HttpClient(Jetty) {
    }
}

fun main(args: Array<String>): Unit{
    val port = if(System.getenv("PORT")!=null) {Integer.parseInt(System.getenv("PORT"))} else 8082

    val server = embeddedServer(Netty, commandLineEnvironment(args))
    server.start()

}
