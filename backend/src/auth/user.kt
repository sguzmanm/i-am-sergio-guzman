package com.sguzmanm.auth

fun hashSalt(salt:String): String = "ktor${salt.length}"