package com.sguzmanm.shared

import io.github.cdimascio.dotenv.dotenv

fun getEnvString(key: String):String{
    try{
        val dotEnv = dotenv()
        val value=dotEnv[key]
        if(value!=null){
            return value
        }

        return ""
    }
    catch(e:Error){
        println("Using fallback for $key")
        val value=System.getenv(key)
        if(value!=null){
            return value
        }

        e.printStackTrace()
        return ""
    }
}