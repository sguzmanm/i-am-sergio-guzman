package api.googlecalendar

import com.google.api.client.auth.oauth2.Credential
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.JsonFactory
import com.google.api.client.json.jackson2.JacksonFactory
import com.google.api.client.util.DateTime
import com.google.api.services.calendar.Calendar
import com.google.api.services.calendar.CalendarScopes
import com.google.api.services.calendar.model.Event
import com.google.api.services.calendar.model.Events
import com.sguzmanm.shared.getEnvString
import io.github.cdimascio.dotenv.dotenv
import java.io.*

// Java quickstart: https://developers.google.com/calendar/quickstart/java

object GoogleCalendar {
    private const val APPLICATION_NAME = "Google Calendar API Integration I am Sergio Guzmán"
    private const val CREDENTIALS_FILE_PATH = "account.p12"

    private val JSON_FACTORY: JsonFactory = JacksonFactory.getDefaultInstance()
    private val SCOPES = listOf(CalendarScopes.CALENDAR_READONLY)

    private var service:Calendar

    init {
        val httpTransport = GoogleNetHttpTransport.newTrustedTransport()
        service = Calendar.Builder(httpTransport, JSON_FACTORY, getCredentials(httpTransport))
                .setApplicationName(APPLICATION_NAME)
                .build()
    }

    private fun getCredentials(httpTransport: NetHttpTransport): Credential {
        val projectId = getEnvString("GOOGLE_CALENDAR_PROJECT_ID")

        val filePath = ClassLoader.getSystemResource(CREDENTIALS_FILE_PATH).file
        return GoogleCredential.Builder().setTransport(httpTransport)
                .setJsonFactory(JSON_FACTORY)
                .setServiceAccountId(projectId)
                .setServiceAccountScopes(SCOPES)
                .setServiceAccountPrivateKeyFromP12File(File(filePath))
                .build()
    }

    fun getService():Calendar{
        return service
    }
}