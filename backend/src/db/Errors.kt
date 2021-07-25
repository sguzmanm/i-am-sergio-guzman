package com.sguzmanm.db

class DatabaseError: Error() {
    companion object {
        val ERROR_NOT_FOUND=Error("Element not found")
        val ERROR_ALREADY_EXISTS=Error("Object already exists")
        val ERROR_DATABASE_FAILED=Error("Database operation failed")
    }
}