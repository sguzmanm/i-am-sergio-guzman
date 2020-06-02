package com.sguzmanm.auth

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.sguzmanm.shared.getEnvString
import java.util.*


class JWTGenerator () {
    private val secretKey= getEnvString("AUTH_SECRET_KEY")
    private val algorithm = Algorithm.HMAC256(secretKey)

    private val expirationTime=if(getEnvString("AUTH_EXPIRATION_HOURS")!="") Integer.parseInt(getEnvString("AUTH_EXPIRATION_HOURS")) else 3

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