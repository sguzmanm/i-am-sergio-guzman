package api.googlecalendar

import com.google.api.client.auth.oauth2.Credential
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport
import com.google.api.client.json.JsonFactory
import com.google.api.client.json.jackson2.JacksonFactory
import com.google.api.services.calendar.Calendar
import com.google.api.services.calendar.CalendarScopes
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.sguzmanm.shared.getEnvString
import java.io.File
import java.io.FileInputStream
import java.io.FileWriter
import java.util.*

// Java quickstart: https://developers.google.com/calendar/quickstart/java

object GoogleCalendar {
    private const val APPLICATION_NAME = "Google Calendar API Integration I am Sergio Guzmán"
    private const val CREDENTIALS_FILE_PATH = "account.json"

    private val JSON_FACTORY: JsonFactory = JacksonFactory.getDefaultInstance()
    private val SCOPES = listOf(CalendarScopes.CALENDAR_READONLY)

    private var service:Calendar

    init {
        val httpTransport = GoogleNetHttpTransport.newTrustedTransport()
        service = Calendar.Builder(httpTransport, JSON_FACTORY, getCredentials())
                .setApplicationName(APPLICATION_NAME)
                .build()
    }

    private fun createCredentialMap(gson: Gson):Map<String,String>{
        val mapType = object : TypeToken<Map<String,String>>() {}.type
        return gson.fromJson(getEnvString("GOOGLE_CALENDAR_CREDENTIALS"),mapType)
    }

    private fun getCredentials(): Credential {
        val fileURL=ClassLoader.getSystemClassLoader().getResource(CREDENTIALS_FILE_PATH)
        if (fileURL!=null){
            return GoogleCredential.fromStream(this.javaClass.classLoader.getResourceAsStream("./$CREDENTIALS_FILE_PATH"))
                .createScoped(Collections.singleton(CalendarScopes.CALENDAR))
        }

        val file=File(CREDENTIALS_FILE_PATH)
        if (file.exists()) {
            println("Fallback using file")
            return GoogleCredential.fromStream(FileInputStream(CREDENTIALS_FILE_PATH))
                .createScoped(Collections.singleton(CalendarScopes.CALENDAR))
        }

        println("Fallback creating file $CREDENTIALS_FILE_PATH")

        val gson= Gson()

        val credentials=createCredentialMap(gson)

        val fileWriter=FileWriter(CREDENTIALS_FILE_PATH)
        gson.toJson(credentials,fileWriter)
        fileWriter.close()

        return GoogleCredential.fromStream(FileInputStream("$CREDENTIALS_FILE_PATH"))
            .createScoped(Collections.singleton(CalendarScopes.CALENDAR))
    }

    fun getService():Calendar{
        return service
    }
}