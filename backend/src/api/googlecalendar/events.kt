package com.sguzmanm.api.googlecalendar

import api.googlecalendar.GoogleCalendar
import com.google.api.client.util.DateTime
import com.google.api.services.calendar.model.Event
import com.google.api.services.calendar.model.Events
import io.github.cdimascio.dotenv.dotenv
import java.util.*

private lateinit var lastUpdateDate:Date
private val dailyEvents= listOf<Events>()
private val dotEnv = dotenv()

fun getDailyEvents(){
    val service=GoogleCalendar.getService()

    val dayStart=DateTime(Date())

    val calendar= Calendar.getInstance()
    calendar.set(Calendar.HOUR_OF_DAY,23)
    calendar.set(Calendar.MINUTE,59)
    val dayEnd=DateTime(calendar.time)

    // List the next 10 events from the primary calendar.
    val events: Events = service.events().list(dotEnv["GOOGLE_CALENDAR_USER_CALENDAR"])
            .setTimeMin(dayStart)
            .setTimeMax(dayEnd)
            .setMaxResults(10)
            .execute()

    val items: List<Event> = events.items
    if (items.isEmpty()) {
        println("No upcoming events found.")
    } else {
        println("Upcoming events")
        for (event in items) {
            val start: DateTime = event.start.dateTime
            System.out.printf("%s\n", event)
        }
    }
}

fun main() {
    getDailyEvents()
}