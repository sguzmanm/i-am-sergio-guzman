package com.sguzmanm.db

import com.sguzmanm.auth.hashSalt
import io.github.cdimascio.dotenv.dotenv
import io.ktor.auth.UserHashedTableAuth
import io.ktor.util.decodeBase64
import io.ktor.util.getDigestFunction
import kotlinx.coroutines.runBlocking
import org.litote.kmongo.reactivestreams.*  //NEEDED! import KMongo reactivestreams extensions
import org.litote.kmongo.coroutine.* //NEEDED! import KMongo coroutine extensions
import org.litote.kmongo.eq
import java.lang.Exception
import java.net.URLEncoder
import java.security.MessageDigest
import java.time.LocalTime
import java.util.*

data class User(val name: String, var password:String, var isAdmin:Boolean )
data class AuthResult(val userCredentials: UserHashedTableAuth,val isAdmin: Boolean)

private val col = Database.getDatabase().getCollection<User>() //KMongo extension method

fun createUser(user: User){
    //async now
    runBlocking {
        try{
            val currentUser= col.findOne(User::name eq user.name)
            if(currentUser!=null)
                throw DatabaseError.ERROR_DATABASE_FAILED

            val digester= getDigestFunction("SHA-256") { hashSalt(it) }
            user.password = Base64.getEncoder().encodeToString(digester(user.password))

            user.isAdmin=false

            col.insertOne(user)
        }
        catch (e:Exception){
            e.printStackTrace()
            throw DatabaseError.ERROR_DATABASE_FAILED
        }
    }
}

fun getUserCredentials(name:String) = runBlocking {
    try{
        val user= col.findOne(User::name eq name) ?: throw DatabaseError.ERROR_DATABASE_FAILED

        val decodedUrlBytes = Base64.getDecoder().decode(user.password)

        val hash = UserHashedTableAuth(
            getDigestFunction("SHA-256") { hashSalt(it) }, mapOf(
            user.name to  decodedUrlBytes// sha256 for "test"
        ))


        return@runBlocking AuthResult(hash,user.isAdmin)
    }
    catch (e:Exception){
        e.printStackTrace()
        throw DatabaseError.ERROR_DATABASE_FAILED
    }
}

