package com.sguzmanm.resources

import com.sguzmanm.auth.JWTGenerator
import com.sguzmanm.db.*
import io.github.cdimascio.dotenv.dotenv
import io.ktor.application.call
import io.ktor.auth.UserPasswordCredential
import io.ktor.routing.Routing
import io.ktor.routing.route

import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.post

fun Routing.apiUsers() {
    post("login"){
        val user= call.receive<User>()
        val jwtGenerator = JWTGenerator()

        val (userTable,isAdmin)=getUserCredentials(user.name)
        userTable.authenticate(UserPasswordCredential(user.name,user.password))

        call.respond(mapOf("token" to jwtGenerator.sign(user.name,isAdmin)))
    }

    route("register"){
        post {
            val user= call.receive<User>()
            createUser(user)

            val jwtGenerator = JWTGenerator()
            call.respond(mapOf("token" to jwtGenerator.sign(user.name,false)))
        }
    }
}