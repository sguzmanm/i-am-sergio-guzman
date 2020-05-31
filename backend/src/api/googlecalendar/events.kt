package com.sguzmanm.api.googlecalendar

import api.googlecalendar.GoogleCalendar
import com.google.api.client.util.DateTime
import com.google.api.services.calendar.model.Event
import com.google.api.services.calendar.model.EventDateTime
import com.google.api.services.calendar.model.Events
import com.sguzmanm.db.Mood
import io.github.cdimascio.dotenv.dotenv
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.*


private const val MAX_DIFF=24*60*60*1000 // 1 day

private var lastUpdateDate:Date = Date()
private var dailyMoods= mutableListOf<Mood>()
private val dotEnv = dotenv()

fun getTimeWithHours(hour:Int,min:Int):Calendar{
    val calendar= Calendar.getInstance()
    calendar.set(Calendar.HOUR_OF_DAY,hour)
    calendar.set(Calendar.MINUTE,min)

    return calendar
}

fun getDailyEvents():List<Event>{
    val service=GoogleCalendar.getService()

    val dayStart=DateTime(Date())

    val calendar= getTimeWithHours(23,59)
    val dayEnd=DateTime(calendar.time)

    // List the next 10 events from the primary calendar.
    val events: Events = service.events().list(dotEnv["GOOGLE_CALENDAR_USER_CALENDAR"])
            .setTimeMin(dayStart)
            .setTimeMax(dayEnd)
            .execute()

    return events.items
}

fun createMood(description:String,start:EventDateTime, end:EventDateTime):Mood?{
    moodsKeywords.keys.forEach {
        if(description.contains(it)){
            val startTime= LocalDateTime.ofInstant(
                Date(start.dateTime.value).toInstant(),
                ZoneId.systemDefault()
            ).toLocalTime()
            val endTime= LocalDateTime.ofInstant(
                Date(end.dateTime.value).toInstant(),
                ZoneId.systemDefault()
            ).toLocalTime()

            return Mood(title= moodsKeywords[it] ?: "",startTime =startTime,endTime = endTime)
        }
    }

    return null
}

fun getMoods():List<Mood> {
    // Cache to not abuse of the Calendar API
    if (dailyMoods.size>0 && Date().time - lastUpdateDate.time <= MAX_DIFF) {
        return dailyMoods
    }

    dailyMoods= mutableListOf()

    val items= getDailyEvents()
    items.forEach {
        val mood= createMood(it.description?:it.summary,it.start,it.end) ?: return@forEach
        dailyMoods.add(mood)
    }

    lastUpdateDate=Date()
    return dailyMoods
}