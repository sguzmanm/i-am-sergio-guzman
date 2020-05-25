package com.sguzmanm.auth

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.github.cdimascio.dotenv.dotenv
import java.util.*


class JWTGenerator () {
    val dotEnv = dotenv()

    private val secretKey=dotEnv["AUTH_SECRET_KEY"]!!
    private val algorithm = Algorithm.HMAC256(secretKey)

    private val expirationTime=if(dotEnv["AUTH_EXPIRATION_HOURS"]!=null) Integer.parseInt(dotEnv["AUTH_EXPIRATION_HOURS"]) else 3

    val verifier = JWT.require(algorithm).build()
    fun sign(name: String,isAdmin: Boolean): String {
        val calendar = Calendar.getInstance()
        calendar.time = Date()
        calendar.add(Calendar.HOUR, expirationTime)

        return JWT.create()
            .withClaim("name", name)
            .withClaim("admin",isAdmin)
            .withExpiresAt(calendar.time)
            .sign(algorithm)
    }
}