'use client'

import axios from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function AddComment({id}) {
  return (
    <form className="my-8">
        <h3>
            add a comment
        </h3>
    </form>
  )
}

