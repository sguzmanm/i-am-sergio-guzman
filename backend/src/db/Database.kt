package com.sguzmanm.db

import com.sguzmanm.shared.getEnvString
import org.litote.kmongo.coroutine.CoroutineDatabase
import org.litote.kmongo.coroutine.coroutine
import org.litote.kmongo.reactivestreams.KMongo
import java.net.URLEncoder

object Database {
    val host:String = getEnvString("DB_HOST")
    val user: String = URLEncoder.encode(getEnvString("DB_USER"),"utf-8")
    val password: String = URLEncoder.encode(getEnvString("DB_PASSWORD"),"utf-8")

    private val client = KMongo.createClient("mongodb+srv://${user}:${password}@${host}?retryWrites=true&w=majority").coroutine //use coroutine extension
    private val database = client.getDatabase("i-am-sergio-guzman") //normal java driver usage

    fun getDatabase(): CoroutineDatabase {
        return database
    }

}
