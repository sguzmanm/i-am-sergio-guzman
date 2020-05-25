package com.sguzmanm.db

import kotlinx.coroutines.runBlocking
import org.litote.kmongo.reactivestreams.*  //NEEDED! import KMongo reactivestreams extensions
import org.litote.kmongo.coroutine.* //NEEDED! import KMongo coroutine extensions
import org.litote.kmongo.eq
import java.lang.Exception
import java.net.URLEncoder
import java.time.LocalTime

data class Mood(val title: String, val faIcon:String, val textColor:String, val cardColor:String, val backgroundColor:String,
                val highlightColor1:String, val highlightColor2:String, val profilePic:String, val startTime:LocalTime, val endTime:LocalTime )

val database = Database.getDbClient().getDatabase("moods") //normal java driver usage
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

