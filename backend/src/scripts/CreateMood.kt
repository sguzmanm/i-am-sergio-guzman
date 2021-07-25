package com.sguzmanm.misc

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.sguzmanm.db.Mood
import com.sguzmanm.db.User
import io.github.cdimascio.dotenv.dotenv
import io.ktor.client.HttpClient
import io.ktor.client.engine.cio.CIO
import io.ktor.client.features.json.GsonSerializer
import io.ktor.client.features.json.JsonFeature
import io.ktor.client.request.get
import io.ktor.client.request.header
import io.ktor.client.request.post
import io.ktor.http.ContentType
import kotlinx.coroutines.runBlocking
import java.io.FileInputStream
import java.lang.Exception


private val dotEnv = dotenv()
private const val HOST="http://127.0.0.1:8082"

private fun getClient() = HttpClient(CIO) {
    install(JsonFeature) {
        serializer = GsonSerializer()
    }
}

suspend fun login():String{
    val client= getClient()
    val response=client.post<Map<String,String>>("$HOST/login"){
        header("Content-Type", ContentType.Application.Json)
        body=User(dotEnv["ADMIN_USER"]?:"",dotEnv["ADMIN_PASSWD"]?:"",true)
    }

    client.close()
    return response["token"]?:""
}

suspend fun insertMood(token:String, mood: Mood){
    println("Insert $mood")

    val client= getClient()
    val response=client.post<String>("$HOST/moods"){
        header("Content-Type", ContentType.Application.Json)
        header("Authorization","Bearer $token")
        body=mood
    }
    client.close()

    if (response!="OK") {
        throw Exception("Failed for $mood")
    }
}

fun readMoods(path:String):List<Mood>{
    val filePath = ClassLoader.getSystemResource(path).file
    val inputStream= FileInputStream(filePath)

    val jsonString = inputStream.bufferedReader().use { it.readText() }
    val listMoodType = object : TypeToken<List<Mood>>() {}.type

    val gson= Gson()
    val moods:List<Mood> = gson.fromJson(jsonString,listMoodType)

    return moods
}

suspend fun getMoods():List<Mood>{
    val client= getClient()
    val response=client.get<List<Mood>>("$HOST/moods")

    client.close()

    return response
}

fun main() {
    runBlocking {
        val moods= readMoods("samples/moods.json")
        val token=login()

        moods.forEach {
            insertMood(token,it)
        }

        getMoods()
    }
}