package com.sguzmanm

import com.sguzmanm.auth.JWTGenerator
import io.ktor.application.*
import io.ktor.request.*
import io.ktor.features.*
import org.slf4j.event.*
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.routing.*
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import com.sguzmanm.resources.*
import com.sguzmanm.server.SinglePageApplication
import io.ktor.auth.Authentication
import io.ktor.auth.UserIdPrincipal
import io.ktor.auth.jwt.jwt
import io.ktor.gson.gson
import io.ktor.http.content.files
import io.ktor.http.content.resource
import io.ktor.http.content.static
import io.ktor.http.content.staticRootFolder
import io.ktor.server.engine.commandLineEnvironment
import java.io.File
import java.text.DateFormat


/**
 * Static content routing
 */
fun Routing.staticContent() {
    static {
        staticRootFolder = File("../frontend")
        files("dist")
    }
}

/**
 * API Content
 */
fun Routing.api(){
    apiMoods()
    apiUsers()
}


@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {
    val jwtGenerator = JWTGenerator()

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

    install(Authentication){
        jwt(name="admin") {
            verifier(jwtGenerator.verifier)
            validate {
                if(it.payload.getClaim("admin").asBoolean())
                    UserIdPrincipal(it.payload.getClaim("name").asString())
                else
                    null
            }
        }

        jwt {
            verifier(jwtGenerator.verifier)
            validate {
                UserIdPrincipal(it.payload.getClaim("name").asString())
            }
        }
    }

    install(SinglePageApplication){
        defaultPage = "index.html"
        folderPath = "dist"
        spaRoute = ""
        useFiles = true
    }

    routing {
        api()
    }
}

fun main(args: Array<String>){
    val server = embeddedServer(Netty, commandLineEnvironment(args))
    server.start()
}
