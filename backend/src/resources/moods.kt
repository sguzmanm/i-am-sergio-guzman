package com.sguzmanm.resources

import com.sguzmanm.db.Mood
import com.sguzmanm.db.createMood
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.http.ContentType
import io.ktor.response.respondText
import io.ktor.routing.Routing
import io.ktor.routing.get
import io.ktor.routing.route

import com.sguzmanm.db.getMoods
import io.ktor.auth.authenticate
import io.ktor.request.receive
import io.ktor.response.header
import io.ktor.response.respond
import io.ktor.routing.post

fun transformMoods(dbMoodList: List<Mood>,calendarMoodList: List<Mood>):List<Mood> {
    val finalList=dbMoodList.toMutableList()
    calendarMoodList.forEach {
        val transformedMood= dbMoodList.find { mood ->  mood.title==it.title } ?: return@forEach
        transformedMood.startTime=it.startTime
        transformedMood.endTime=it.endTime

        finalList.add(transformedMood)
    }

    return finalList
}


fun Routing.apiMoods() {
    route("moods"){
        get {
            val dbMoodList= getMoods()
            val moodList=transformMoods(dbMoodList, com.sguzmanm.api.googlecalendar.getMoods())

            call.response.header("Context-Type", "application/json")
            call.respond(moodList)
        }

        authenticate ("admin"){
            post {
                val mood= call.receive<Mood>()
                createMood(mood)
                call.response.header("Context-Type", "application/json")
                call.respondText("OK")
            }
        }
    }
}