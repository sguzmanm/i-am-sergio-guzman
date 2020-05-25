package com.sguzmanm.db

import kotlinx.coroutines.runBlocking
import org.litote.kmongo.reactivestreams.*  //NEEDED! import KMongo reactivestreams extensions
import org.litote.kmongo.coroutine.* //NEEDED! import KMongo coroutine extensions
import org.litote.kmongo.eq
import java.lang.Exception
import java.net.URLEncoder

data class Mood(val title: String, val faIcon:String, val textColor:String, val cardColor:String, val backgroundColor:String,
                val highlightColor1:String, val highlightColor2:String, val profilePic:String, val startTime:String, val endTime:String )

val user=URLEncoder.encode("","utf-8")
val password=URLEncoder.encode("","utf-8")

val client = KMongo.createClient("mongodb+srv://${user}:${password}@picrossvs-xa3gu.mongodb.net/test?retryWrites=true&w=majority").coroutine //use coroutine extension
val database = client.getDatabase("moods") //normal java driver usage
val col = database.getCollection<Mood>() //KMongo extension method

fun createMood(mood: Mood){
    //async now
    runBlocking {
        try{
            val currentMood=col.findOne(Mood::title eq mood.title)
            if(currentMood!=null)throw DatabaseError.ERROR_ALREADY_EXISTS

            col.insertOne(mood)
        }
        catch(e: DatabaseError){
            // Do nothing the error is already controlled
            print(e.message)
        }
        catch (e:Exception){
            e.printStackTrace()
            throw DatabaseError.ERROR_DATABASE_FAILED
        }
    }
}

fun getMoods() = runBlocking {
    try{
        return@runBlocking col.find().toList()
    }
    catch (e:Exception){
        e.printStackTrace()
        throw DatabaseError.ERROR_DATABASE_FAILED
    }
}

fun main() {
    createMood(Mood("Test","fa-awesome","#fff","#f00","#ff0",
    "#000","#fff","sergi.com","18:00","22:00"))

    println("Get all")
    getMoods().forEach { println("Hello there $it") }
}

