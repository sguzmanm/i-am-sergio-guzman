package com.sguzmanm.db

import io.github.cdimascio.dotenv.dotenv
import org.litote.kmongo.coroutine.CoroutineClient
import org.litote.kmongo.coroutine.coroutine
import org.litote.kmongo.reactivestreams.KMongo
import java.net.URLEncoder

private val dotEnv = dotenv()

object Database {
    val host:String = dotEnv["DB_HOST"]?:"picrossvs-xa3gu.mongodb.net/test"
    val user: String = URLEncoder.encode(dotEnv["DB_USER"],"utf-8")
    val password: String = URLEncoder.encode(dotEnv["DB_PASSWORD"],"utf-8")

    private val client = KMongo.createClient("mongodb+srv://${user}:${password}@${host}?retryWrites=true&w=majority").coroutine //use coroutine extension

    fun getDbClient(): CoroutineClient {
        return client
    }

}
